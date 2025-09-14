export interface RoleBasedPricing {
  doctor: number;
  retailer: number;
  stockist: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  slug: string;
  quantity: number;
  regularPrice: number;
  salePrice: number;
  images: string[];
  status: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  __v: number;
  batch?: string;
  exp?: string; // ISO string
  mfg?: string; // ISO string
  gstPercentage?: number;
  hsnCode?: string;
  roleBasedPricing?: RoleBasedPricing;
}

export interface OrderProduct {
  product: Product;
  name: string;
  price: number;
  quantity: number;
  _id: string;
}

export interface OrderAddress {
  _id: string;
  name: string;
  email: string;
  phone: string;
  doorNo: string;
  address: string;
  city: string;
}

export interface Order {
  _id: string;
  user: string;
  products: OrderProduct[];
  gstAmount: number;
  totalAmount: number;
  grandAmount: number;
  status: "pending" | "shipped" | "delivered" | "cancelled" | string;
  paymentMethod: "cod" | "online" | string;
  discount: number;
  couponCode: string | null;
  totalQuantity: number;
  address: OrderAddress;
  createdAt: string;
  updatedAt: string;
  orderId: string;
  __v: number;
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

// Product core details (from products collection)
export interface ProductCore {
  _id: string;
  title: string;
  description: string;
  slug: string;
  quantity: number;
  regularPrice: number;
  salePrice: number;
  images: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  batch: string;
  exp: string;
  gstPercentage: number;
  hsnCode: string;
  mfg: string;
  roleBasedPricing: {
    doctor: number;
    retailer: number;
    stockist: number;
  };
}

// Product entry inside order
export interface CartOrderProduct {
  product: ProductCore;
  name: string;
  hsnCode: string;
  price: number;
  quantity: number;
  gstPercentage: number;
  _id: string;
}

// GST summary for invoice
export interface GstSummary {
  hsnCode: string;
  totalTaxableValue: number;
  gstPercentage: number;
  gstAmount: number;
  totalAmount: number;
  _id: string;
}

// Main Order
export interface CartOrder {
  _id: string;
  user: string;
  products: CartOrderProduct[];
  totalAmount: number;
  totalGstAmount: number;
  grandAmount: number;
  gstSummary: GstSummary[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
