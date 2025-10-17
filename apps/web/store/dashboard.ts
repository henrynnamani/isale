import { create } from 'zustand';

const useDashboard = create((set) => ({
  currentPage: 'Dashboard',
  setCurrentPage: (page: string) => set(() => ({ currentPage: page })),
}));

export default useDashboard;
