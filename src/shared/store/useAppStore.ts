import { create } from 'zustand';

interface AppState {
  isAddCarModalOpen: boolean;
  openAddCarModal: () => void;
  closeAddCarModal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isAddCarModalOpen: false,
  openAddCarModal: () => set({ isAddCarModalOpen: true }),
  closeAddCarModal: () => set({ isAddCarModalOpen: false }),
}));
