export interface ICategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}
export interface IProduct {
  id: number;
  name: string;
  shortDescription: string;
  price: number;
  quantity: number;
  status: boolean;
  slug: any;
  category: ICategory;
  colors: string[];
  sizes: string[];
  imageUrls: string[];
}
export interface IOrder {
  id: number;
  email: string;
  fullname: string;
  address: string;
  phonenumber: number;
}
export interface IPage {
  current: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
