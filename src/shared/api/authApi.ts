import { User } from '@/shared/types';
import { apiClient } from './client';

interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  login: async ({ email, password }: LoginPayload): Promise<User> => {
    const res = await apiClient.get<User[]>('/users', {
      params: { email, password },
    });

    if (!res.data.length) {
      throw new Error('Ungültige Zugangsdaten');
    }

    return res.data[0];
  },

  logout: async (): Promise<void> => {
    return;
  },
};
