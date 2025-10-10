import { create } from 'zustand';

const useOrder = create((set) => ({
  orderDetail: {} as any,
  setOrderDetail: (order) => set((state) => ({ orderDetail: order })),
}));

export default useOrder;
