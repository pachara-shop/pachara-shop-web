import React from 'react';
import { NavBarClient } from '../NavBarClient';

export async function getSocialIcons() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_PATH + '/be/settings/social-media',
    {
      cache: 'no-store', // ใช้ SSR ไม่มีการ cache,
      method: 'GET',
    }
  );
  if (!res.ok) return [];
  const { data } = await res.json();
  return data || [];
}

export default async function NavBar() {
  const socialIcons = await getSocialIcons();

  return <NavBarClient initialIcons={socialIcons} />;
}
