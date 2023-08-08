import { IProduct } from "@/types/interface";

export default function calculateTotalPrice(cartItems: IProduct[]): number {
  return cartItems.reduce((total: number, product: IProduct) => {
    const { discount } = product;
    if (discount?.discountPrice > 0) {
      return total + product.quantity * product?.discount?.discountPrice;
    }
    return total + product.quantity * product.price;
  }, 0);
}
