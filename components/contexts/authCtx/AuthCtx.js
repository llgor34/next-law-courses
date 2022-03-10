import { createContext, useEffect, useState } from 'react';
import { projectAuth } from '../../../firebase-client/config';
import { useDoc } from '../../../firebase-client/useDoc';
import { useRouter } from 'next/router';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const router = useRouter();
  const { getDoc } = useDoc('users');

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((curUser) => {
      if (curUser) {
        setUser(curUser);
        getDoc(curUser.uid).then((doc) => setUserDoc(doc.data()));
      }
      unsub();
    });
  }, []);

  const logout = () => {
    projectAuth.signOut();
    setUser(null);
    setUserDoc(null);
    router.push('/');
  };

  const login = async (user) => {
    const doc = await getDoc(user.uid);

    setUser(user);
    setUserDoc(doc.data());
  };

  return (
    <AuthContext.Provider value={{ user, userDoc, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
