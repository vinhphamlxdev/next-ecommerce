import { IProduct } from "@/types/interface";
import { create } from "zustand";
type Store = {
  isSticky: boolean;
  isLoading: boolean;
  isOpenEditP: boolean;
  isOpenDetailP: boolean;
  showModalQuickView: boolean;
  seletedProduct: IProduct | null;
};
type Actions = {
  setBgHeader: (payload: boolean) => void;
  setLoading: (payload: boolean) => void;
  setOpenEditProduct: (payload: boolean) => void;
  setOpenDetailProduct: (payload: boolean) => void;
  setShowModalQuickView: (payload: IProduct) => void;
  setCloseModalQuickView: () => void;
};
export const useModalStore = create<Store & Actions>((set) => ({
  isSticky: false,
  isLoading: false,
  isOpenEditP: false,
  isOpenDetailP: false,
  showModalQuickView: false,
  seletedProduct: null,

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
  setShowModalQuickView: (payload) =>
    set((state) => ({
      showModalQuickView: true,
      seletedProduct: payload,
    })),
  setCloseModalQuickView: () =>
    set(() => ({
      showModalQuickView: false,
      seletedProduct: null,
    })),
}));
