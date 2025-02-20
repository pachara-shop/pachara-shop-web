import { Banner2 } from '../components/layouts/Banner2';
import NavBar from '../components/layouts/NavBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      <Banner2 />
      <div>{children}</div>
    </div>
  );
}
