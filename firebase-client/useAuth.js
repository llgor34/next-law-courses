import { useContext } from 'react';
import { AuthContext } from '../components/contexts/authCtx/AuthCtx';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth called outside AuthContext!');
  }

  return { ...context };
};
