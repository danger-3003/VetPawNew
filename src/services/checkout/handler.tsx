import { Address } from "@/components/types/ApiTypes";
import api from "../api/instance";
import { CHECKOUT_API } from "../api/urls";

export const fetchCartApi = async () => {
  const response = await api.get(CHECKOUT_API.FETCH_CART);
  return response;
};

export const applyCouponApi = async (couponcode: string) => {
  const response = await api.post(
    CHECKOUT_API.APPLY_COUPON, { couponcode: couponcode });
  return response;
};

export const placeOrderApi = async (
  paymentMethod: string,
  address: Address,
  couponcode?: string
) => {
  const response = await api.post(
    CHECKOUT_API.PLACE_ORDER, { paymentMethod, address, couponcode }
  );
  return response;
};
