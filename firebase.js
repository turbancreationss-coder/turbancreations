import { initializeApp }

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {

  getFirestore

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


import {

  getAuth

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



const firebaseConfig = {

  apiKey:
  "AIzaSyAhB1dHC1cZEhDEWElqh3VKv0SjrziUwWc",

  authDomain:
  "turrbancreations.firebaseapp.com",

  projectId:
  "turrbancreations",

  storageBucket:
  "turrbancreations.firebasestorage.app",

  messagingSenderId:
  "161027179043",

  appId:
  "1:161027179043:web:974b0c91f5eeec4d7da796"

};


const app =
initializeApp(firebaseConfig);


const db =
getFirestore(app);


const auth =
getAuth(app);


export {

  db,
  auth

};
