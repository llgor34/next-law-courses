import { useAdmin } from './useAdmin';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMemo } from 'react';

export const useAdminRedirect = () => {
  const { isAdmin } = useAdmin();
  const router = useRouter();

  let initialCheck = useMemo(() => {
    return true;
  }, []);

  useEffect(() => {
    if (isAdmin || initialCheck) {
      initialCheck = false;
      return;
    }

    router.push('/panel');
  }, [isAdmin]);
};
