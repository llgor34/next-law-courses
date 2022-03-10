import { projectFirestore, Timestamp } from './config';
import { useState, useEffect } from 'react';

export const useDoc = (collection) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const ref = projectFirestore.collection(collection);

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  const createDoc = async (doc, id) => {
    setIsPending(true);
    setError(null);
    let createdDoc = null;

    try {
      if (id) {
        createdDoc = await ref.doc(id).set({
          ...doc,
          createdAt: Timestamp.fromDate(new Date()),
        });
      } else {
        createdDoc = await ref.add({
          ...doc,
          createdAt: Timestamp.fromDate(new Date()),
        });
      }
      if (!isCancelled) {
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }

    return createdDoc;
  };

  const getDoc = async (id) => {
    setIsPending(true);
    setError(null);

    try {
      const doc = await ref.doc(id).get();
      if (!isCancelled) {
        setIsPending(false);
      }
      return doc;
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  const updateDoc = async (id, data) => {
    setIsPending(true);
    setError(null);

    try {
      await ref.doc(id).update(data);
      if (!isCancelled) {
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  const delDoc = async (id) => {
    setIsPending(true);
    setError(null);
    try {
      ref.doc(id).delete();
      if (!isCancelled) {
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  return { isPending, error, createDoc, getDoc, updateDoc, delDoc };
};
