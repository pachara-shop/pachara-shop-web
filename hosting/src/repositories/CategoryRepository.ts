import { db } from '@/config/firebaseConfig';
import { COLLECTION } from '@/shared/enums/collection';
import { ICategory } from '@/shared/models/Category';
import { FetchDataParams } from '@/shared/models/Search';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore';

const categoryCollection = COLLECTION.CATEGORY;
export class CategoryRepository {
  static async getAll(params: FetchDataParams) {
    const { pagination, sorting, columnFilters } = params;
    let dbQuery = query(collection(db, categoryCollection));
    if (columnFilters.length > 0) {
      columnFilters.forEach((filter) => {
        const start = filter.value;
        const end = filter.value + '\uf8ff';
        dbQuery = query(
          dbQuery,
          where(filter.id, '>=', start),
          where(filter.id, '<=', end)
        );
      });
    }
    // Get total count
    const totalCountSnapshot = await getCountFromServer(dbQuery);
    const totalCount = totalCountSnapshot.data().count;

    // Add sorting
    if (sorting && sorting.length > 0) {
      sorting.forEach((sort) => {
        const offset = pagination.pageIndex * pagination.pageSize;
        dbQuery = query(
          dbQuery,
          orderBy(sort.id, sort.desc ? 'desc' : 'asc'),
          startAfter(offset),
          limit(pagination.pageSize)
        );
      });
    }

    // Add pagination
    // if (pagination) {
    //   const offset = pagination.pageIndex * pagination.pageSize;
    //   dbQuery = query(dbQuery, startAfter(offset), limit(pagination.pageSize));
    // }

    const querySnapshot = await getDocs(dbQuery);
    const categories = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
    return { categories, totalCount };
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
