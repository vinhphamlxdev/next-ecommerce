import { IUser } from "@/types/authInterface";
import { IProduct } from "@/types/interface";
import React from "react";
import { toast } from "react-toastify";

type State = {
  cartItems: IProduct[] | [];
};

type Action = {
  type: string;
  payload: any;
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  cartItems:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems") || "[]")
      : [],
};

type CartContextProviderProps = { children: React.ReactNode };

const StateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      if (action.payload) {
        const newProduct: IProduct = action.payload;
        const newCartItems = [...state.cartItems];
        const index = state.cartItems.findIndex(
          (product) =>
            product.id === newProduct.id &&
            product.sizes[0].name === newProduct.sizes[0].name &&
            product.colors[0].colorName === newProduct.colors[0].colorName
        );
        if (index != -1) {
          newCartItems[index].quantity += newProduct.quantity;
        } else {
          newCartItems.push(newProduct);
        }
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        return {
          ...state,
          cartItems: newCartItems,
        };
      }
      return state;
    }
    case "SET_QUANTITY": {
      if (action.payload) {
        const { type, product } = action.payload;
        const newCartItems = [...state.cartItems];
        const index = newCartItems.findIndex(
          (item) => JSON.stringify(item) === JSON.stringify(product)
        );
        if (type === "+") {
          if (index != -1) {
            newCartItems[index].quantity += 1;
          }
        } else if (type === "-") {
          if (newCartItems[index].quantity > 1) {
            newCartItems[index].quantity -= 1;
          }
        }
        return {
          ...state,
          cartItems: newCartItems,
        };
      }
      return state;
    }
    case "DELETE_CART": {
      if (action.payload) {
        const productNeedDelete: IProduct = action.payload;
        const newCartItems = [...state.cartItems];
        const updateCarts = newCartItems.filter(
          (product) =>
            JSON.stringify(product) !== JSON.stringify(productNeedDelete)
        );
        toast.success("Xóa sản phẩm thành công");
        localStorage.setItem("cartItems", JSON.stringify(updateCarts));
        return {
          ...state,
          cartItems: updateCarts,
        };
      }
      return state;
    }
    case "DELETEALL_CART": {
      if (action.payload) {
        const updateCarts = action.payload;
        localStorage.setItem("cartItems", JSON.stringify(updateCarts));
        return {
          ...state,
          cartItems: updateCarts,
        };
      }
      return state;
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);

  const value = { state, dispatch };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

const useCartContext = () => {
  const context = React.useContext(StateContext);

  if (context) {
    return context;
  }

  throw new Error(`useCartContext must be used within a CartContextProvider`);
};

export { CartContextProvider, useCartContext };
