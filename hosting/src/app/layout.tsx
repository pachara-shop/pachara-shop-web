import '@/app/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <>root layout</>
        {children}
      </body>
    </html>
  );
}
