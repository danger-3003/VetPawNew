import { AddToCartPayload } from "@/components/types/ApiTypes";
import api from "../api/instance";
import { CART_API, PRODUCTS_API } from "../api/urls";

export const handleGetAllProducts = async () => {
  const response = await api.get(PRODUCTS_API?.FETCH_ALL_PRODUCTS);
  return response;
}

export const handleAddToCart = async (payload: AddToCartPayload) => {
  const response = await api.post(CART_API.ADD_TO_CART, payload);
  return response;
};

export const handleGetCartCountApi = async () => {
  const response = await api.get(CART_API.GET_CART_COUNT);
  return response;
};