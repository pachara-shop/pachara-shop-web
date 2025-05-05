export interface SettingBanner {
  id: string;
  url: string;
}

export interface SettingSocialMedia {
  id: string;
  url?: string;
  type: string;
}

export interface ISettings {
  id: string;
  /**
   * list of banners
   */
  banners: SettingBanner[];
  about: string;
  socials: SettingSocialMedia[];
  description?: string;
  updatedAt?: Date;
  createdAt?: Date;
}
