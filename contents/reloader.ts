import type { PlasmoCSConfig } from 'plasmo';
import { URLPattern } from 'urlpattern-polyfill';
import browser from 'webextension-polyfill';

import { sendToBackground } from '@plasmohq/messaging';
import { Storage } from '@plasmohq/storage';

import { type Options, type Profile } from '~schemas/options';
import { sessionStorage } from '~storage';

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
};

export type RunningProfile = { profile: Profile; links: string[] };
export type TabReloader = {
  tabId?: number;
  profiles: RunningProfile[];
};

const storage = new Storage();
let runningProfiles: RunningProfile[] = [];

storage.watch({
  options: ({ newValue }) => {
    console.log('options changed, reloading');
    const options: Options = newValue;
    init(options);
  },
});

storage.get<Options>('options').then((options) => init(options));
const init = function (options?: Options) {
  console.log('initializing reloader');
  runningProfiles = [];
  if (!options?.reloader.enabled) {
    console.log('disabled reloader. exiting');
    return;
  }
  const currentUrl = location.href;
  for (const profile of options?.reloader.profiles) {
    for (const sitePattern of profile.siteMatches) {
      if (urlMatch(currentUrl, sitePattern)) {
        runningProfiles.push({ profile, links: [] });
        break;
      }
    }
  }
};

const urlMatch = function (url: string, pattern: string) {
  if (pattern.startsWith('/') && pattern.endsWith('/')) {
    const regex = new RegExp(pattern.slice(1, -1));
    return regex.test(url);
  } else {
    // URLPattern
    const urlPattern = new URLPattern(pattern);
    return urlPattern.test(url);
  }
};

const collectLinks = (profile: Profile) => {
  let links: HTMLLinkElement[] = [];
  for (const link of document.getElementsByTagName('link')) {
    let found = false;
    for (const item of links) {
      if (link.isEqualNode(item)) {
        found = true;
        break;
      }
    }

    if (!found) {
      const href = link.href;
      let matched: 'false' | 'true' | 'forceReload' = 'false';
      for (const match of profile.matches) {
        if (urlMatch(href, match.pattern)) {
          matched = 'true';
          if (match.forceReload) {
            matched = 'forceReload';
          }
          break;
        }
      }
      if (matched) {
        for (const exclude of profile.excludes) {
          if (urlMatch(href, exclude)) {
            matched = 'false';
            break;
          }
        }
      }
      if (matched !== 'false') {
        link.removeAttribute('data-x-force-reload');
        if (matched === 'forceReload') {
          link.setAttribute('data-x-force-reload', 'true');
        }
        links.push(link);
      }
    }
  }

  return links;
};

window.setInterval(() => {
  for (const runningProfile of runningProfiles) {
    const links = collectLinks(runningProfile.profile);
    runningProfile.links = [];
    for (const link of links) {
      const href = link.href;
      const url = new URL(href);
      url.searchParams.delete('x-reload');
      runningProfile.links.push(url.toString());
      url.searchParams.set('x-reload', '' + Date.now());
      let lastModified = link.getAttribute('data-last-modified');

      fetch(url.toString(), {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache',
        credentials: 'omit',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      }).then((response) => {
        const headerLastModified = response.headers.get('last-modified');
        if (lastModified !== headerLastModified) {
          if (lastModified) {
            if (link.hasAttribute('data-x-force-reload')) {
              window.location.reload();
              return;
            }
          }
          link.setAttribute('data-last-modified', headerLastModified || '');
          link.href = url.toString();
        }
      });
    }
  }

  sendToBackground({
    name: 'reloader',
    body: runningProfiles,
  }).then(() => console.log);
}, 2000);
