export interface ICategory {
  id: number;
  name: string;
  description: string;
  enable?: boolean;
  slug?: string;
}
export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  instock?: boolean;
  imageUrls: string[];
}
