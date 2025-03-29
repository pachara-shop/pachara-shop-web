'use client';

import { setHeader } from '@/hooks/slices/layoutSlice';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export interface HeaderWrapper {
  title?: string;
  subTitle?: string;
  children: ReactNode;
}

export const HeaderWrapper: React.FC<HeaderWrapper> = ({
  title,
  children,
  subTitle,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeader({ title, subTitle }));
  }, [title, subTitle, dispatch]);

  return children;
};
