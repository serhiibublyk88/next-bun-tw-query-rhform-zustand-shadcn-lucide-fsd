'use client';

import { User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useAuth, useUser } from '@/features/auth';
import { useAppStore } from '@/shared/store';
import { Button } from '@/shared/ui';

export const Header = () => {
  const user = useUser();
  const { logout } = useAuth();
  const { openLoginModal } = useAppStore();

  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-white dark:bg-zinc-900">
      <Link href="/" className="focus-visible:outline-none text-xl font-bold">
        Autokatalog
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UserIcon className="w-4 h-4" aria-hidden="true" />
              <span>{user.name}</span>
            </div>

            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <Button onClick={openLoginModal}>Login</Button>
        )}
      </div>
    </header>
  );
};
