import { SettingSocialMedia } from '@/shared/models/Settings';
import Link from 'next/link';
import { SocialIcon } from '../atoms/socialIcon';

interface PCMenuProps {
  icons: SettingSocialMedia[];
}

export const PCMenu: React.FC<PCMenuProps> = ({ icons }) => {
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
            <SocialIcon type={social.type} />
          </a>
        ))}
      </div>
    </div>
  );
};
