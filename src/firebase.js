import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAvTiOpc3ktUzOeTm1WrsnzqwurPut7_y4',
    authDomain: 'victor-cloud-98a6e.firebaseapp.com',
    projectId: 'victor-cloud-98a6e',
    storageBucket: 'victor-cloud-98a6e.firebasestorage.app',
    messagingSenderId: '778250440908',
    appId: '1:778250440908:web:40007d31d6439dfeddf269',
    measurementId: 'G-J0Z2JNLPER',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, db, googleProvider, facebookProvider, storage };
