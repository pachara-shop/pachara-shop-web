import { db } from '@/config/firebaseConfig';
import { COLLECTION } from '@/shared/enums/collection';
import { ICategory } from '@/shared/models/Category';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

const categoryCollection = COLLECTION.CATEGORY;
export class CategoryRepository {
  static async getAll() {
    const querySnapshot = await getDocs(collection(db, categoryCollection));
    const categories = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
    return categories;
  }
  static async getById(id: string): Promise<ICategory> {
    const docRef = doc(db, categoryCollection, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return null;
    }
    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name,
      ...data,
    };
  }
  static async create(category: ICategory): Promise<string> {
    const docRef = await addDoc(collection(db, categoryCollection), category);
    return docRef.id;
  }
  static async update(id: string, category: ICategory) {
    const docRef = doc(db, categoryCollection, id);
    await setDoc(docRef, category);
  }
  static async delete(id: string) {
    const docRef = doc(db, categoryCollection, id);
    await deleteDoc(docRef);
  }
}
