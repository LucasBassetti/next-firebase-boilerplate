import { initializeApp } from 'firebase/app';
import { Auth, browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { Database, getDatabase } from 'firebase/database';
import { CollectionReference, Firestore, collection, getFirestore } from 'firebase/firestore';

let db: Database;
let auth: Auth;
let firestore: Firestore;
let collections: {
  [key: string]: CollectionReference;
};

if (typeof window !== 'undefined') {
  const firebaseConfig = {
    apiKey: process.env['NEXT_PUBLIC_API_KEY'],
    authDomain: process.env['NEXT_PUBLIC_AUTH_DOMAIN'],
    projectId: process.env['NEXT_PUBLIC_PROJECT_ID'],
    storageBucket: process.env['NEXT_PUBLIC_STORAGE_BUCKET'],
    messagingSenderId: process.env['NEXT_PUBLIC_MESSAGING_SENDER_ID'],
    appId: process.env['NEXT_PUBLIC_APP_ID'],
  };

  const firebaseApp = initializeApp(firebaseConfig);

  auth = getAuth(firebaseApp);
  db = getDatabase(firebaseApp);

  firestore = getFirestore(firebaseApp);

  setPersistence(auth, browserLocalPersistence);

  // Main Collections
  collections = {
    data: collection(firestore, 'data'),
  } as const;
}

export { auth, collections, db, firestore };
