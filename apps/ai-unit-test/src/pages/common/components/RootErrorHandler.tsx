import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorPage from '@/pages/error/components/ErrorPage';

type RootErrorBoundaryProps = {
  children: React.ReactNode;
};

const RootErrorBoundary: React.FC<RootErrorBoundaryProps> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
  );
};

export default RootErrorBoundary;


