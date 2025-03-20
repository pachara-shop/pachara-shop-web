import NavBar from '../components/layouts/NavBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      <div className='mt-[56px]'>{children}</div>
    </div>
  );
}
