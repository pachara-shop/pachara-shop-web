import { DocumentReference } from 'firebase/firestore';
import { ICategory } from './Category';

export interface IProduct {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  banner: string;
  isDiscounted?: boolean;
  discountPrice?: number;
  category?: string | DocumentReference<ICategory> | ICategory;
  highlight?: boolean;
}

export interface ICreateProduct {
  id?: string;
  name: string;
  description?: string;
  price?: number;
  isDiscounted?: boolean;
  discountPrice?: number;
  image?: string;
  banner?: string;
  file?: File | string;
  bannerFile?: File | string;
  category?: string | DocumentReference<ICategory> | ICategory;
  categoryId?: string;
  highlight?: boolean;
}
