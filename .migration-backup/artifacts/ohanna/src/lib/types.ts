export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  badge: string;
  image_url: string;
  stock: number;
  slug?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface Order {
  id: string;
  stripe_session_id?: string;
  customer_email: string;
  customer_name: string;
  shipping_address: ShippingAddress;
  items: CartItem[];
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered";
  created_at: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  governorate: string;
  postalCode: string;
}
