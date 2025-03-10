import { useAuth } from '@/context/AuthContext';
import { User } from 'lucide-react';

const Header = () => {
  const { currentUser } = useAuth();
  return (
    <header>
      <div className=' flex items-center justify-end bg-white  h-[120px] px-4 absolute top-0  w-[calc(100%-20rem)]'>
        <div className='flex items-center'>
          <User size={24} />
          <span className='ml-2'>{currentUser?.email}</span>
          {/* <ChevronDown size={24} className='ml-2' /> */}
        </div>
      </div>
    </header>
  );
};

export { Header };
