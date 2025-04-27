import { Icon } from '@/components/atoms/Icon';
import { Input } from '@/components/atoms/input';
import { Title } from '@/components/atoms/Typography';

const ShopSideBar = () => {
  return (
    <div className='sticky top-0 h-screen overflow-y-auto border-r shadow p-4 bg-white'>
      <div className='border-b relative'>
        <Icon
          icon='icon-[material-symbols--search]'
          className='absolute top-2 right-3 text-muted-foreground text-base'
        />
        <Input
          placeholder='Search...'
          className='w-full mb-3 rounded-full'
          type='text'
        />
      </div>
      <h3 className='font-semibold text-lg mb-3 mt-2'>Categories</h3>
      <div className='space-y-4'>
        <div className='border-b pb-3'>
          <h4 className='font-medium mb-2'>All</h4>
          <ul className='space-y-1'>
            <li>
              <Title>หมวดหมู่ 2</Title>
            </li>
            <li>
              <Title>หมวดหมู่ 3</Title>
            </li>
            <li>
              <Title>หมวดหมู่ 4</Title>
            </li>
            <li>
              <Title>หมวดหมู่ 5</Title>
            </li>
            <li>
              <Title>หมวดหมู่ 6</Title>
            </li>
            <li>
              <Title>หมวดหมู่ 7</Title>
            </li>
          </ul>
        </div>
        <div className='border-b pb-3'>
          <h4 className='font-medium mb-2'>Price</h4>
          <div className='space-y-1'>
            <div>0 - 1,000</div>
            <div>1,001 - 5,000</div>
            <div>5,001 ...</div>
          </div>
        </div>
        {/* เพิ่มตัวกรองอื่นๆ */}
        <div>
          <h4 className='font-medium mb-2'>Other</h4>
          <ul className='space-y-1'>
            <li>
              <Title>Sale</Title>
            </li>
            <li>
              <Title>New</Title>
            </li>
            <li>
              <Title>Incoming</Title>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { ShopSideBar };
