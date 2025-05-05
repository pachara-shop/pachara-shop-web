import { cn } from '@/lib/utils';

// หัวข้อใหญ่ - สำหรับหัวข้อหลักของหน้า
const H1 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn(
      'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
      className
    )}
    {...props}
  />
);

// หัวข้อรอง - สำหรับส่วนสำคัญในหน้า
const H2 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn('text-xl sm:text-2xl md:text-3xl font-bold', className)}
    {...props}
  />
);

// หัวข้อย่อย - สำหรับส่วนย่อยในแต่ละส่วน
const H3 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn('text-lg sm:text-xl md:text-2xl font-semibold', className)}
    {...props}
  />
);

// Title - สำหรับหัวข้อย่อยเล็กๆ
const Title = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      'text-base sm:text-[16px] md:text-[18px] font-medium',
      className
    )}
    {...props}
  />
);

// Text - สำหรับเนื้อหาหลัก
const Text = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn('text-[13px] sm:text-[14px] md:text-[16px]', className)}
    {...props}
  />
);

// LightText - สำหรับข้อความรายละเอียดหรือคำอธิบายเสริม
const LightText = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      'text-[11px] sm:text-[12px] md:text-[14px] text-gray-500',
      className
    )}
    {...props}
  />
);

// Caption - สำหรับคำบรรยายภาพหรือหมายเหตุ
const Caption = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      'text-[10px] sm:text-[11px] md:text-[12px] text-gray-400 italic',
      className
    )}
    {...props}
  />
);

export { H1, H2, H3, Title, Text, LightText, Caption };
