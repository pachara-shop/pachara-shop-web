// import NavBar from '@/app/components/layouts/NavBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      admin layout
      {children}
    </div>
  );
}
