'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // usa esto en App Router
import { isAuthenticated } from '@/auth/auth.utils';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
};
