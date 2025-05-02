export type SocialPlatformType = {
  type: string;
  name?: string;
  iconName: string;
};

export const SOCIAL_PLATFORMS: SocialPlatformType[] = [
  { type: 'facebook', name: 'Facebook', iconName: 'logos--facebook' },
  { type: 'instagram', name: 'Instagram', iconName: 'skill-icons--instagram' },
  { type: 'tiktok', name: 'TikTok', iconName: 'logos--tiktok-icon' },
  { type: 'line', name: 'Line', iconName: 'mage--line' },
  { type: 'discord', name: 'Discord', iconName: 'logos--discord' },
  { type: 'github', name: 'GitHub', iconName: 'mdi--github' },
  { type: 'twitter', name: 'Twitter', iconName: 'skill-icons--twitter' },
  { type: 'youtube', name: 'YouTube', iconName: 'logos--youtube-icon' },
  { type: 'linkedin', name: 'LinkedIn', iconName: 'skill-icons--linkedin' },
  { type: 'other', name: 'Other', iconName: 'material-symbols-light--link' },
];
