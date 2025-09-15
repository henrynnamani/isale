import { create } from 'zustand';

const useProduct = create((set) => ({
  product: {} as any,
  saveProductDetail: (product) => set((state) => ({ product: product })),
}));

export default useProduct;