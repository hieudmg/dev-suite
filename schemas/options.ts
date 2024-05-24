import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string(),
  siteMatches: z.array(z.string()),
  matches: z.array(
    z.object({
      pattern: z.string(),
      forceReload: z.boolean().default(false),
    }),
  ),
  excludes: z.array(z.string()),
});

const optionsSchema = z.object({
  reloader: z.object({
    enabled: z.boolean().default(true),
    profiles: z.array(profileSchema),
  }),
});

export default optionsSchema;
export type Options = z.infer<typeof optionsSchema>;
export type Profile = z.infer<typeof profileSchema>;

export const defaultOptions: Options = {
  reloader: {
    enabled: true,
    profiles: [],
  },
};
