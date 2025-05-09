'use client';

import { Dialog, DialogContent, DialogTitle } from '@/shared/ui';
import { LoginForm } from './LoginForm';
import { useAppStore } from '@/shared/store';

export const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal } = useAppStore();

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
      <DialogContent className="max-w-sm text-center">
        <DialogTitle className="text-2xl font-semibold mb-6">Login</DialogTitle>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};
