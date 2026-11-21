import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { isAdminEmail } from '../config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return unsub;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  /* Student sign-up: create the account, set the display name,
     then save a profile in `students/{uid}` (best effort). */
  const signup = async ({ name, email, phone, password }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    try {
      await setDoc(doc(db, 'students', cred.user.uid), {
        name,
        email,
        phone: phone ? `+91${phone}` : '',
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      // Account still works if Firestore rules block this write — see firestore.rules.example
      console.warn('Could not save student profile:', err.code || err.message);
    }
    return cred;
  };

  const isAdmin = !!user && isAdminEmail(user.email);

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, signup, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
