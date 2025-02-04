import { Icon } from './Icon';

const Loading: React.FC = () => (
  <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-99 h-full w-full cursor-wait'>
    <Icon icon='icon-[eos-icons--bubble-loading]' />
  </div>
);

export default Loading;
