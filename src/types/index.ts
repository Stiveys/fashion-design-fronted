export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type Category = 'all' | 'men' | 'women' | 'accessories';