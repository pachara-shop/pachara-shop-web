import { db, storage } from '@/config/firebaseConfig';
import { IProduct } from '@/shared/models/Product';
import {
  collection,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  DocumentReference,
  setDoc,
} from 'firebase/firestore';
import { ReferenceValidator } from '../ReferenceValidator';
import { COLLECTION } from '@/shared/enums/collection';
import { ICategory } from '@/shared/models/Category';
import { StorageRepository } from '../StorageRepository';
import { FetchDataParams } from '@/shared/models/Search';
import { deleteObject, listAll, ref } from 'firebase/storage';
import { paginateAndCount } from '@/services/firestore-service';

const productCollection = collection(db, COLLECTION.PRODUCT);

export class BeProductRepository {
  async searchProduct(
    params: FetchDataParams
  ): Promise<{ products: IProduct[]; totalCount: number }> {
    const { pageIndex = 0, pageSize = 10 } = params.pagination || {};

    const result = await paginateAndCount<IProduct>(
      productCollection,
      'name',
      { pageIndex, pageSize },
      async (doc) => {
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
      }
    );
    return { products: result.items, totalCount: result.totalCount };
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
      if (product.banner) {
        product.banner = await StorageRepository.getImageUrl(product.banner);
      }
      if (categoryDoc.exists()) {
        product.category = {
          ...categoryDoc.data(),
          id: categoryDoc.id,
        } as ICategory;
      }
    }
    return product;
  }

  async add(
    product: IProduct,
    imageFile: File,
    bannerFile: File
  ): Promise<void> {
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
      const imagePath = `products/${product.id}/images/${imageFile.name}`;
      await StorageRepository.uploadImage(imageFile, imagePath);
      product.image = imagePath;
    }
    if (bannerFile) {
      const filePath = `products/${product.id}/images/${bannerFile.name}`;
      await StorageRepository.uploadImage(bannerFile, filePath);
      product.banner = filePath;
    }
    const productData = {
      ...product,
      category: doc(db, COLLECTION.CATEGORY, product.category as string), // Set category as DocumentReference
    };

    await setDoc(newProductDoc, productData);
  }

  async update(
    product: IProduct,
    imageFile?: File,
    bannerFile?: File
  ): Promise<void> {
    const isValidCategory = await ReferenceValidator.validateReference(
      COLLECTION.CATEGORY,
      product.category as string
    );
    if (!isValidCategory) {
      throw new Error('Invalid category reference');
    }
    // check exit product
    if (!product.id) {
      throw new Error('Product ID is required');
    }
    const productDoc = doc(db, COLLECTION.PRODUCT, product.id);
    const productSnapshot = await getDoc(productDoc);
    if (!productSnapshot.exists()) {
      throw new Error('Product not found');
    }
    // delete old image
    if (productSnapshot.data().image && imageFile) {
      await StorageRepository.deleteFile(productSnapshot.data().image);
    }
    if (imageFile) {
      const imagePath = `products/images/${product.id}/images/${imageFile.name}`;
      await StorageRepository.uploadImage(imageFile, imagePath);
      product.image = imagePath;
    } else {
      product.image = productSnapshot.data().image;
    }
    // delete old image
    if (productSnapshot.data().banner && bannerFile) {
      await StorageRepository.deleteFile(productSnapshot.data().banner);
    }
    if (bannerFile) {
      const bannerPath = `products/${product.id}/images/banner_${bannerFile.name}`;
      await StorageRepository.uploadImage(bannerFile, bannerPath);
      product.banner = bannerPath;
    } else {
      product.banner = productSnapshot.data().banner;
    }
    const productData = {
      ...product,
      category: doc(db, COLLECTION.CATEGORY, product.category as string), // Set category as DocumentReference
    };
    await updateDoc(productDoc, productData);
  }

  async delete(id: string): Promise<void> {
    const productDoc = doc(db, COLLECTION.PRODUCT, id);
    const productSnapshot = await getDoc(productDoc);
    if (productSnapshot.exists()) {
      if (productSnapshot.data().image)
        await StorageRepository.deleteFile(productSnapshot.data().image);
      if (productSnapshot.data().banner)
        await StorageRepository.deleteFile(productSnapshot.data().banner);

      const storageRef = ref(storage, `products/${id}/gallery`);
      const listResult = await listAll(storageRef);
      const deletePromises = listResult.items.map((itemRef) => {
        return deleteObject(itemRef);
      });
      await Promise.all(deletePromises);
    }
    await deleteDoc(productDoc);
  }

  async updateStatus(id: string, highlight: boolean): Promise<void> {
    const productDoc = doc(db, COLLECTION.PRODUCT, id);
    const productSnapshot = await getDoc(productDoc);
    if (!productSnapshot.exists()) {
      throw new Error('Product not found');
    }
    const productData = {
      highlight: highlight,
    };
    await updateDoc(productDoc, productData);
  }
}
