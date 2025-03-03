import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';

const storage = getStorage();
export class StorageRepository {
  static async getImageUrl(path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (e) {
      console.warn(e);
      return '';
    }
  }
  static async uploadFile(file: File, path: string) {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytesResumable(storageRef, file);
    return snapshot;
  }

  static async deleteFile(path: string) {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (e) {
      console.warn(e);
    }
  }

  static async uploadImage(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytesResumable(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }

  static async getAllImages(path: string): Promise<string[]> {
    const storageRef = ref(storage, path);
    const listResult = await listAll(storageRef);
    const urls = await Promise.all(
      listResult.items.map(async (itemRef) => {
        return await getDownloadURL(itemRef);
      })
    );
    return urls;
  }
}
