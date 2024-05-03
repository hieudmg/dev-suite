// get current tab url
// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//
// })

// run function on changing tabs
import browser from 'webextension-polyfill';

import type { TabReloader } from '~contents/reloader';
import { sessionStorage } from '~storage';

// sessionStorage.watch({
//   reloaders: ({ newValue }) => {
//     const reloaders: TabReloader[] = newValue;
//     for (const reloader of reloaders) {
//       if (reloader.tabId) {
//         const linkCount = reloader.profiles.reduce((acc, { links }) => acc + links.length, 0);
//         browser.browserAction.setBadgeText({ text: linkCount > 0 ? `${linkCount}` : '', tabId: reloader.tabId });
//       }
//     }
//   },
// });
