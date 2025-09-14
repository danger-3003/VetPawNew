// src/handlers/cartHandler.ts
import api from "../api/instance";
import { CART_API } from "../api/urls";

export interface CartItemUpdatePayload {
  productId: string;
  quantity: number;
}

export const fetchCartApi = async () => {
  const response = await api.get(CART_API.FETCH);
  return response;
};

export const increaseCartItemApi = async (payload: CartItemUpdatePayload) => {
  const response = await api.put(CART_API.INCREASE, payload);
  return response;
};

export const decreaseCartItemApi = async (payload: CartItemUpdatePayload) => {
  const response = await api.put(CART_API.DECREASE, payload);
  return response;
};

export const deleteCartItemApi = async (productId: string) => {
  const response = await api.delete(CART_API.DELETE, {
    data: { productId },
  });
  return response;
};

export const updateCartItemApi = async (payload: CartItemUpdatePayload) => {
  const response = await api.put(CART_API.UPDATE, payload);
  return response;
};
