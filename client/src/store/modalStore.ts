import { create } from "zustand";
type Store = {
  isSticky: boolean;
  isLoading: boolean;
  isOpenEditP: boolean;
  isOpenDetailP: boolean;
};
type Actions = {
  setBgHeader: (payload: boolean) => void;
  setLoading: (payload: boolean) => void;
  setOpenEditProduct: (payload: boolean) => void;
  setOpenDetailProduct: (payload: boolean) => void;
};
export const useModalStore = create<Store & Actions>((set) => ({
  isSticky: false,
  isLoading: false,
  isOpenEditP: false,
  isOpenDetailP: false,

  setBgHeader: (payload) =>
    set((state) => ({
      isSticky: payload,
    })),
  setLoading: (payload) =>
    set((state) => ({
      isLoading: payload,
    })),
  setOpenEditProduct: (payload) =>
    set((state) => ({
      isOpenEditP: payload,
    })),
  setOpenDetailProduct: (payload) =>
    set((state) => ({
      isOpenDetailP: payload,
    })),
}));
