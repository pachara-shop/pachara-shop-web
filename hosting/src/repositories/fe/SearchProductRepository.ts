import { db } from '@/config/firebaseConfig';
import { COLLECTION } from '@/shared/enums/collection';
import { ICategory } from '@/shared/models/Category';
import { IProduct } from '@/shared/models/Product';
import { SearchProductsParams } from '@/shared/models/Search';
import {
  query,
  doc,
  where,
  getDocs,
  DocumentReference,
  getDoc,
  collection,
  limit,
} from 'firebase/firestore';
import { StorageRepository } from '../StorageRepository';

const productCollection = collection(db, COLLECTION.PRODUCT);

export class SearchProductRepository {
  constructor() {
    // Initialize any properties or dependencies if needed
  }

  async searchFrontendProductList(
    params: SearchProductsParams
  ): Promise<IProduct[]> {
    let q = query(productCollection);
    if (params.c && params.c !== 'all') {
      const categoryRef = doc(db, COLLECTION.CATEGORY, params.c);
      q = query(q, where('category', '==', categoryRef));
    }
    const snapshot = await getDocs(q);
    const products = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const product = { id: doc.id, ...doc.data() } as IProduct;
        if (product.image) {
          product.image = await StorageRepository.getImageUrl(product.image);
        }
        if (product.category instanceof DocumentReference) {
          const categoryDoc = await getDoc(product.category);

          if (categoryDoc.exists()) {
            const categoryData = categoryDoc.data();
            product.category = {
              ...categoryData,
              id: categoryDoc.id,
            } as ICategory;
          } else {
            product.category = undefined;
          }
        }
        return product;
      })
    );
    return products;
  }
  async searchProductByCategory(category: string): Promise<IProduct[]> {
    const categoryQuery = query(
      collection(db, COLLECTION.CATEGORY),
      where('name', '==', category)
    );
    const categorySnapshot = await getDocs(categoryQuery);
    if (categorySnapshot.empty) {
      return [];
    }

    const categoryDoc = categorySnapshot.docs[0];
    const categoryRef = doc(db, COLLECTION.CATEGORY, categoryDoc.id);
    const q = query(productCollection, where('category', '==', categoryRef));
    const snapshot = await getDocs(q);
    const products = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const product = { id: doc.id, ...doc.data() } as IProduct;
        if (product.image) {
          product.image = await StorageRepository.getImageUrl(product.image);
        }
        if (product.category instanceof DocumentReference) {
          const categoryDoc = await getDoc(product.category);

          if (categoryDoc.exists()) {
            const categoryData = categoryDoc.data();
            product.category = {
              ...categoryData,
              id: categoryDoc.id,
            } as ICategory;
          } else {
            product.category = undefined;
          }
        }
        return product;
      })
    );
    return products;
  }

  async getProductForTopPage(): Promise<IProduct[]> {
    const q = query(productCollection, limit(8));
    const snapshot = await getDocs(q);
    const products = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const product = { id: doc.id, ...doc.data() } as IProduct;
        if (product.image) {
          product.image = await StorageRepository.getImageUrl(product.image);
        }
        if (product.category instanceof DocumentReference) {
          const categoryDoc = await getDoc(product.category);

          if (categoryDoc.exists()) {
            const categoryData = categoryDoc.data();
            product.category = {
              ...categoryData,
              id: categoryDoc.id,
            } as ICategory;
          } else {
            product.category = undefined;
          }
        }
        return product;
      })
    );
    return products;
  }
}
