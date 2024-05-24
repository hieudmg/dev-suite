import { Button } from 'antd';

import { useStorage } from '@plasmohq/storage/dist/hook';

import { defaultOptions } from '~schemas/options';

export default function AddProfileAttributeButton({
  profileIndex,
  attributeName,
  defaultValue = '',
}: {
  profileIndex: number;
  attributeName: 'matches' | 'excludes' | 'siteMatches';
  defaultValue?: string | object;
}) {
  const [options, setOptions] = useStorage('options', defaultOptions);

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
