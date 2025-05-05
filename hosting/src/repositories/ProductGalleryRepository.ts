import { StorageRepository } from './StorageRepository';

export class ProductGalleryRepository {
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
      console.error(e);
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
