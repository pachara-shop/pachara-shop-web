import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
        <h1 className='text-6xl font-bold text-red-500'>404</h1>
        <h2 className='text-2xl font-semibold mt-4'>Page Not Found</h2>
        <p className='text-gray-600 mt-2'>
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          href='/'
          className='mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300'
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
