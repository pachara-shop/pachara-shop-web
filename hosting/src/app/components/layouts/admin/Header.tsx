import { useAuth } from '@/context/AuthContext';
import { RootState } from '@/hooks/store';
import { User } from 'lucide-react';
import { useSelector } from 'react-redux';

const Header = () => {
  const { currentUser } = useAuth();
  const { title, subTitle } = useSelector(
    (state: RootState) => state.layout.header
  );
  return (
    <header>
      <div className='flex items-center justify-between bg-white h-[120px] pr-12 absolute top-0 w-[calc(100%-20rem)]'>
        <div className='flex flex-col'>
          <h1 className='text-2xl font-bold'>{title ?? ''}</h1>
          <p className='text-gray-500'>{subTitle}</p>
        </div>
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
