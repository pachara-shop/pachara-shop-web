import { DocumentReference } from 'firebase/firestore';
import { ICategory } from './Category';

export interface IProduct {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  banner: string;
  category?: string | DocumentReference<ICategory> | ICategory;
}

export interface ICreateProduct {
  id?: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  banner?: string;
  file?: File | string;
  bannerFile?: File | string;
  category?: string | DocumentReference<ICategory> | ICategory;
  categoryId?: string;
}
