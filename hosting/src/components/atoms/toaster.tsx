'use client';

import { useToast } from '@/hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/atoms/toast';
import { Icon } from './Icon';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(
        ({
          id,
          title,
          description,
          action,
          icon,
          toastType: type = 'default',
          ...props
        }) => (
          <Toast key={id} {...props} className='bg-[#E2E8F0]'>
            <div className='grid gap-1'>
              <div className='flex items-center'>
                {icon && icon}
                {!icon && type === 'success' && (
                  <Icon
                    className='!w-[16px] mr-1'
                    icon='icon-[uil--check-circle]'
                  />
                )}
                {!icon && type === 'error' && (
                  <Icon
                    className='!w-[16px] mr-1'
                    icon='icon-[uil--times-circle]'
                  />
                )}
                {!icon && (type === 'loading' || type === 'default') && (
                  <div className='!w-[16px] mr-1' />
                )}
                {title && (
                  <ToastTitle className='font-medium'>{title}</ToastTitle>
                )}
                {!title && (
                  <ToastTitle className='font-medium capitalize'>
                    {type}
                  </ToastTitle>
                )}
              </div>

              {description && (
                <ToastDescription className='font-normal text-black ml-[20px]'>
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      )}
      <ToastViewport />
    </ToastProvider>
  );
}
