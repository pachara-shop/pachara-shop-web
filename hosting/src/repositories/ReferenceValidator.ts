import { db } from '@/config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export const ReferenceValidator = {
  validateReference: async (
    collectionName: string,
    id: string
  ): Promise<boolean> => {
    const refDoc = doc(db, collectionName, id);
    const docSnapshot = await getDoc(refDoc);
    return docSnapshot.exists();
  },
};
