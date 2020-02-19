import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCFptYPNkTTUAXkztKKHdf10isl3iZyYhw",
    authDomain: "ecom-75f43.firebaseapp.com",
    databaseURL: "https://ecom-75f43.firebaseio.com",
    projectId: "ecom-75f43",
    storageBucket: "ecom-75f43.appspot.com",
    messagingSenderId: "1089414037827",
    appId: "1:1089414037827:web:ac0bfb3d1ef41d1c3b2ff6",
    measurementId: "G-FGDEB52DN8"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }   catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;