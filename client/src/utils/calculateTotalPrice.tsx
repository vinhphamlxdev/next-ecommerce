import { IProduct } from "@/types/interface";

export default function calculateTotalPrice(cartItems: IProduct[]): number {
  return cartItems.reduce((total: number, product: IProduct) => {
    return total + product.quantity * product.price;
  }, 0);
}
