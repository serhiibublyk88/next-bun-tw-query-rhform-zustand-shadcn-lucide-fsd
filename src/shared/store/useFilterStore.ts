import { create } from 'zustand';

interface FilterState {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  minPrice: 0,
  maxPrice: 10000000,
  setMinPrice: (value) => set({ minPrice: value }),
  setMaxPrice: (value) => set({ maxPrice: value }),
}));
