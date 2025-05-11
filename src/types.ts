export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  description: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}