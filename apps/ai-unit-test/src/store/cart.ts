import { create } from 'zustand';

import { getItem, setItem } from '@/helpers/localStorage';
import { parseJSON } from '@/utils/common';
import { Product } from '@/pages/home/components/ProductCard';

const CART_LOCAL_STORAGE_KEY = 'CART_LOCAL_STORAGE_KEY';

type CartItem = Product & { count: number };
type CartMap = Record<number, CartItem>;

const getCartFromLocalStorage = (userId: number): CartMap => {
  const cartItem = parseJSON<Record<number, CartMap> | null>(getItem(CART_LOCAL_STORAGE_KEY));

  return (cartItem?.[userId] ?? {}) as CartMap;
};

export const resetCartAtLocalStorage = (userId: number) => {
  const cartItem = parseJSON<Record<number, CartMap> | null>(getItem(CART_LOCAL_STORAGE_KEY));

  setItem(CART_LOCAL_STORAGE_KEY, {
    ...(cartItem ?? {}),
    [userId]: undefined,
  });
};

export const setCartToLocalStorage = (cart: CartMap, userId: number) => {
  const cartItem = parseJSON<Record<number, CartMap> | null>(getItem(CART_LOCAL_STORAGE_KEY));

  if (!cartItem) {
    setItem(CART_LOCAL_STORAGE_KEY, { [userId]: cart });

    return;
  }

  setItem(CART_LOCAL_STORAGE_KEY, { ...cartItem, [userId]: cart });
};

const calculateTotal = (cart: CartMap) =>
  Object.values(cart).reduce(
    (acc, item) => ({
      totalCount: acc.totalCount + item.count,
      totalPrice: acc.totalPrice + item.price * item.count,
    }),
    { totalCount: 0, totalPrice: 0 },
  );

type CartState = {
  cart: CartMap;
  totalCount: number;
  totalPrice: number;
  initCart: (userId?: number | null) => void;
  resetCart: (userId: number) => void;
  addCartItem: (item: Product, userId: number, count: number) => void;
  removeCartItem: (itemId: number, userId: number) => void;
  changeCartItemCount: (args: { itemId: number; count: number; userId: number }) => void;
};

export const useCartStore = create<CartState>(set => ({
  cart: {},
  totalCount: 0,
  totalPrice: 0,
  initCart: userId =>
    set(state => {
      if (!userId) {
        return state;
      }

      const prevCartItem = getCartFromLocalStorage(userId);
      const total = calculateTotal(prevCartItem);

      return {
        ...total,
        cart: prevCartItem,
      };
    }),
  resetCart: userId =>
    set(() => {
      resetCartAtLocalStorage(userId);

      return {
        totalCount: 0,
        totalPrice: 0,
        cart: {},
      };
    }),
  addCartItem: (item, userId, count) =>
    set(state => {
      const cart = {
        ...state.cart,
        [item.id]: {
          ...item,
          count: (state.cart[item.id]?.count ?? 0) + count,
        },
      };
      const total = calculateTotal(cart);

      setCartToLocalStorage(cart, userId);

      return { ...total, cart };
    }),
  removeCartItem: (itemId, userId) =>
    set(state => {
      const cart = { ...state.cart };
      delete cart[itemId];
      const total = calculateTotal(cart);

      setCartToLocalStorage(cart, userId);

      return { ...total, cart };
    }),
  changeCartItemCount: ({ itemId, count, userId }) =>
    set(state => {
      const cart = {
        ...state.cart,
        [itemId]: {
          ...state.cart[itemId],
          count,
        },
      };
      const total = calculateTotal(cart);

      setCartToLocalStorage(cart, userId);

      return { ...total, cart };
    }),
}));


