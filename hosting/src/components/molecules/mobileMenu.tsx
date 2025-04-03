import Link from 'next/link';
import { Button } from '../atoms/Button';
import { VisuallyHidden } from '@reach/visually-hidden';
import { Icon } from '../atoms/Icon';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { useState } from 'react';
import { SettingSocialMedia } from '@/shared/models/Settings';
import { socialPlatforms } from '@/shared/socialIcons';
import { LinkIcon } from 'lucide-react';

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
          <SheetTitle className='hidden'>เมนู</SheetTitle>
        </VisuallyHidden>
        <div className='grid gap-4 py-4 h-full mt-4'>
          <ul className='flex flex-col items-end space-y-4 font-bold flex-grow'>
            <li className='border-b border-gray-200 w-full text-right'>
              <Link onClick={handleLinkClick} href='/'>
                หน้าแรก
              </Link>
            </li>
            <li className='border-b border-gray-200 w-full text-right'>
              <Link
                onClick={handleLinkClick}
                href='/about'
                className='text-black'
              >
                เกี่ยวกับเรา
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
