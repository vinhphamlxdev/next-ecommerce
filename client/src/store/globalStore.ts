import { create } from "zustand";
type Store = {
  isSticky: boolean;
  isLoading: boolean;
  scrollHeader: boolean;
  showPassword: boolean;
};
type Actions = {
  setBgHeader: (payload: boolean) => void;
  setLoading: (payload: boolean) => void;
  setScrollHeader: (payload: boolean) => void;
  setShowPassword: () => void;
};
export const useGlobalStore = create<Store & Actions>((set) => ({
  isSticky: false,
  isLoading: false,
  isOpenEditP: false,
  scrollHeader: false,
  showPassword: false,

  setBgHeader: (payload) =>
    set(() => ({
      isSticky: payload,
    })),
  setScrollHeader: (payload) =>
    set(() => ({
      scrollHeader: payload,
    })),
  setLoading: (payload) =>
    set(() => ({
      isLoading: payload,
    })),
  setShowPassword: () =>
    set((state) => ({
      showPassword: !state.showPassword,
    })),
}));
