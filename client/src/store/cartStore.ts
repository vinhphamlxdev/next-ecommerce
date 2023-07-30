import { IProduct } from "@/types/interface";
import { toast } from "react-toastify";
import create from "zustand";

type Store = {
  cartItems: IProduct[];
  addToCart: (newProduct: IProduct) => void;
  deleteFromCart: (productNeedDelete: IProduct) => void;
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
        const existItemIndex = state.cartItems.find(
          (item) =>
            item.id === newProduct.id &&
            item.sizes[0].name === newProduct.sizes[0].name &&
            item.colors[0].colorName === newProduct.colors[0].colorName
        );
        if (existItemIndex) {
          const updatedCartItems = state.cartItems.map((item) =>
            item.id === newProduct.id &&
            item.sizes[0].name === newProduct.sizes[0].name &&
            item.colors[0].colorName === newProduct.colors[0].colorName
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          );
          return { cartItems: updatedCartItems };
        } else {
          return {
            cartItems: [...state.cartItems, newProduct],
          };
        }
      });
    },
    setQuantityCart: (payload: any) => {
      set((state) => {
        const { type, product } = payload;
        const existItemIndex = state.cartItems.findIndex(
          (item) =>
            item.id === product.id &&
            item.sizes[0].name === product.sizes[0].name &&
            item.colors[0].colorName === product.colors[0].colorName
        );
        if (type === "+") {
          if (existItemIndex != -1) {
            console.log(existItemIndex);

            state.cartItems[existItemIndex].quantity += 1;
          }
        } else if (type === "-") {
          if (state.cartItems[existItemIndex].quantity > 1) {
            state.cartItems[existItemIndex].quantity -= 1;
          }
        }
        return { ...state };
      });
    },

    deleteFromCart: (productNeedDelete: IProduct) => {
      set((state) => {
        const updatedCartItems = state.cartItems.filter(
          (product) =>
            JSON.stringify(product) === JSON.stringify(productNeedDelete)
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
