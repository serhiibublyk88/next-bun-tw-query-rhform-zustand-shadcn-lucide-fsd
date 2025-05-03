import { create } from 'zustand';

interface ConfirmDeleteState {
  isOpen: boolean;
  carId: string | null;
  open: (id: string) => void;
  close: () => void;
}

export const useConfirmDelete = create<ConfirmDeleteState>((set) => ({
  isOpen: false,
  carId: null,
  open: (id) => set({ isOpen: true, carId: id }),
  close: () => set({ isOpen: false, carId: null }),
}));
