import React from 'react';
import { NavBarClient } from '../NavBarClient';
import { SettingSocialMedia } from '@/shared/models/Settings';

export default async function NavBar({
  socialIcons,
}: {
  socialIcons: SettingSocialMedia[];
}) {
  return <NavBarClient initialIcons={socialIcons} />;
}
