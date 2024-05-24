import { Button } from 'antd';

import { useStorage } from '@plasmohq/storage/dist/hook';

import { defaultOptions } from '~schemas/options';

export default function DeleteProfileButton({ index }: { index: number }) {
  const [options, setOptions] = useStorage('options', defaultOptions);

  return (
    <Button
      size="small"
      onClick={() => {
        setOptions({
          ...options,
          reloader: {
            ...options.reloader,
            profiles: options.reloader.profiles.toSpliced(index, 1),
          },
        });
      }}
    >
      Delete
    </Button>
  );
}
