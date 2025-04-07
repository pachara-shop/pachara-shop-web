import Link from 'next/link';
import { Button } from '../atoms/Button';
import { VisuallyHidden } from '@reach/visually-hidden';
import { Icon } from '../atoms/Icon';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { useState } from 'react';
import { SettingSocialMedia } from '@/shared/models/Settings';
import {
  Facebook,
  Instagram,
  Linkedin,
  LinkIcon,
  Twitter,
  Youtube,
} from 'lucide-react';

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

interface MobileMenuProps {
  icons: SettingSocialMedia[]; // Replace 'any' with the appropriate type for 'icons' if known
}

const MobileMenu: React.FC<MobileMenuProps> = ({ icons }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  function getSocialIcon(type: string): React.ReactNode {
    const platform = socialPlatforms.find((p) => p.id === type);
    return platform?.icon || <LinkIcon className='h-5 w-5' />;
  }
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' onClick={() => setIsOpen(true)}>
          <Icon icon='icon-[lucide--menu]' />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <VisuallyHidden>
          <SheetTitle className='hidden'>Menu</SheetTitle>
        </VisuallyHidden>
        <div className='grid gap-4 py-4 h-full mt-4'>
          <ul className='flex flex-col items-end space-y-4 font-bold flex-grow'>
            <li className='border-b border-gray-200 w-full text-right'>
              <Link onClick={handleLinkClick} href='/'>
                Home
              </Link>
            </li>
            <li className='border-b border-gray-200 w-full text-right'>
              <Link
                onClick={handleLinkClick}
                href='/about'
                className='text-black'
              >
                About
              </Link>
            </li>
          </ul>
          <div className='mt-auto'>
            <div className='flex justify-end space-x-4'>
              {icons.map((icon) => (
                <Link
                  key={icon.id}
                  href={icon.url || '#'}
                  target='_blank'
                  onClick={handleLinkClick}
                >
                  {getSocialIcon(icon.type)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { MobileMenu };
