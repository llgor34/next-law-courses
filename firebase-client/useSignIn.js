import { projectAuth } from './config';
import { useState, useEffect } from 'react';
import { useAuth } from '../firebase-client/useAuth';

export const useSignIn = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { login } = useAuth();

  const signIn = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      // login
      await login(res.user);

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      console.log(error);
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signIn };
};
