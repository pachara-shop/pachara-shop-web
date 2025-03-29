import { Metadata } from 'next';
import { HeaderWrapper } from '../components/HeaderWrapper';
export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Page() {
  return (
    <HeaderWrapper title='Dashboard' subTitle=''>
      <> Dashboard</>
    </HeaderWrapper>
  );
}
