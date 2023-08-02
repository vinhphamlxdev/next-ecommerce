export interface ICategory {
  id?: number;
  name: string;
  slug?: string;
  description: string;
}
export interface ICategoryResponse {
  categorys: ICategory[];
  page: IPage;
  status: string;
}
export interface IPage {
  current: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
export interface IProduct {
  id: number;
  name: string;
  shortDescription: string;
  price: number;
  quantity: number;
  delete: boolean;
  slug: any;
  category?: ICategory;
  colors: IColor[];
  sizes: ISize[];
  imageUrls: string[];
  discount: IDicount;
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
export interface IFilters {
  pageNum: number;
  itemsPerPage: number;
}
export interface IProductFilters {
  pageNum: number;
  itemsPerPage: number;
}
export interface IDicount {
  id: number;
  productName: string;
  originalPrice: number;
  discountPrice: number;
  discountPercent: string;
}
