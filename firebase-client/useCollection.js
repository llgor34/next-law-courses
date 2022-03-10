import { projectFirestore } from './config';
import { useState, useEffect } from 'react';

export const useCollection = (collection, query, order) => {
  const [documents, setDocuments] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  let ref = projectFirestore.collection(collection);

  if (query) {
    ref = ref.where(...query);
  }

  if (order) {
    ref = ref.orderBy(...order);
  }

  useEffect(() => {
    setError(null);
    setIsPending(true);

    const makeReq = async () => {
      try {
        const snapshots = await ref.get();
        const data = snapshots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt
            ? doc.data().createdAt.toDate()
            : null,
        }));
        if (!isCancelled) {
          setIsPending(false);
        }
        return data;
      } catch (error) {
        if (!isCancelled) {
          setError(error.message);
          setIsPending(false);
        }
      }
    };

    makeReq().then((res) => setDocuments(res));

    return () => setIsCancelled(true);
  }, []);

  return { isPending, error, documents };
};
