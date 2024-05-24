import { Button } from 'antd';

import { useStorage } from '@plasmohq/storage/dist/hook';

import { defaultOptions } from '~schemas/options';

export default function AddProfileButton() {
  const [options, setOptions] = useStorage('options', defaultOptions);
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
