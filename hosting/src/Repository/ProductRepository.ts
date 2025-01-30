import { db } from '@/config/firebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

interface IProduct {
  id?: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const productCollection = collection(db, 'products');

export const ProductRepository = {
  getAll: async (): Promise<IProduct[]> => {
    const snapshot = await getDocs(productCollection);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as IProduct)
    );
  },

  add: async (product: IProduct): Promise<void> => {
    await addDoc(productCollection, product);
  },

  update: async (id: string, product: Partial<IProduct>): Promise<void> => {
    const productDoc = doc(db, 'products', id);
    await updateDoc(productDoc, product);
  },

  delete: async (id: string): Promise<void> => {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
  },
};
