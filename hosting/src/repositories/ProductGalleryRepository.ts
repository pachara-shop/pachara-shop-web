import { db } from '@/config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { COLLECTION } from '@/shared/enums/collection';
import { StorageRepository } from './StorageRepository';

export class ProductGalleryRepository {
  async getGalleryById(id: string): Promise<string[]> {
    const productDoc = doc(db, COLLECTION.PRODUCT, id);
    const productSnapshot = await getDoc(productDoc);
    if (!productSnapshot.exists()) {
      throw new Error('Product not found');
    }
    const productData = productSnapshot.data();
    return productData.gallery;
  }

  async getProductGalleryById(productId: string): Promise<string[]> {
    const imagePaths = 'products/' + productId + '/gallery/';
    return await StorageRepository.getAllImages(imagePaths);
  }

  async updateGallery(productId: string, imageFiles?: File[]): Promise<void> {
    const imagePaths = 'products/' + productId + '/gallery/';
    if (imageFiles) {
      await Promise.all(
        imageFiles.map(async (imageFile) => {
          const fullPath = imagePaths + imageFile.name;
          await StorageRepository.uploadImage(imageFile, fullPath);
        })
      );
    }
  }

  async deleteProductImageWithFullPath(fullPath: string): Promise<void> {
    try {
      const realPath = ProductGalleryRepository.extractPathFromUrl(fullPath);
      await StorageRepository.deleteFile(realPath);
    } catch (e) {
      console.warn(e);
    }
  }

  private static extractPathFromUrl(url: string): string {
    const match = url.match(/\/o\/(.*?)\?/);
    if (match && match[1]) {
      return decodeURIComponent(match[1]);
    }
    throw new Error('Invalid URL');
  }
}
