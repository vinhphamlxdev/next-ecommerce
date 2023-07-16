import { create } from "zustand";
type Store = {
  isSticky: boolean;
  isLoading: boolean;
  scrollHeader: boolean;
};
type Actions = {
  setBgHeader: (payload: boolean) => void;
  setLoading: (payload: boolean) => void;
  setScrollHeader: (payload: boolean) => void;
};
export const useGlobalStore = create<Store & Actions>((set) => ({
  isSticky: false,
  isLoading: false,
  isOpenEditP: false,
  scrollHeader: false,

  setBgHeader: (payload) =>
    set((state) => ({
      isSticky: payload,
    })),
  setScrollHeader: (payload) =>
    set((state) => ({
      scrollHeader: payload,
    })),
  setLoading: (payload) =>
    set((state) => ({
      isLoading: payload,
    })),
}));
