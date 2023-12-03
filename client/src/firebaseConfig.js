import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZ8VRlPB9zL3T_Dy8i4xaxOSLy_nabuds",
  authDomain: "cs641-final.firebaseapp.com",
  projectId: "cs641-final",
  storageBucket: "cs641-final.appspot.com",
  messagingSenderId: "407768859630",
  appId: "1:407768859630:web:c78ef164990e059e0504ff",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;