'use client';

import React, { useEffect, type ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/features/auth/model/useAuth';
import type { Role } from '@/shared/types';

export function withRole<P extends object>(Component: ComponentType<P>, allowedRoles: Role[]) {
  return function RoleProtected(props: P) {
    const user = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!user || !allowedRoles.includes(user.role)) {
        router.push('/');
      }
    }, [user, router]);

    return user && allowedRoles.includes(user.role) ? <Component {...props} /> : null;
  };
}
