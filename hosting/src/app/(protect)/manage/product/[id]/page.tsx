'use client';

import { useRouter } from 'next/navigation';

export default function Page() {
  const route = useRouter();
  return (
    <div>
      <p>edit Page</p>
      <button
        onClick={() => {
          route.push('/manage/product');
        }}
      >
        back
      </button>
    </div>
  );
}
