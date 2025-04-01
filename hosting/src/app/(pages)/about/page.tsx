import React from 'react';
import AboutViewer from '../components/about/AboutViewer';

export default async function Page() {
  const response = await fetch(process.env.NEXT_PUBLIC_API_PATH + '/fe/about', {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }
  const { data } = await response.json();

  return (
    <div className='pt-24 pb-16 px-4 max-w-screen-md mx-auto'>
      {data && <AboutViewer content={data} />}
    </div>
  );
}
