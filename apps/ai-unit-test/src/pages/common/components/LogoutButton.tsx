import { Button } from '@mui/material';
import React from 'react';

type LogoutButtonProps = {
  data?: { name?: string } | null;
  onClick: () => void;
};

const LogoutButton: React.FC<LogoutButtonProps> = ({ data, onClick }) => {
  return (
    <Button
      variant="text"
      size="large"
      style={{ color: '#fff' }}
      onClick={onClick}
    >
      {data?.name}
    </Button>
  );
};

export default LogoutButton;


