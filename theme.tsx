import { ConfigProvider } from 'antd';
import _ from 'lodash';
import type { ReactNode } from 'react';

import { useStorage } from '@plasmohq/storage/dist/hook';

import optionsSchema, { defaultOptions } from '~schemas/options';

export const ThemeProvider = ({ children = null as ReactNode }) => {
  const [options, setOptions] = useStorage('options', defaultOptions);
  try {
    optionsSchema.parse(options);
  } catch (e) {
    const newOptions = _.merge(defaultOptions, options);
    try {
      optionsSchema.parse(newOptions);
      setOptions(newOptions);
    } catch (e) {
      setOptions(defaultOptions);
    }
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#8000d7',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
