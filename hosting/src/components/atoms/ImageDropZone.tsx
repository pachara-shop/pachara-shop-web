import * as React from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { Icon } from './Icon';
import { LightText, Title } from './Typography';
import { cn } from '@/lib/utils';

interface ImageDropzoneProps {
  className?: string;
  onChange?: (file: File | null) => void;
  /**
   * Image URL to display as preview in case of editing an existing image
   */
  imageUrl?: string;
  /**
   * Custom name to display in the dropzone in case of editing an existing image
   */
  customName?: string;
  /**
   * To set the value of the dropzone from the parent component
   * @param value
   * @returns
   */
  setValue: (value: File | undefined) => void;
  /**
   * To trigger the form validation from the parent component
   * @returns
   */
  formTrigger: () => void;
}

const ImageDropzone = React.forwardRef<HTMLInputElement, ImageDropzoneProps>(
  (
    {
      className,
      imageUrl,
      customName: initialCustomName,
      onChange,
      setValue,
      formTrigger,
    },
    ref
  ) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [preview, setPreview] = React.useState<string | null>(null);
    const [_fileName, setFileName] = React.useState<string | null>();

    React.useEffect(() => {
      setFileName(initialCustomName);
    }, [initialCustomName]);

    React.useEffect(() => {
      setPreview(imageUrl || '');
    }, [imageUrl]);

    React.useImperativeHandle(
      ref,
      () =>
        ({
          click: () => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          },
          focus: () => {
            if (fileInputRef.current) {
              fileInputRef.current.focus();
            }
          },
        } as HTMLInputElement)
    );

    const handleButtonClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        setPreview(URL.createObjectURL(file));
        setFileName(file.name);
        if (onChange) {
          if (onChange) {
            if (onChange) {
              onChange(file);
            }
          }
        }
      } else {
        setPreview(null);
        setFileName(null);
        if (onChange) {
          onChange(null);
        }
        if (setValue) {
          setValue(undefined);
        }
      }
    };

    const handleDrop = (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          setFileName(file.name);
          if (onChange) onChange(file);
          if (setValue) {
            setValue(file);
          }
          if (formTrigger) {
            formTrigger();
          }
        };
        reader.readAsDataURL(file);
      }
    };

    const { getRootProps, getInputProps } = useDropzone({
      onDrop: handleDrop,
      accept: {
        'image/jpeg': [],
        'image/png': [],
        'image/gif': [],
        'image/jpg': [],
      },
      multiple: false,
      maxSize: 5242880,
    });

    const _handleRemove = () => {
      setPreview(null);
      setFileName(undefined);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      if (onChange) {
        onChange(null);
      }
      if (setValue) {
        setValue(undefined);
      }
    };

    return (
      <div>
        <button
          {...getRootProps()}
          type='button'
          className={cn(
            `flex items-center justify-center flex-col border border-dashed rounded-md text-center h-[170px] w-[350px] hover:border-black hover:bg-gray-100 transition duration-300 ease-in-out`,
            className,
            !preview && 'p-4',
            preview && 'p-2'
          )}
          onClick={handleButtonClick}
        >
          <input
            {...getInputProps()}
            type='file'
            accept='image/jpeg, image/png, image/gif, image/jpg'
            className='hidden'
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {preview && (
            <Image
              src={preview}
              alt='Preview'
              className='max-w-[340px] max-h-[160px] object-contain'
              width={340}
              height={160}
            />
          )}
          {!preview && (
            <>
              <div className='bg-gray-100 rounded-[100%] w-8 h-8 flex items-center justify-center'>
                <Icon
                  icon='icon-[lucide--upload]'
                  className='text-gray-400 w-6 h-6 '
                />
              </div>
              <Title className='font-medium'>Upload image</Title>
              <LightText className='text-[#71717a]'>
                Drag & drop or click to select
              </LightText>
            </>
          )}
        </button>
        {/* {fileName && (
          <div className='flex items-center mt-3'>
            <Icon
              icon='icon-[mdi--remove] w-3 text-red mr-2 cursor-pointer'
              onClick={handleRemove}
            />
            <LightText className='text-[#71717a] '>{fileName}</LightText>
          </div>
        )} */}
      </div>
    );
  }
);

ImageDropzone.displayName = 'ImageDropzone';

export { ImageDropzone };
