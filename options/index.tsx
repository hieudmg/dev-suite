import { Form, Tabs } from 'antd';
import { useEffect } from 'react';

import { useStorage } from '@plasmohq/storage/dist/hook';

import Profiles from '~options/profiles/profiles';
import { defaultOptions } from '~schemas/options';
import { ThemeProvider } from '~theme';

function Options() {
  const [options, setOptions] = useStorage('options', defaultOptions);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(options);
  }, [options]);

  return (
    <ThemeProvider>
      <Form
        form={form}
        onChange={() => {
          setOptions(form.getFieldsValue());
        }}
      >
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Reloader',
              children: <Profiles />,
            },
          ]}
        />
      </Form>
    </ThemeProvider>
  );
}

export default Options;
