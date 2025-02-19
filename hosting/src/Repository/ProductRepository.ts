import { db } from '@/config/firebaseConfig';
import { IProduct } from '@/shared/models/Product';
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  DocumentReference,
  setDoc,
  query,
  where,
} from 'firebase/firestore';
import { ReferenceValidator } from './ReferenceValidator';
import { COLLECTION } from '@/shared/enums/collection';
import { ICategory } from '@/shared/models/Category';
import { StorageRepository } from './StoregeRepository';
import { FetchDataParams, SearchProductsParams } from '@/shared/models/Search';

const productCollection = collection(db, COLLECTION.PRODUCT);

export class ProductRepository {
  async getAll(_params: FetchDataParams): Promise<IProduct[]> {
    const snapshot = await getDocs(productCollection);
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
              id: categoryDoc.id,
              ...categoryData,
            } as ICategory;
          } else {
            product.category = null;
          }
        }
        return product;
      })
    );
    return products;
  }

  async searchFrontendProductList(
    params: SearchProductsParams
  ): Promise<IProduct[]> {
    // search category by name
    let q = query(productCollection);

    if (params.c && params.c !== 'all') {
      // search category by name
      const categoryRef = doc(db, COLLECTION.CATEGORY, params.c);
      q = query(productCollection, where('category', '==', categoryRef));
    }
    console.log(params);

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
              id: categoryDoc.id,
              ...categoryData,
            } as ICategory;
          } else {
            product.category = null;
          }
        }
        return product;
      })
    );
    return products;
  }

  async getById(id: string): Promise<IProduct | null> {
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
      if (product.image) {
        product.image = await StorageRepository.getImageUrl(product.image);
      }
      if (categoryDoc.exists()) {
        product.category = {
          id: categoryDoc.id,
          ...categoryDoc.data(),
        } as ICategory;
      }
    }
    return product;
  }

  async add(product: IProduct, imageFile: File): Promise<void> {
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

    const newProductDoc = await doc(productCollection);
    product.id = newProductDoc.id;

    if (imageFile) {
      const imagePath = `products/images/${product.id}/${imageFile.name}`;
      await StorageRepository.uploadImage(imageFile, imagePath);
      product.image = imagePath;
    }
    const productData = {
      ...product,
      category: doc(db, COLLECTION.CATEGORY, product.category as string), // Set category as DocumentReference
    };

    await setDoc(newProductDoc, productData);
  }

  // async update(id: string, product: Partial<IProduct>): Promise<void> {
  async update(product: IProduct, imageFile?: File): Promise<void> {
    const isValidCategory = await ReferenceValidator.validateReference(
      COLLECTION.CATEGORY,
      product.category as string
    );
    if (!isValidCategory) {
      throw new Error('Invalid category reference');
    }
    // check exit product
    const productDoc = doc(db, COLLECTION.PRODUCT, product.id);
    const productSnapshot = await getDoc(productDoc);
    if (!productSnapshot.exists()) {
      throw new Error('Product not found');
    }
    // delete old image
    if (productSnapshot.data().image) {
      await StorageRepository.deleteFile(productSnapshot.data().image);
    }

    if (imageFile) {
      const imagePath = `products/images/${product.id}/${imageFile.name}`;
      await StorageRepository.uploadImage(imageFile, imagePath);
      product.image = imagePath;
    } else {
      product.image = productSnapshot.data().image;
    }
    const productData = {
      ...product,
      category: doc(db, COLLECTION.CATEGORY, product.category as string), // Set category as DocumentReference
    };
    await updateDoc(productDoc, productData);
  }

  async delete(id: string): Promise<void> {
    const productDoc = doc(db, COLLECTION.PRODUCT, id);
    // remove image
    const productSnapshot = await getDoc(productDoc);
    if (productSnapshot.exists() && productSnapshot.data().image) {
      await StorageRepository.deleteFile(productSnapshot.data().image);
    }
    await deleteDoc(productDoc);
  }
}
