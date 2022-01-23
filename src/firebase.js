import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDoHeyAwht5X_aUCuRQ62nW6K_vSYF0wzE",
  authDomain: "spacecomet-85c55.firebaseapp.com",
  databaseURL: "https://spacecomet-85c55-default-rtdb.firebaseio.com",
  projectId: "spacecomet-85c55",
  storageBucket: "spacecomet-85c55.appspot.com",
  messagingSenderId: "385269554576",
  appId: "1:385269554576:web:bca7d4ce807e149b81a715",
  measurementId: "G-L5WR52X4DW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);