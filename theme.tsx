import { ConfigProvider } from 'antd';
import _ from 'lodash';
import type { ReactNode } from 'react';
import { getDefaultsForSchema } from 'zod-defaults';

import { useStorage } from '@plasmohq/storage/dist/hook';

import optionsSchema from '~schemas/options';

export const ThemeProvider = ({ children = null as ReactNode }) => {
  const defaultConfig = getDefaultsForSchema(optionsSchema);
  const [options, setOptions] = useStorage('options', defaultConfig);
  try {
    optionsSchema.parse(options);
  } catch (e) {
    const newOptions = _.merge(defaultConfig, options);
    try {
      optionsSchema.parse(newOptions);
      setOptions(newOptions);
    } catch (e) {
      setOptions(defaultConfig);
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
