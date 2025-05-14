// src/shared/api/carApi.ts

import { apiClient } from './client';
import type { Car } from '@/shared/types/car';

// Тип для create / update payload (без id и timestamps)
export type CarPayload = Omit<Car, 'id' | 'createdAt' | 'updatedAt'>;

export const carApi = {
  getAll: async (): Promise<Car[]> => {
    const res = await apiClient.get('/cars');
    return res.data;
  },

  getById: async (id: string): Promise<Car> => {
    const res = await apiClient.get(`/cars/${id}`);
    return res.data;
  },

  create: async (car: CarPayload): Promise<Car> => {
    const res = await apiClient.post('/cars', car);
    return res.data;
  },

  update: async (id: string, car: Partial<CarPayload>): Promise<Car> => {
    const res = await apiClient.put(`/cars/${id}`, car);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/cars/${id}`);
  },
};
