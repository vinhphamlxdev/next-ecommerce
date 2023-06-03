import { create } from "zustand";
type Store = {
  isSticky: boolean;
  isLoading: boolean;
};
type Actions = {
  setBgHeader: (payload: boolean) => void;
  setLoading: (payload: boolean) => void;
};
export const useGlobalStore = create<Store & Actions>((set) => ({
  isSticky: false,
  isLoading: false,
  setBgHeader: (payload) =>
    set((state) => ({
      isSticky: payload,
    })),
  setLoading: (payload) =>
    set((state) => ({
      isLoading: payload,
    })),
}));
