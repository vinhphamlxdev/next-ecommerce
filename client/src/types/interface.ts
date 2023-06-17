export interface ICategory {
  id?: number;
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
  categorys: ICategory[];
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
