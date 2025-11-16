import Cookies from 'js-cookie';
import { create } from 'zustand';

type User = {
  id: number;
  [key: string]: unknown;
};

type UserState = {
  isLogin: string | undefined;
  user: User | null;
  setIsLogin: (isLogin: string | undefined) => void;
  setUserData: (user: User | null) => void;
};

export const useUserStore = create<UserState>(set => ({
  isLogin: Cookies.get('access_token'),
  user: null,
  setIsLogin: isLogin => set(state => ({ ...state, isLogin })),
  setUserData: user => set(state => ({ ...state, user })),
}));


