import { Button } from 'antd';
import { getDefaultsForSchema } from 'zod-defaults';

import { useStorage } from '@plasmohq/storage/dist/hook';

import optionsSchema from '~schemas/options';

export default function DeleteProfileAttributeButton({
  profileIndex,
  attributeIndex,
  attributeName,
}: {
  profileIndex: number;
  attributeIndex: number;
  attributeName: 'matches' | 'excludes' | 'siteMatches';
}) {
  const defaultConfig = getDefaultsForSchema(optionsSchema);
  const [options, setOptions] = useStorage('options', defaultConfig);

  return (
    <Button
      onClick={() => {
        setOptions({
          ...options,
          reloader: {
            ...options.reloader,
            profiles: options.reloader.profiles.map((profile, i) =>
              i === profileIndex
                ? {
                    ...profile,
                    [attributeName]: profile[attributeName].toSpliced(attributeIndex, 1),
                  }
                : profile,
            ),
          },
        });
      }}
    >
      Delete
    </Button>
  );
}
