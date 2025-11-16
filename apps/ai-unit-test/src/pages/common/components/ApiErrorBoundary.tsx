import ReplayIcon from '@mui/icons-material/Replay';
import { Button } from '@mui/material';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

const ApiErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  if (!isAxiosError(error)) {
    throw error;
  }

  return (
    <Button
      variant="contained"
      endIcon={<ReplayIcon />}
      onClick={resetErrorBoundary}
    >
      다시시도
    </Button>
  );
};

type ApiErrorBoundaryProps = {
  children: React.ReactNode;
};

const ApiErrorBoundary: React.FC<ApiErrorBoundaryProps> = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();
  const key = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={ApiErrorFallback}
      onReset={reset}
      resetKeys={[key]}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ApiErrorBoundary;


