import { projectFirestore, timestamp } from './config';

export const createDocument = async (collection, doc) => {
  const ref = projectFirestore.collection(collection);
  const docToAdd = {
    ...doc,
    createdAt: timestamp.fromDate(new Date()),
  };
  await ref.add(docToAdd);
};
