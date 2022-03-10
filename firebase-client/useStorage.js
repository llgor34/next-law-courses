import { projectStorage } from './config';
import { useState, useEffect } from 'react';

export const useStorage = (path) => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  const uploadFile = async (file, extension) => {
    setIsPending(true);
    setError(null);
    try {
      const createdFile = await projectStorage
        .child(`${path}/${Math.floor(Math.random() * 100000000)}.${extension}`)
        .put(file);
      const photoUrl = await createdFile.ref.getDownloadURL();
      if (!isCancelled) {
        setIsPending(false);
      }
      return photoUrl;
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  return { uploadFile, error, isPending };
};
