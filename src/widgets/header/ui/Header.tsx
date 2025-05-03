'use client';

import { Button } from '@/shared/ui';
import { useAuth, useUser } from '@/features/auth';
import { useAppStore } from '@/shared/store';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const user = useUser();
  const { logout } = useAuth();
  const { openAddCarModal } = useAppStore();
  const pathname = usePathname();

  const isAdmin = user?.role === 'ADMIN';
  const isMainPage = pathname === '/';

  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-white dark:bg-zinc-900">
      <h1 className="text-xl font-bold">Autokatalog</h1>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-muted-foreground">
              {user.name} ({user.role.toLowerCase()})
            </span>

            {isAdmin && isMainPage && (
              <Button onClick={openAddCarModal} variant="default">
                Hinzufügen
              </Button>
            )}

            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          </>
        ) : (
          <Button onClick={() => console.log('TODO: open login modal')}>Login</Button>
        )}
      </div>
    </header>
  );
};
