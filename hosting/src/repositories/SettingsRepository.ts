import { db } from '@/config/firebaseConfig';
import { COLLECTION } from '@/shared/enums/collection';
import { SettingBanner, SettingSocialMedia } from '@/shared/models/Settings';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
} from 'firebase/firestore';
import { StorageRepository } from './StorageRepository';

export class SettingsRepository {
  async getSettingBanners(): Promise<SettingBanner[]> {
    const settingsRef = collection(db, COLLECTION.SETTINGS);
    const q = query(settingsRef, limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      const defaultSettings = { banners: [] };
      const newDocRef = doc(settingsRef);
      await setDoc(newDocRef, defaultSettings);
      return [];
    } else {
      const firstDoc = querySnapshot.docs[0];
      const bannersCollectionRef = collection(
        db,
        COLLECTION.SETTINGS,
        firstDoc.id,
        'banners'
      );
      const bannersSnapshot = await getDocs(bannersCollectionRef);
      return bannersSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as SettingBanner)
      );
    }
  }

  async addBanner(banners: File[]): Promise<SettingBanner[]> {
    if (banners.length === 0) {
      throw new Error('No file provided');
    }
    const result = await Promise.all(
      banners.map(async (banner) => {
        const bannerPath =
          'settings/banners/' + banner.name.replace(/\s/g, '_');
        const imagePath = await StorageRepository.uploadImage(
          banner,
          bannerPath
        );
        const settingsRef = collection(db, COLLECTION.SETTINGS);
        const q = query(settingsRef, limit(1));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          const defaultSettings = { banners: [] };
          const newDocRef = doc(settingsRef);
          await setDoc(newDocRef, defaultSettings);
        }
        const firstDoc = querySnapshot.docs[0];
        const bannersCollectionRef = collection(
          db,
          COLLECTION.SETTINGS,
          firstDoc.id,
          'banners'
        );
        const newBannerRef = doc(bannersCollectionRef);
        const newBanner: SettingBanner = {
          id: newBannerRef.id,
          url: imagePath,
        };
        await setDoc(newBannerRef, newBanner);
        return newBanner;
      })
    );

    return result;
  }

  async deleteBanner(id: string): Promise<void> {
    //todo : delete image from storage and remove subcollection banner in settings
    const settingsRef = collection(db, COLLECTION.SETTINGS);
    const q = query(settingsRef, limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error('No settings document found');
    }
    const firstDoc = querySnapshot.docs[0];
    const bannersCollectionRef = collection(
      db,
      COLLECTION.SETTINGS,
      firstDoc.id,
      'banners'
    );
    const bannerDocRef = doc(bannersCollectionRef, id);
    const bannerDocSnap = await getDoc(bannerDocRef);
    if (!bannerDocSnap.exists()) {
      throw new Error('No such document!');
    }
    const bannerData = bannerDocSnap.data() as SettingBanner;
    const imagePath = bannerData.url;
    await StorageRepository.deleteFile(imagePath);
    // remove the banner document from the subcollection
    await setDoc(bannerDocRef, {}, { merge: true });
    await deleteDoc(bannerDocRef);
  }

  async getAbout(): Promise<string> {
    const settingsRef = collection(db, COLLECTION.SETTINGS);
    const q = query(settingsRef, limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const defaultSettings = { about: '' };
      const newDocRef = doc(settingsRef);
      await setDoc(newDocRef, defaultSettings);
      return '';
    } else {
      const firstDoc = querySnapshot.docs[0];
      const aboutDocRef = doc(db, COLLECTION.SETTINGS, firstDoc.id);
      const aboutDocSnap = await getDoc(aboutDocRef);
      if (aboutDocSnap.exists()) {
        return aboutDocSnap.data().about;
      } else {
        return '';
      }
    }
  }

  async updateAbout(about: string): Promise<void> {
    const settingsRef = collection(db, COLLECTION.SETTINGS);
    const q = query(settingsRef, limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const defaultSettings = { about: '' };
      const newDocRef = doc(settingsRef);
      await setDoc(newDocRef, defaultSettings);
    }
    const firstDoc = querySnapshot.docs[0];
    const aboutDocRef = doc(db, COLLECTION.SETTINGS, firstDoc.id);
    await setDoc(aboutDocRef, { about });
  }

  async getSocialMedia(): Promise<SettingSocialMedia[]> {
    // todo : get socials from settings sub collection
    const settingsRef = collection(db, COLLECTION.SETTINGS);
    const q = query(settingsRef, limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const defaultSettings = { socials: [] };
      const newDocRef = doc(settingsRef);
      await setDoc(newDocRef, defaultSettings);
      return [];
    } else {
      const firstDoc = querySnapshot.docs[0];
      const socialsCollectionRef = collection(
        db,
        COLLECTION.SETTINGS,
        firstDoc.id,
        'socials'
      );
      const socialsSnapshot = await getDocs(socialsCollectionRef);
      return socialsSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as SettingSocialMedia)
      );
    }
  }
  async updateSocial(data: SettingSocialMedia[]): Promise<void> {
    const settingsRef = collection(db, COLLECTION.SETTINGS);
    const q = query(settingsRef, limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const defaultSettings = { socials: [] };
      const newDocRef = doc(settingsRef);
      await setDoc(newDocRef, defaultSettings);
    }
    const firstDoc = querySnapshot.docs[0];
    const socialsCollectionRef = collection(
      db,
      COLLECTION.SETTINGS,
      firstDoc.id,
      'socials'
    );
    const existingSocialsSnapshot = await getDocs(socialsCollectionRef);
    const deletionPromises = existingSocialsSnapshot.docs.map((doc) =>
      deleteDoc(doc.ref)
    );
    await Promise.all(deletionPromises);

    const addPromises = data.map((item) => {
      const newSocialRef = doc(socialsCollectionRef);
      const socialWithId = {
        ...item,
        id: item.id || newSocialRef.id,
      };

      return setDoc(newSocialRef, socialWithId);
    });

    await Promise.all(addPromises);
  }
}
