import { db } from '@/config/firebaseConfig';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { COLLECTION } from '@/shared/enums/collection';
import { StorageRepository } from './StorageRepository';

export class ProductGalleryRepository {
  async getGalleryById(id: string): Promise<string[]> {
    // todo
    // get gallery by id from product collection
    // return gallery with full path

    const productDoc = doc(db, COLLECTION.PRODUCT, id);
    const productSnapshot = await getDoc(productDoc);
    if (!productSnapshot.exists()) {
      throw new Error('Product not found');
    }
    const productData = productSnapshot.data();
    return productData.gallery;
  }

  async updateGallery(productId: string, imageFiles?: File[]): Promise<void> {
    const imagePaths = 'products/' + productId + '/gallery';
    const gallery = imageFiles.map((imageFile) => {
      return StorageRepository.uploadImage(imageFile, imagePaths);
    });
    const productDoc = doc(db, COLLECTION.PRODUCT, productId);
    const productSnapshot = await getDoc(productDoc);
    if (!productSnapshot.exists()) {
      throw new Error('Product not found');
    }
    const productData = {
      ...productSnapshot.data(),
      gallery: gallery,
    };
    await updateDoc(productDoc, productData);
  }
}
