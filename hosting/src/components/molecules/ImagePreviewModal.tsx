import { Dialog, DialogContent, DialogOverlay } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { Icon } from '@/components/atoms/Icon';
import { DialogTitle } from '../atoms/dialog';

interface ImagePreviewModalProps {
  file: File;
  isOpen: boolean;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  file,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className='fixed inset-0 bg-black bg-opacity-50 z-50' />
      <DialogContent className='fixed inset-0 flex items-center justify-center p-4 z-99'>
        <div className='relative bg-white p-4 rounded-lg shadow-lg'>
          <DialogTitle>Preview</DialogTitle>
          <Icon
            icon='icon-[feather--x]'
            className='absolute top-2 right-2 h-4 w-4 cursor-pointer text-gray-500'
            onClick={onClose}
          />
          <Image
            src={URL.createObjectURL(file)}
            alt='preview'
            className='object-cover mt-4'
            width={500}
            height={500}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { ImagePreviewModal };
