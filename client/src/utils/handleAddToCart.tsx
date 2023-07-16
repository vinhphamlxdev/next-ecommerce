import { IProduct } from "@/types/interface";
import notification from "./notification";
import { toast } from "react-toastify";

function handleAddToCart(
  product: IProduct,
  quantity = 1,
  addToCart: (newProduct: IProduct) => void
) {
  addToCart({
    ...product,
    quantity: quantity,
  });
  toast.success("Thêm vào giỏ hàng thành công 😍");
}
export default handleAddToCart;
