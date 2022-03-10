import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

let initialCheck = true;

export const useRedirect = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !initialCheck) {
      router.replace('/zaloguj');
      return;
    }
    initialCheck = false;
  }, [user]);
};
