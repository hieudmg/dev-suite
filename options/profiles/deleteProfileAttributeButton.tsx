import { Button } from 'antd';

import { useStorage } from '@plasmohq/storage/dist/hook';

import { defaultOptions } from '~schemas/options';

export default function DeleteProfileAttributeButton({
  profileIndex,
  attributeIndex,
  attributeName,
}: {
  profileIndex: number;
  attributeIndex: number;
  attributeName: 'matches' | 'excludes' | 'siteMatches';
}) {
  const [options, setOptions] = useStorage('options', defaultOptions);

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
