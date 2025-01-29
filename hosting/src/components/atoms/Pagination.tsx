import * as React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { ButtonProps, buttonVariants } from './Button';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
  isDisabled?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

const PaginationLink = ({
  className,
  isActive,
  isDisabled,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <a
    role='button'
    tabIndex={0}
    aria-label='paginationLink'
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      className
    )}
    {...props}
    onClick={
      !isDisabled && props.onClick ? props.onClick : (e) => e.preventDefault()
    }
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (!isDisabled && props.onClick) {
          props.onClick(
            e as unknown as React.MouseEvent<HTMLAnchorElement, MouseEvent>
          );
        } else {
          e.preventDefault();
        }
      }
    }}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to previous page'
    size='default'
    className={cn('gap-1 px-3', className)}
    {...props}
  >
    <ChevronLeftIcon
      className={`${props?.isDisabled ? 'text-[#94A3B8]' : ''} h-4 w-4`}
    />
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationFirst = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to first page'
    size='default'
    className={cn('gap-1 px-2', className)}
    {...props}
  >
    <ChevronLeftIcon
      className={`${props?.isDisabled ? 'text-[#94A3B8]' : ''} h-4 w-4 -mr-3`}
    />
    <ChevronLeftIcon
      className={`${props?.isDisabled ? 'text-[#94A3B8]' : ''} h-4 w-4`}
    />
  </PaginationLink>
);
PaginationFirst.displayName = 'PaginationFirst';

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to next page'
    size='default'
    className={cn('gap-1 px-3', className)}
    {...props}
  >
    <ChevronRightIcon
      className={`${props?.isDisabled ? 'text-[#94A3B8]' : ''} h-4 w-4`}
    />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationLast = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to last page'
    size='default'
    className={cn('gap-1 px-2', className)}
    {...props}
  >
    <ChevronRightIcon
      className={`${props?.isDisabled ? 'text-[#94A3B8]' : ''} h-4 w-4 -mr-3`}
    />
    <ChevronRightIcon
      className={`${props?.isDisabled ? 'text-[#94A3B8]' : ''} h-4 w-4`}
    />
  </PaginationLink>
);
PaginationLast.displayName = 'PaginationLast';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <DotsHorizontalIcon className='h-4 w-4' />
    <span className='sr-only'>More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationFirst,
  PaginationPrevious,
  PaginationNext,
  PaginationLast,
  PaginationEllipsis,
};
