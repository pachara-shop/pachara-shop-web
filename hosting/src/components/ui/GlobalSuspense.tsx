import React, { Suspense } from 'react';
import Loading from '../atoms/Loading';

const GlobalSuspense: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Suspense fallback={<Loading />}>{children}</Suspense>;

export default GlobalSuspense;
