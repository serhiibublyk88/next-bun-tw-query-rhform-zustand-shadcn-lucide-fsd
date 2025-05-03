'use client';

import { Dialog, DialogContent } from '@/shared/ui';
import { LoginForm } from './LoginForm';
import { useAppStore } from '@/shared/store';

export const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal } = useAppStore();

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
      <DialogContent className="max-w-sm">
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};
