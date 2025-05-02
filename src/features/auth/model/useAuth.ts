import { authApi } from '@/shared/api/authApi';
import { User } from '@/shared/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const user = await authApi.login({ email, password });
          set({ user });
        } catch (error) {
          set({ error: 'Login fehlgeschlagen. Bitte überprüfen Sie Ihre Daten.' });
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
    }),
    { name: 'auth-store' },
  ),
);

export const useUser = () => useAuth((state) => state.user);
