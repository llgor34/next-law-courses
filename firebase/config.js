import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = require('pastePathToYourFile');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// firestore
export const projectFirestore = admin.firestore();

// timestamp
export const timestamp = admin.firestore.Timestamp;
