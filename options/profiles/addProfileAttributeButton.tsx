import { Button } from 'antd';
import { getDefaultsForSchema } from 'zod-defaults';

import { useStorage } from '@plasmohq/storage/dist/hook';

import optionsSchema from '~schemas/options';

export default function AddProfileAttributeButton({
  profileIndex,
  attributeName,
  defaultValue = '',
}: {
  profileIndex: number;
  attributeName: 'matches' | 'excludes' | 'siteMatches';
  defaultValue?: string | object;
}) {
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
            profiles: options.reloader.profiles.map((profile, i) =>
              i === profileIndex
                ? {
                    ...profile,
                    [attributeName]: [...profile[attributeName], defaultValue],
                  }
                : profile,
            ),
          },
        });
      }}
    >
      Add
    </Button>
  );
}
