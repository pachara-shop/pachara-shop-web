import { useUploadRTEFileMutation } from '@/hooks/slices/rte/rteAPI';
import UploadImage from 'tiptap-extension-upload-image';

export const useUploadImage = () => {
  const [upload] = useUploadRTEFileMutation();
  const uploadFn = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await upload(formData).unwrap();
    if (!response.data) {
      throw new Error('Upload failed');
    }
    return response.data;
  };
  const CustomUploadImage = UploadImage.configure({
    uploadFn,
  });

  return CustomUploadImage;
};
