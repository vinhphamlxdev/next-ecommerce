export interface ICategory {
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
  category?: ICategory;
  colors: IColor[];
  sizes: ISize[];
  imageUrls: string[];
}
export interface ISize {
  id: number;
  name: string;
  delete: boolean;
}

export interface IColor {
  id: number;
  colorName: string;
  delete: boolean;
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

export interface IOrder {
  id: number;
  totalAmount: number;
  fullName: string;
  email: string;
  address: string;
  phoneNumber: number;
  status: string;
  products: any[];
  createdAt: string;
  totalPrice: number;
}
