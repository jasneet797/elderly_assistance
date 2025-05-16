// Replace with your own config from Firebase Console
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCBwYn1CqMiRenektes1rAbNhHRDF8qQXw",
    authDomain: "elderly-care-app-6daaa.firebaseapp.com",
    databaseURL: "https://elderly-care-app-6daaa-default-rtdb.firebaseio.com",
    projectId: "elderly-care-app-6daaa",
    storageBucket: "elderly-care-app-6daaa.firebasestorage.app",
    messagingSenderId: "815676209033",
    appId: "1:815676209033:web:633e422ac9b958c38c9358"
};

const app = initializeApp(firebaseConfig);
export const rtdb = getDatabase(app); 
