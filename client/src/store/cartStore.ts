import { IProduct } from "@/types/interface";
import { toast } from "react-toastify";
import create from "zustand";

type Store = {
  cartItems: IProduct[];
  addToCart: (newProduct: IProduct) => void;
  deleteFromCart: (id: number) => void;
  setQuantityCart: any;
  deleteAllCart: any;
};

export const useCartStore = create<Store>((set) => {
  // const initialCartItems: any = localStorage.getItem("cart_items")
  //   ? JSON.parse(localStorage.getItem("cart_items")!)
  //   : [];
  const initialCartItems: any = [];
  return {
    cartItems: initialCartItems,
    addToCart: (newProduct) => {
      set((state) => {
        const updatedCartItems = state.cartItems.some(
          (product: any) => product.id === newProduct.id
        )
          ? state.cartItems.map((product: any) =>
              product.id === newProduct.id
                ? {
                    ...product,
                    quantity: product.quantity + newProduct.quantity,
                  }
                : product
            )
          : [...state.cartItems, newProduct];
        // localStorage.setItem("cart_items", JSON.stringify(updatedCartItems));
        return { cartItems: updatedCartItems };
      });
    },
    setQuantityCart: (newProduct: any) => {
      set((state) => {
        let { id, type } = newProduct;
        let index = state.cartItems.findIndex((item: any) => item.id === id);
        if (index !== -1) {
          if (type === "+") {
            state.cartItems[index].quantity += 1;
          } else if (type === "-") {
            if (state.cartItems[index].quantity > 1) {
              state.cartItems[index].quantity -= 1;
            } else {
              return state; // Trả về trạng thái hiện tại khi quantity là 1
            }
          }
        }
        return { ...state };
      });
    },
    deleteFromCart: (productId: number) => {
      set((state) => {
        const updatedCartItems = state.cartItems.filter(
          (product) => product.id !== productId
        );
        toast.success("Xóa sản phẩm thành công");
        // localStorage.setItem("cart_items", JSON.stringify(updatedCartItems));

        return { cartItems: updatedCartItems };
      });
    },
    deleteAllCart: () => {
      set((state) => {
        let updatedCartItems: any = [];
        // localStorage.setItem("cart_items", JSON.stringify(updatedCartItems));
        return { cartItems: updatedCartItems };
      });
    },
  };
});
