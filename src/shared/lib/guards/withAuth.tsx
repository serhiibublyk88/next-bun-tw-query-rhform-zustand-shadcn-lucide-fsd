'use client';

import React, { useEffect, type ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/features/auth/model/useAuth';

export function withAuth<P extends object>(Component: ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const user = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/');
      }
    }, [user, router]);

    return user ? <Component {...props} /> : null;
  };
}
