import { create } from "zustand";

type AuthState = {
  jwt: string;
  loader: boolean;
  setLoader: (loader: boolean) => void;
  setJwt: (jwt: string) => void;
};

const useAuthStore = create<AuthState>((set) => ({
    jwt: '',
    loader: false,
    setLoader: (loader: boolean) => set({ loader }),
    setJwt: (jwt: string) => set({ jwt }),
}));

export default useAuthStore;
