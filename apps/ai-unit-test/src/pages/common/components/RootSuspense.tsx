import React, { Suspense } from 'react';

import LoadingPage from '@/pages/loading/components/LoadingPage';

type RootSuspenseProps = {
  children: React.ReactNode;
};

const RootSuspense: React.FC<RootSuspenseProps> = ({ children }) => {
  return <Suspense fallback={<LoadingPage />}>{children}</Suspense>;
};

export default RootSuspense;


