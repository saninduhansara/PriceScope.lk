export type Supermarket = 'cargills' | 'keells' | 'glomark';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  helpful?: number;
}

export interface ProductPrice {
  supermarket: Supermarket;
  price: number;
  available: boolean;
  discount?: number;
  rating?: number; // Rating out of 5 stars
  reviews?: Review[]; // Reviews for this product at this supermarket
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  unit: string;
  prices: ProductPrice[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSupermarket: Supermarket;
}