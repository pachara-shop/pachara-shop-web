import { SettingSocialMedia } from '@/shared/models/Settings';
import {
  Facebook,
  Instagram,
  Linkedin,
  LinkIcon,
  Twitter,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';
import { Icon } from '../atoms/Icon';

const socialPlatforms = [
  { id: 'facebook', name: 'Facebook', icon: <Facebook className='h-5 w-5' /> },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <Instagram className='h-5 w-5' />,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: <Icon className='h-5 w-5' icon='icon-[logos--tiktok-icon]' />,
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

interface PCMenuProps {
  icons: SettingSocialMedia[];
}

export const PCMenu: React.FC<PCMenuProps> = ({ icons }) => {
  function getSocialIcon(type: string): React.ReactNode {
    const platform = socialPlatforms.find((p) => p.id === type);
    return platform?.icon || <LinkIcon className='h-5 w-5' />;
  }
  return (
    <div className='hidden md:block'>
      <ul className='flex space-x-4 font-bold'>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/about' className='text-black'>
            About
          </Link>
        </li>
      </ul>
      <div className='flex items-baseline space-x-3 mt-2'>
        {icons.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-600 hover:text-primary transition-colors'
          >
            {getSocialIcon(social.type)}
          </a>
        ))}
      </div>
    </div>
  );
};
