import { create } from 'zustand';
import type { Car } from '@/shared/types';

interface AppState {
  // Модалка добавления машины
  isAddCarModalOpen: boolean;
  openAddCarModal: () => void;
  closeAddCarModal: () => void;

  // Модалка редактирования
  isEditCarModalOpen: boolean;
  editableCar: Car | null;
  openEditCarModal: (car: Car) => void;
  closeEditCarModal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Добавление
  isAddCarModalOpen: false,
  openAddCarModal: () => set({ isAddCarModalOpen: true }),
  closeAddCarModal: () => set({ isAddCarModalOpen: false }),

  // Редактирование
  isEditCarModalOpen: false,
  editableCar: null,
  openEditCarModal: (car) => set({ isEditCarModalOpen: true, editableCar: car }),
  closeEditCarModal: () => set({ isEditCarModalOpen: false, editableCar: null }),
}));
