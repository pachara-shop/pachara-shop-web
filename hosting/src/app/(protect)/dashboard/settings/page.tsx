import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/atoms/tabs';
import { HeaderWrapper } from '../../components/HeaderWrapper';
import { Metadata } from 'next';
import { GallerySection } from '../../components/settings/GallerySection';
import { AboutSection } from '../../components/settings/AboutSection';
import { SocialSection } from '../../components/settings/SocialSection';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function Page() {
  return (
    <HeaderWrapper
      title='Settings'
      subTitle='Manage website content and appearance'
    >
      <div className='bg-white p-6 rounded-lg shadow-sm'>
        <Tabs defaultValue='banners' className='w-full'>
          <TabsList className='mb-8'>
            <TabsTrigger value='banners'>Gallery & Banners</TabsTrigger>
            <TabsTrigger value='about'>About Page</TabsTrigger>
            <TabsTrigger value='social'>Social Media</TabsTrigger>
          </TabsList>

          <TabsContent value='banners'>
            <GallerySection />
          </TabsContent>

          <TabsContent value='about'>
            <AboutSection />
          </TabsContent>

          <TabsContent value='social'>
            <SocialSection />
          </TabsContent>
        </Tabs>
      </div>
    </HeaderWrapper>
  );
}
