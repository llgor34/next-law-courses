import { projectFirestore } from './config';

const getCollection = async (collection, query, order) => {
  try {
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    if (order) {
      ref = ref.orderBy(...order);
    }

    const snapshots = await ref.get();
    const data = snapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : null,
    }));

    if (!data) {
      return 'NO DATA WAS RETURNED!';
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getCollection };
