import { authApi } from '@/shared/api/authApi';
import { User } from '@/shared/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  devtools((set) => ({
    user: null,
    isLoading: false,

    login: async (email, password) => {
      set({ isLoading: true });
      try {
        const user = await authApi.login({ email, password });
        set({ user });
      } catch (error) {
        console.error('Login failed', error);
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    logout: async () => {
      try {
        await authApi.logout();
      } finally {
        set({ user: null });
      }
    },
  })),
);

export const useUser = () => useAuth((state) => state.user);
