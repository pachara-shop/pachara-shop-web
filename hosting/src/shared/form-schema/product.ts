import { imageSizeRefine, imageTypeRefine } from '@/utils/fromValidate';
import { z } from 'zod';

export const createProductSchema = z.object({
  file: z
    .any()
    .refine((value) => value !== undefined, {
      message: 'Image is required.',
    })
    .refine((value) => value !== null, { message: 'Image is required.' })
    .refine((value) => imageSizeRefine(value), {
      message: 'Image size should not be more than 10MB.',
    })
    .refine((value) => imageTypeRefine(value), {
      message: 'Support only file type(jpeg, png, gif, jpg).',
    }),
  name: z
    .string({ required_error: 'Name is required.' })
    .nonempty('Name is required.'),
  price: z.number({ required_error: 'Price is required.' }),
  categoryId: z.string({ required_error: 'Category is required.' }),
});
