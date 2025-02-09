import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDU9C3qhe0oDmBaXgOrgdJh1KYhKFXUpwk",
  authDomain: "fir-tuto-88228.firebaseapp.com",
  projectId: "fir-tuto-88228",
  storageBucket: "fir-tuto-88228.firebasestorage.app",
  messagingSenderId: "719226226986",
  appId: "1:719226226986:web:ddaa9825aa4504cf807653"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
