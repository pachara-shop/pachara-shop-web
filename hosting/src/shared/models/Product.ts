import { DocumentReference } from 'firebase/firestore';
import { ICategory } from './Category';

export interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  category?: string | DocumentReference<ICategory> | ICategory;
}
