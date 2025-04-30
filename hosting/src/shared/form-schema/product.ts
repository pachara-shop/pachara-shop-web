import { imageSizeRefine, imageTypeRefine } from '@/utils/fromValidate';
import { z } from 'zod';

export const createProductSchema = z
  .object({
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
    bannerFile: z
      .any()
      .refine((value) => value !== undefined, {
        message: 'Banner is required.',
      })
      .refine((value) => value !== null, { message: 'Banner is required.' })
      .refine((value) => imageSizeRefine(value), {
        message: 'Banner size should not be more than 10MB.',
      })
      .refine((value) => imageTypeRefine(value), {
        message: 'Support only file type(jpeg, png, gif, jpg).',
      }),
    name: z
      .string({ required_error: 'Name is required.' })
      .nonempty('Name is required.'),
    price: z.number({ required_error: 'Price is required.' }),
    categoryId: z.string({ required_error: 'Category is required.' }),
    description: z
      .string({ required_error: 'Description is required.' })
      .optional(),
    isDiscounted: z.boolean().optional(),
    discountPrice: z.number().optional().nullable(),
  })
  .refine(
    (data) => {
      if (
        data.isDiscounted &&
        (data.discountPrice ||
          data.discountPrice === 0 ||
          data.discountPrice === null ||
          data.discountPrice === undefined)
      ) {
        if (data.discountPrice === undefined) return false;
        return data.discountPrice !== null && data.discountPrice < data.price;
      }
      return true;
    },
    {
      path: ['discountPrice'],
      message: 'Discount price must be less than the original price.',
    }
  );
