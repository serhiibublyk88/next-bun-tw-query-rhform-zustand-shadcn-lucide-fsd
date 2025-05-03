import { create } from 'zustand';
import { carApi } from '@/shared/api';
import { queryClient } from '@/shared/lib/queryClient';

interface ConfirmDeleteState {
  isOpen: boolean;
  isLoading: boolean;
  carId: string | null;
  open: (id: string) => void;
  close: () => void;
  confirmDelete: (id: string) => Promise<void>;
}

export const useConfirmDelete = create<ConfirmDeleteState>((set) => ({
  isOpen: false,
  isLoading: false,
  carId: null,

  open: (id) => set({ isOpen: true, carId: id }),

  close: () => set({ isOpen: false, carId: null }),

  confirmDelete: async (id) => {
    set({ isLoading: true });
    try {
      await carApi.delete(id);
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    } finally {
      set({ isLoading: false, isOpen: false, carId: null });
    }
  },
}));
