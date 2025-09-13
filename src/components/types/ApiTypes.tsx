export interface RoleBasedPricing {
  doctor: number;
  retailer: number;
  stockist: number;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  slug: string;
  quantity: number;
  regularPrice: number;
  salePrice: number;
  roleBasedPricing: RoleBasedPricing;
  images: string[];
  status: "active" | "inactive";
  hsnCode: string;
  exp: string;
  mfg: string;
  batch: string;
  gstPercentage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}


export type LoginPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  role: "doctor" | "stockist" | "retailer";
  proofOfRole: string;
  gstNo?: string;
};

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ForgotPasswordPayload {
  email: string;
}