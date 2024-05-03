import { Button } from 'antd';
import { getDefaultsForSchema } from 'zod-defaults';

import { useStorage } from '@plasmohq/storage/dist/hook';

import optionsSchema from '~schemas/options';

export default function AddProfileButton() {
  const defaultConfig = getDefaultsForSchema(optionsSchema);
  const [options, setOptions] = useStorage('options', defaultConfig);
  return (
    <Button
      size="small"
      onClick={() => {
        setOptions({
          ...options,
          reloader: {
            ...options.reloader,
            profiles: [
              ...options.reloader.profiles,
              {
                name: 'Profile #' + (options.reloader.profiles.length + 1),
                matches: [],
                excludes: [],
                siteMatches: [],
              },
            ],
          },
        });
      }}
    >
      Add
    </Button>
  );
}
