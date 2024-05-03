import { Card, Checkbox, Flex, Form, Input } from 'antd';
import { getDefaultsForSchema } from 'zod-defaults';

import { useStorage } from '@plasmohq/storage/dist/hook';

import AddProfileAttributeButton from '~options/profiles/addProfileAttributeButton';
import AddProfileButton from '~options/profiles/addProfileButton';
import AddProfileExcludeButton from '~options/profiles/addProfileExcludeButton';
import AddProfileMatchButton from '~options/profiles/addProfileMatchButton';
import DeleteProfileAttributeButton from '~options/profiles/deleteProfileAttributeButton';
import DeleteProfileButton from '~options/profiles/deleteProfileButton';
import DeleteProfileExcludeButton from '~options/profiles/deleteProfileExcludeButton';
import DeleteProfileMatchButton from '~options/profiles/deleteProfileMatchButton';

export default function Profiles() {
  return (
    <>
      <Form.Item
        name={['reloader', 'enabled']}
        valuePropName="checked"
      >
        <Checkbox>Enabled</Checkbox>
      </Form.Item>
      <Form.Item dependencies={[['reloader', 'enabled']]}>
        {({ getFieldValue }) => {
          if (!getFieldValue(['reloader', 'enabled'])) {
            return null;
          }
          return (
            <Card
              size="small"
              title="Profiles"
              extra={<AddProfileButton />}
            >
              <Form.List name={['reloader', 'profiles']}>
                {(fields) =>
                  fields.length > 0 ? (
                    <>
                      {fields.map((field, profileIndex) => (
                        <Card
                          size="small"
                          key={field.key}
                          title={
                            <Form.Item
                              name={[field.name, 'name']}
                              style={{ marginBottom: 0 }}
                            >
                              <Input
                                variant="borderless"
                                size="small"
                                type="text"
                                placeholder="Profile Name"
                              />
                            </Form.Item>
                          }
                          extra={<DeleteProfileButton index={profileIndex} />}
                        >
                          <Form.Item>
                            <Card
                              size="small"
                              title="Sites"
                              extra={
                                <AddProfileAttributeButton
                                  profileIndex={profileIndex}
                                  attributeName="siteMatches"
                                />
                              }
                            >
                              <Form.List name={[field.name, 'siteMatches']}>
                                {(siteMatches) => (
                                  <>
                                    {siteMatches.map((exclude, siteMatchIndex) => (
                                      <Flex
                                        key={exclude.key}
                                        gap={10}
                                      >
                                        <Form.Item
                                          name={exclude.name}
                                          style={{ flex: 1 }}
                                        >
                                          <Input
                                            type="text"
                                            placeholder="https://example.com/*"
                                          />
                                        </Form.Item>
                                        <DeleteProfileAttributeButton
                                          profileIndex={profileIndex}
                                          attributeName="siteMatches"
                                          attributeIndex={siteMatchIndex}
                                        />
                                      </Flex>
                                    ))}
                                  </>
                                )}
                              </Form.List>
                            </Card>
                          </Form.Item>
                          <Form.Item>
                            <Card
                              size="small"
                              title="Static File Matches"
                              extra={
                                <AddProfileAttributeButton
                                  profileIndex={profileIndex}
                                  attributeName="matches"
                                  defaultValue={{
                                    pattern: '',
                                    forceReload: false,
                                  }}
                                />
                              }
                            >
                              <Form.List name={[field.name, 'matches']}>
                                {(matches) => (
                                  <>
                                    {matches.map((match, matchIndex) => (
                                      <Flex
                                        gap={10}
                                        key={match.key}
                                      >
                                        <Form.Item
                                          name={[match.name, 'pattern']}
                                          style={{ flex: 1 }}
                                        >
                                          <Input
                                            type="text"
                                            placeholder="https://example.com/*"
                                          />
                                        </Form.Item>
                                        <Form.Item
                                          name={[match.name, 'forceReload']}
                                          valuePropName="checked"
                                        >
                                          <Checkbox>Force Reload</Checkbox>
                                        </Form.Item>
                                        <DeleteProfileAttributeButton
                                          profileIndex={profileIndex}
                                          attributeName="matches"
                                          attributeIndex={matchIndex}
                                        />
                                      </Flex>
                                    ))}
                                  </>
                                )}
                              </Form.List>
                            </Card>
                          </Form.Item>
                          <Form.Item>
                            <Card
                              size="small"
                              title="Excludes"
                              extra={
                                <AddProfileAttributeButton
                                  profileIndex={profileIndex}
                                  attributeName="excludes"
                                />
                              }
                            >
                              <Form.List name={[field.name, 'excludes']}>
                                {(excludes) => (
                                  <>
                                    {excludes.map((exclude, excludeIndex) => (
                                      <Flex
                                        key={exclude.key}
                                        gap={10}
                                      >
                                        <Form.Item
                                          name={exclude.name}
                                          style={{ flex: 1 }}
                                        >
                                          <Input
                                            type="text"
                                            placeholder="https://example.com/*"
                                          />
                                        </Form.Item>
                                        <DeleteProfileAttributeButton
                                          profileIndex={profileIndex}
                                          attributeName="excludes"
                                          attributeIndex={excludeIndex}
                                        />
                                      </Flex>
                                    ))}
                                  </>
                                )}
                              </Form.List>
                            </Card>
                          </Form.Item>
                        </Card>
                      ))}
                    </>
                  ) : (
                    <>
                      You don't have any profiles. <AddProfileButton /> one now.
                    </>
                  )
                }
              </Form.List>
            </Card>
          );
        }}
      </Form.Item>
    </>
  );
}
