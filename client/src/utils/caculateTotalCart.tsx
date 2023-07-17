import { IProduct } from "@/types/interface";

export default function calculateTotalCart(cartItems: IProduct[]): number {
  return cartItems.reduce((amount: number, product: IProduct) => {
    return amount + product.quantity;
  }, 0);
}
