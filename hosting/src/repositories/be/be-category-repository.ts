import { db } from '@/config/firebaseConfig';
import { paginateAndCount } from '@/services/firestore-service';
import { COLLECTION } from '@/shared/enums/collection';
import { ICategory } from '@/shared/models/Category';
import { FetchDataParams } from '@/shared/models/Search';
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
const catCollection = collection(db, COLLECTION.CATEGORY);

export class CategoryRepository {
  static async searchCategory(params: FetchDataParams) {
    const { pageIndex = 0, pageSize = 10 } = params.pagination || {};
    const result = await paginateAndCount<ICategory>(
      catCollection,
      'name',
      { pageIndex, pageSize },
      async (doc) => {
        return { id: doc.id, ...doc.data() } as ICategory;
      }
    );
    return { categories: result.items, totalCount: result.totalCount };
  }

  static async getCategoryOption(): Promise<ICategory[]> {
    const querySnapshot = await getDocs(collection(db, categoryCollection));
    const categories = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      } as ICategory;
    });
    return categories;
  }
  static async getById(id: string): Promise<ICategory | null> {
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
