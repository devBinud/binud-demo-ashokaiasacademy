import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCb4MmhwlDau36hH0_Q4QBGKKfjQI3NDDE",
  authDomain: "ashokaias.firebaseapp.com",
  projectId: "ashokaias",
  storageBucket: "ashokaias.firebasestorage.app",
  messagingSenderId: "136472279058",
  appId: "1:136472279058:web:f700ec66c2cd05977d80cb"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
