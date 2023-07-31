import { IProduct } from "@/types/interface";
import notification from "./notification";
import { toast } from "react-toastify";
import { useCartContext } from "@/context/useCartContext";

function handleAddToCart(
  product: IProduct,
  quantity: number,
  newSize: string,
  newColor: string,
  dispatch: any
) {
  const newProductObj = {
    ...product,
    sizes: product.sizes.filter((size) => size.name === newSize),
    colors: product.colors.filter((color) => color.colorName === newColor),
    quantity,
  };
  dispatch({ type: "ADD_TO_CART", payload: newProductObj });
  toast.success("Thêm vào giỏ hàng thành công 😍");
}
export default handleAddToCart;
