import { SocialIcon } from '@/components/atoms/socialIcon';
import { SettingSocialMedia } from '@/shared/models/Settings';

export async function Footer({
  socialIcons,
}: {
  socialIcons: SettingSocialMedia[];
}) {
  return (
    <footer className='bg-white w-full'>
      <div className='flex flex-col md:flex-row justify-between w-full'>
        <div className='mb-6 md:mb-0 bg-lime-950 w-full'>
          <div className='m-4 min-h-20 flex justify-center space-x-4 items-center'>
            <div className='flex gap-2'>
              {socialIcons.map((icon) => (
                <a
                  key={icon.id}
                  href={icon.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-600 hover:text-primary transition-colors'
                >
                  <SocialIcon type={icon.type} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center min-h-20'>
        <p>
          &copy; {new Date().getFullYear()} Pachara Shop. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
