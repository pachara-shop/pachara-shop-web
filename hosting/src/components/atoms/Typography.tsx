import { cn } from '@/lib/utils';

const Title = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('text-[14px]', className)} {...props} />
);
Title.displayname = 'Title';

const LightText = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('text-[12px]', className)} {...props} />
);

export { Title, LightText };
