import { create } from 'zustand';

const useCheckout = create((set) => ({
  products: [] as any,
  billingDetail: {} as any,
  saveCheckoutProducts: (products) => set((state) => ({ products })),
  setBillingDetail: (detail) => set((state) => ({ billingDetail: detail })),
}));

export default useCheckout;
