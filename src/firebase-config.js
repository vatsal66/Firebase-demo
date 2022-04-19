import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyAh0Gnkkup1ljR-mvGWRk9hegQkNU43OGA",
    authDomain: "first-cloud-messaging-ab9ff.firebaseapp.com",
    projectId: "first-cloud-messaging-ab9ff",
    storageBucket: "first-cloud-messaging-ab9ff.appspot.com",
    messagingSenderId: "28475836786",
    appId: "1:28475836786:web:54ddf732694628aae7f5eb"
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);