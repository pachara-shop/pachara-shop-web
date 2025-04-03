'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/atoms/form';
import { Input } from '@/components/atoms/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import { CustomButton } from '@/components/ui/CustomButton';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Trash2,
  PlusCircle,
  Link as LinkIcon,
} from 'lucide-react';
import {
  useGetSettingSocialQuery,
  useUpdateSettingSocialMutation,
} from '@/hooks/slices/be/settings/socialAPI';
import { SettingSocialMedia } from '@/shared/models/Settings';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';

// Social Media ที่รองรับ
const socialPlatforms = [
  { id: 'facebook', name: 'Facebook', icon: <Facebook className='h-5 w-5' /> },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <Instagram className='h-5 w-5' />,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: <Icon className='h-5 w-5' icon='icon-[ic--baseline-tiktok]' />,
  },
  {
    id: 'line',
    name: 'Line',
    icon: <Icon className='h-5 w-5' icon='icon-[mage--line]' />,
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: <Icon className='h-5 w-5' icon='icon-[logos--discord]' />,
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: <Icon className='h-5 w-5' icon='icon-[mdi--github]' />,
  },
  { id: 'twitter', name: 'Twitter', icon: <Twitter className='h-5 w-5' /> },
  { id: 'youtube', name: 'YouTube', icon: <Youtube className='h-5 w-5' /> },
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin className='h-5 w-5' /> },
  { id: 'other', name: 'Other', icon: <LinkIcon className='h-5 w-5' /> },
];

// Interface สำหรับข้อมูล Social Media
export function SocialSection() {
  const { toast } = useToast();
  const { data, isLoading } = useGetSettingSocialQuery();
  const [onUpdateSocialMedia] = useUpdateSettingSocialMutation();

  // State เก็บรายการ social media
  const [socialMediaList, setSocialMediaList] = useState<SettingSocialMedia[]>(
    []
  );
  // State เก็บข้อมูลเดิมเพื่อเช็คการเปลี่ยนแปลง
  const [originalData, setOriginalData] = useState<SettingSocialMedia[]>([]);
  // State ตรวจสอบมีการเปลี่ยนแปลงหรือไม่
  const [isChanged, setIsChanged] = useState(false);

  // Form สำหรับเพิ่ม social media ใหม่
  const form = useForm({
    defaultValues: {
      type: '',
      url: '',
    },
  });

  // โหลดข้อมูลเมื่อ component ถูกโหลด
  useEffect(() => {
    if (data?.data) {
      setSocialMediaList(data.data);
      setOriginalData(JSON.parse(JSON.stringify(data.data)));
    }
  }, [data]);

  // ตรวจสอบการเปลี่ยนแปลง
  useEffect(() => {
    const isDataChanged =
      JSON.stringify(socialMediaList) !== JSON.stringify(originalData);
    setIsChanged(isDataChanged);
  }, [socialMediaList, originalData]);

  // เพิ่ม social media ใหม่
  const handleAddSocialMedia = (values: { type: string; url: string }) => {
    if (!values.type || !values.url) {
      toast({
        title: 'Error',
        description: 'Please fill in both type and URL fields',
        toastType: 'error',
      });
      return;
    }

    // ตรวจสอบว่า URL ถูกต้องหรือไม่
    try {
      new URL(values.url);
    } catch (e) {
      toast({
        title: 'Invalid URL',
        description: 'Please provide a valid URL including http:// or https://',
        toastType: 'error',
      });
      return;
    }

    const newSocialMedia: SettingSocialMedia = {
      id: Date.now().toString(),
      type: values.type,
      url: values.url,
    };

    setSocialMediaList([...socialMediaList, newSocialMedia]);
    form.reset({ type: '', url: '' });
  };

  // ลบ social media
  const handleRemoveSocialMedia = (id: string) => {
    setSocialMediaList(socialMediaList.filter((item) => item.id !== id));
  };

  // บันทึกการเปลี่ยนแปลง
  const handleSave = async () => {
    try {
      await onUpdateSocialMedia(socialMediaList).unwrap();
      setOriginalData(JSON.parse(JSON.stringify(socialMediaList)));
      toast({
        title: 'Success',
        description: 'Social media links updated successfully',
        toastType: 'success',
      });
    } catch (error) {
      console.error('Failed to update social media:', error);
      toast({
        title: 'Error',
        description: 'Failed to update social media links',
        toastType: 'error',
      });
    }
  };

  const getPlatformIcon = (type: string) => {
    const platform = socialPlatforms.find((p) => p.id === type);
    return platform?.icon || <LinkIcon className='h-5 w-5' />;
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Social Media</h1>
        <CustomButton
          variant='black'
          type='button'
          onClick={handleSave}
          disabled={!isChanged || isLoading}
        >
          Save Changes
        </CustomButton>
      </div>

      {/* Current Social Media Links */}
      <div className='mt-4'>
        {socialMediaList.length === 0 ? (
          <p className='text-gray-500'>No social media links added yet.</p>
        ) : (
          <div className='space-y-3'>
            {socialMediaList.map((social) => (
              <div
                key={social.id}
                className='flex items-center justify-between p-4 border rounded-md bg-gray-50 hover:bg-gray-100'
              >
                <div className='flex items-center gap-3'>
                  {getPlatformIcon(social.type)}
                  <div>
                    <p className='font-medium capitalize'>{social.type}</p>
                    <a
                      href={social.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-sm text-blue-500 hover:underline truncate max-w-md block'
                    >
                      {social.url}
                    </a>
                  </div>
                </div>
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  onClick={() => handleRemoveSocialMedia(social.id)}
                >
                  <Trash2 className='h-5 w-5 text-red-500' />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add New Social Media Form */}
      <div className='mt-6'>
        <h2 className='text-lg font-medium mb-4'>Add New Social Media</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddSocialMedia)}
            className='space-y-4'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a platform' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {socialPlatforms.map((platform) => (
                          <SelectItem key={platform.id} value={platform.id}>
                            <div className='flex items-center gap-2'>
                              {platform.icon}
                              <span>{platform.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='https://example.com/profile'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit' className='flex items-center gap-2'>
              <PlusCircle className='h-5 w-5' />
              Add Social Media
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
