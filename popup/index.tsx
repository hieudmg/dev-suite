import { Button, Flex, Tree, Typography, type TreeDataNode } from 'antd';
import { useState } from 'react';
import browser from 'webextension-polyfill';

import { useStorage } from '@plasmohq/storage/dist/hook';

import type { TabReloader } from '~contents/reloader';
import { sessionStorage } from '~storage';
import { ThemeProvider } from '~theme';

function Popup() {
  const [reloader, setReloader] = useState<TabReloader | undefined>();

  const [reloaders] = useStorage<TabReloader[]>({
    key: 'reloaders',
    instance: sessionStorage,
  });

  const { Title } = Typography;

  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    const tabId = tabs[0]?.id;
    setReloader(reloaders?.find((reloader) => reloader.tabId === tabId));
  });

  const linkCount = reloader?.profiles.reduce((acc, { links }) => acc + links.length, 0);
  const reloaderTree: TreeDataNode[] | undefined = reloader?.profiles.map((profile, index) => ({
    title: profile.profile.name,
    key: index,
    children: profile.links.map((link, linkIndex) => ({
      title: link,
      key: `${index}-${linkIndex}`,
    })),
  }));

  return (
    <ThemeProvider>
      <Flex
        style={{ width: 300 }}
        vertical={true}
        gap={10}
      >
        {linkCount && linkCount > 0 && (
          <>
            <Title level={4}>Watching {linkCount} urls.</Title>
            <Tree
              showLine
              treeData={reloaderTree}
              defaultExpandAll={true}
              selectable={false}
            />
          </>
        )}
        <Button
          onClick={() => {
            browser.runtime.openOptionsPage();
          }}
        >
          Options
        </Button>
      </Flex>
    </ThemeProvider>
  );
}

export default Popup;
