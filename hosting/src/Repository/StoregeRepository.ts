import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

const storage = getStorage();
export class StorageRepository {
  static async getImageUrl(path: string): Promise<string> {
    const storageRef = ref(storage, path);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }
  static async uploadFile(file: File, path: string) {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytesResumable(storageRef, file);
    return snapshot;
  }

  static async deleteFile(path: string) {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  }

  static async uploadImage(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytesResumable(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }
}
