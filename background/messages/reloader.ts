import browser from 'webextension-polyfill';

import type { PlasmoMessaging } from '@plasmohq/messaging';

import type { RunningProfile, TabReloader } from '~contents/reloader';
import type { Profile } from '~schemas/options';
import { sessionStorage } from '~storage';

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const runningProfiles: RunningProfile[] = req.body;

  if (runningProfiles && req?.sender?.tab) {
    const linkCount = runningProfiles.reduce((acc, { links }) => acc + links.length, 0);
    browser.browserAction.setBadgeText({ text: linkCount > 0 ? `${linkCount}` : '', tabId: req.sender.tab.id });

    const reloader: TabReloader = {
      tabId: req.sender.tab.id,
      profiles: runningProfiles,
    };

    await sessionStorage.get<TabReloader[]>('reloaders').then(async (tabProfiles) => {
      tabProfiles = tabProfiles || [];
      const index = tabProfiles.findIndex((tabProfile) => tabProfile.tabId === reloader.tabId);
      if (index !== -1) {
        tabProfiles[index] = reloader;
      } else {
        tabProfiles.push(reloader);
      }
      await sessionStorage.set('reloaders', tabProfiles);
    });
  }

  res.send({
    message: 'ok',
  });
};

export default handler;
