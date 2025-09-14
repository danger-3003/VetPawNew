export const AUTH_API = {
  LOGIN: "/users/login",
  SIGNUP: "/users",
  FORGOT_PASSWORD: "/users/forgot-password",
  RESET_PASSWORD: "/users/reset-password",
};

export const PRODUCTS_API = {
  FETCH_ALL_PRODUCTS: "/products/all",
};

export const CART_API = {
  ADD_TO_CART: "/cart",
  GET_CART_COUNT: "/cart/count",
  FETCH: "/cart",
  INCREASE: "/cart/increase",
  DECREASE: "/cart/decrease",
  DELETE: "/cart",
  UPDATE: "/cart/update",
};

export const USER_API = {
  MY_BOOKINGS: "/bookings",
}

export const CHECKOUT_API = {
  FETCH_CART: "/cart",
  APPLY_COUPON: "/cart/coupon",
  PLACE_ORDER: "/cart/buynow",
};