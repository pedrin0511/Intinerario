import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// ou getDatabase para Realtime Database

const firebaseConfig = {
  apiKey: "BNfdLUwDOp67dPPLWRMUrSW_Ngz4uN5IWfLBpngM9SiQjNj70eCu-RhuF319V8-n3dBqANJ2nqj6hsg8OmzW39E",
  authDomain: "itinerario-87769.firebaseapp.com",
  projectId: "itinerario-87769",
  storageBucket: "itinerario-87769.appspot.com",
  messagingSenderId: "61975699166",
  appId: "SEU_APP_ID"
};

// Garante que não inicialize mais de uma vez
const app = initializeApp(firebaseConfig);

const db = getFirestore(app); // ou getDatabase(app) para o realtime

export { db };