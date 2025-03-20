import Link from 'next/link';
import { Button } from '../atoms/Button';
import { VisuallyHidden } from '@reach/visually-hidden';
import { Icon } from '../atoms/Icon';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { useState } from 'react';

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };
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
              <Link href='https://www.facebook.com' target='_blank'>
                <Icon icon='icon-[lucide--facebook]' />
              </Link>
              <Link href='https://www.twitter.com' target='_blank'>
                <Icon icon='icon-[lucide--twitter]' />
              </Link>
              <Link href='https://www.instagram.com' target='_blank'>
                <Icon icon='icon-[lucide--instagram]' />
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { MobileMenu };
