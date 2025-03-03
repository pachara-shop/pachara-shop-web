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
    await Promise.all(
      imageFiles.map(async (imageFile) => {
        const fullPath = imagePaths + imageFile.name;
        await StorageRepository.uploadImage(imageFile, fullPath);
      })
    );
  }
}

// import { StorageRepository } from './StorageRepository';

// export class ProductGalleryRepository {
//   // async getProductGalleryById(productId: string): Promise<string[]> {
//   //   const imagePaths = 'products/' + productId + '/gallery/';
//   //   return await StorageRepository.getAllImages(imagePaths);
//   // }

//   async updateProductGallery(
//     productId: string,
//     imageFiles?: File[]
//   ): Promise<void> {
//     const imagePaths = 'products/' + productId + '/gallery/';
//     const gallery = [];
//     await Promise.all(
//       imageFiles.map(async (imageFile) => {
//         const fullPath = imagePaths + imageFile.name;
//         await StorageRepository.uploadImage(imageFile, fullPath);
//         gallery.push(fullPath);
//       })
//     );
//   }
// }
