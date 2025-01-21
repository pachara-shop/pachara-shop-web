// import NavBar from '@/app/components/layouts/NavBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      web layout
      {children}
    </div>
  );
}
