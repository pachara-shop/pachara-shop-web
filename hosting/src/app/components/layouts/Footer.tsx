import { Icon } from '@/components/atoms/Icon';

export async function Footer() {
  return (
    <footer className='bg-white w-full'>
      <div>
        <div className='flex flex-col md:flex-row justify-between w-full'>
          <div className='mb-6 md:mb-0 bg-lime-950 w-full'>
            <div className='m-4 min-h-20 flex justify-center space-x-4 items-center'>
              <div className='flex gap-2'>
                <a href='#' className='text-white '>
                  <Icon icon='icon-[logos--facebook]' />
                </a>
                <a href='#' className='text-white '>
                  <Icon icon='icon-[skill-icons--instagram]' />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center min-h-20'>
          <p>
            &copy; {new Date().getFullYear()} Pachara Shop. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
