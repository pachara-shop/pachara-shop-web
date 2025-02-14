import { z } from 'zod';

export const createProductSchema = z.object({
  image: z.string({ required_error: 'Image is required.' }),
  name: z
    .string({ required_error: 'Name is required.' })
    .nonempty('Name is required.'),
  price: z.number({ required_error: 'Price is required.' }),
  category: z.string({ required_error: 'Category is required.' }),
});
