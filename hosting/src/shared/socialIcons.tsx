import { Icon } from '@/components/atoms/Icon';
import {
  Facebook,
  Instagram,
  Linkedin,
  LinkIcon,
  Twitter,
  Youtube,
} from 'lucide-react';

// Social Media ที่รองรับ
export const socialPlatforms = [
  { id: 'facebook', name: 'Facebook', icon: <Facebook className='h-5 w-5' /> },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <Instagram className='h-5 w-5' />,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: <Icon className='h-5 w-5' icon='icon-[ic--baseline-tiktok]' />,
  },
  {
    id: 'line',
    name: 'Line',
    icon: <Icon className='h-5 w-5' icon='icon-[mage--line]' />,
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: <Icon className='h-5 w-5' icon='icon-[logos--discord]' />,
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: <Icon className='h-5 w-5' icon='icon-[mdi--github]' />,
  },
  { id: 'twitter', name: 'Twitter', icon: <Twitter className='h-5 w-5' /> },
  { id: 'youtube', name: 'YouTube', icon: <Youtube className='h-5 w-5' /> },
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin className='h-5 w-5' /> },
  { id: 'other', name: 'Other', icon: <LinkIcon className='h-5 w-5' /> },
];
