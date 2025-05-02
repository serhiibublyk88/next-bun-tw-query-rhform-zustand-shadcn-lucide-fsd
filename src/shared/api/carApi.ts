import { apiClient } from './client';
import { Car } from '@/shared/types';

export const carApi = {
  getAll: async (): Promise<Car[]> => {
    const res = await apiClient.get('/cars');
    return res.data;
  },
  getById: async (id: string): Promise<Car> => {
    const res = await apiClient.get(`/cars/${id}`);
    return res.data;
  },
  create: async (car: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Promise<Car> => {
    const res = await apiClient.post('/cars', car);
    return res.data;
  },
  update: async (id: string, car: Partial<Car>): Promise<Car> => {
    const res = await apiClient.put(`/cars/${id}`, car);
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/cars/${id}`);
  },
};
