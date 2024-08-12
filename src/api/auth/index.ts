import { signInAnonymously as firebaseSignInAnonymously } from 'firebase/auth';

import { auth } from '../firebase';

export const signInAnonymously = async () => {
  const { user } = await firebaseSignInAnonymously(auth);

  return { isAuthenticated: user?.isAnonymous, id: user?.uid };
};

export const signOut = async () => {
  await auth.signOut();

  return true;
};
