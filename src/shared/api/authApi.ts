import { apiClient } from './client';
import { User } from '@/shared/types';

interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  login: async (data: LoginPayload): Promise<User> => {
    const res = await apiClient.post('/auth/login', data);
    return res.data;
  },
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};
