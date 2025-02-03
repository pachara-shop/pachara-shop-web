import { db } from '@/config/firebaseConfig';
import { IProduct } from '@/shared/models/Product';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  DocumentReference,
} from 'firebase/firestore';
import { ReferenceValidator } from './ReferenceValidator';
import { COLLECTION } from '@/shared/enums/collection';
import { ICategory } from '@/shared/models/Category';

const productCollection = collection(db, COLLECTION.PRODUCT);

export const ProductRepository = {
  getAll: async (): Promise<IProduct[]> => {
    const snapshot = await getDocs(productCollection);
    const products = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const product = { id: doc.id, ...doc.data() } as IProduct;
        if (product.category instanceof DocumentReference) {
          const categoryDoc = await getDoc(product.category);
          if (categoryDoc.exists()) {
            product.category = {
              id: categoryDoc.id,
              ...categoryDoc.data(),
            } as ICategory;
          }
        }
        return product;
      })
    );
    return products;
  },

  getById: async (id: string): Promise<IProduct | null> => {
    const productDoc = doc(db, COLLECTION.PRODUCT, id);
    const productSnapshot = await getDoc(productDoc);
    if (!productSnapshot.exists()) {
      return null;
    }
    const product = {
      id: productSnapshot.id,
      ...productSnapshot.data(),
    } as IProduct;
    if (product.category instanceof DocumentReference) {
      const categoryDoc = await getDoc(product.category);
      if (categoryDoc.exists()) {
        product.category = {
          id: categoryDoc.id,
          ...categoryDoc.data(),
        } as ICategory;
      }
    }
    return product;
  },

  add: async (product: IProduct): Promise<void> => {
    if (!product || typeof product !== 'object') {
      throw new Error('Invalid product data');
    }
    const isValidCategory = await ReferenceValidator.validateReference(
      COLLECTION.CATEGORY,
      product.category as string
    );
    if (!isValidCategory) {
      throw new Error('Invalid category reference');
    }
    const productData = {
      ...product,
      category: doc(db, COLLECTION.CATEGORY, product.category as string), // Set category as DocumentReference
    };
    await addDoc(productCollection, productData);
  },

  update: async (id: string, product: Partial<IProduct>): Promise<void> => {
    const productDoc = doc(db, COLLECTION.PRODUCT, id);
    await updateDoc(productDoc, product);
  },

  delete: async (id: string): Promise<void> => {
    const productDoc = doc(db, COLLECTION.PRODUCT, id);
    await deleteDoc(productDoc);
  },
};
