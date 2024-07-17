export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  description: string;
  price: number;
  isFeatured: boolean;
  size: Size;
  color: Color;
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export type OrderStatus =
  | "Created"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Canceled";

interface OrderItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  status: OrderStatus;
  totalAmount: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  orderItems: OrderItem[];
}
