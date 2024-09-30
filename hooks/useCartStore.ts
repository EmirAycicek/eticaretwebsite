import { getToCart } from '@/actions/cart/getToCart';
import { create } from 'zustand';

// Cart öğeleri için bir tip tanımlıyoruz
interface CartItem {
  id: string;
  amount: number;
  // Diğer özellikleri ekleyebilirsiniz
}

// Store'un tipi
interface CartStore {
  items: CartItem[];
  fetchItem: (userId: string, jwt: string) => Promise<void>;
}

const useCartStore = create<CartStore>((set) => ({
  items: [], // Başlangıç durumu
  fetchItem: async (userId: string, jwt: string) => {
    const data = await getToCart(userId, jwt);
    set({ items: data }); // Veriyi items'a set ediyoruz
  },
}));

export default useCartStore;
