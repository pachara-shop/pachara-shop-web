import { Metadata } from 'next';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: {
    template: '%s | Pachara Boutique Admin',
    default: 'Pachara Boutique Admin',
  },
  description: 'Admin dashboard for Pachara Boutique management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
