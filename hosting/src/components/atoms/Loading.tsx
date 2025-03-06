import { Icon } from './Icon';

const Loading: React.FC = () => (
  <div className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50 h-screen w-screen cursor-wait'>
    <Icon icon='icon-[eos-icons--bubble-loading]' />
  </div>
);

export default Loading;
