import { projectAuth, projectFirestore } from './config';
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { login } = useAuth();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error('Could not create a new user!');
      }

      await res.user.updateProfile({
        displayName,
      });

      // create a user document
      await projectFirestore.collection('users').doc(res.user.uid).set({
        displayName,
        admin: false,
        ownedCourses: [],
      });

      // login
      login(res.user);

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
