import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string({ required_error: 'Name is required.' })
    .nonempty('Name is required.'),
});
