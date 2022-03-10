import { useAuth } from './useAuth';
import { useEffect, useState } from 'react';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, userDoc } = useAuth();

  useEffect(() => {
    if (!user || !userDoc) return;

    if (userDoc.admin) {
      setIsAdmin(true);
    }
  }, [user, userDoc]);

  return { isAdmin };
};
