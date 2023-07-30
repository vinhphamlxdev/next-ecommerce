import { IProduct } from "@/types/interface";
import notification from "./notification";
import { toast } from "react-toastify";

function handleAddToCart(
  product: IProduct,
  quantity: number,
  newSize: string,
  newColor: string,
  addToCart: (newProduct: IProduct) => void
) {
  addToCart({
    ...product,
    sizes: product.sizes.filter((size) => size.name === newSize),
    colors: product.colors.filter((color) => color.colorName === newColor),
    quantity,
  });
  toast.success("Thêm vào giỏ hàng thành công 😍");
}
export default handleAddToCart;
