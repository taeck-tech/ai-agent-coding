import { Box, Container } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import { pageRoutes } from '@/apiRoutes';
import NavigationBar from '@/pages/common/components/NavigationBar';
import { useUserStore } from '@/store/user';
import { pick } from '@/utils/common';

export const authStatusType = {
  NEED_LOGIN: 'NEED_LOGIN',
  NEED_NOT_LOGIN: 'NEED_NOT_LOGIN',
  COMMON: 'COMMON',
} as const;

type AuthStatus = typeof authStatusType[keyof typeof authStatusType];

type LayoutProps = {
  children: React.ReactNode;
  containerStyle?: Record<string, unknown>;
  authStatus?: AuthStatus;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  containerStyle,
  authStatus = authStatusType.COMMON,
}) => {
  const { isLogin } = useUserStore(
    state => pick(state, 'setIsLogin', 'isLogin'),
    shallow,
  ) as { isLogin: unknown };

  if (authStatus === authStatusType.NEED_LOGIN && !isLogin) {
    return <Navigate to={pageRoutes.login} />;
  }

  if (authStatus === authStatusType.NEED_NOT_LOGIN && isLogin) {
    return <Navigate to={pageRoutes.main} />;
  }

  return (
    <Box>
      <NavigationBar />
      <Box sx={{ pt: 7 }}>
        <Container maxWidth="md" sx={containerStyle}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;


