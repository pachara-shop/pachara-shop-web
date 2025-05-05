import { Metadata } from 'next';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: {
    template: '%s | Pachara Shop Admin',
    default: 'Pachara Shop Admin',
  },
  description: 'Admin dashboard for Pachara Shop management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
