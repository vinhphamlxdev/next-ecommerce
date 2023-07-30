import deleteFromCookie from "@/token/deleteFromCookie";
import { IUser } from "@/types/authInterface";
import React from "react";

type State = {
  authUser: IUser | null;
};

type Action = {
  type: string;
  payload: IUser | null;
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  authUser:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
};

type StateContextProviderProps = { children: React.ReactNode };

const StateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SIGN_UP": {
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
      return {
        ...state,
        authUser: action.payload,
      };
    }
    case "LOG_IN": {
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
      return {
        ...state,
        authUser: action.payload,
      };
    }
    case "LOG_OUT": {
      localStorage.removeItem("user");
      deleteFromCookie("access_token");
      return {
        ...state,
        authUser: action.payload,
      };
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);

  const value = { state, dispatch };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

const useStateContext = () => {
  const context = React.useContext(StateContext);

  if (context) {
    return context;
  }

  throw new Error(`useStateContext must be used within a StateContextProvider`);
};

export { StateContextProvider, useStateContext };
