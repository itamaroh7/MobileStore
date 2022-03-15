import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { useEffect,useState } from 'react';

const firebaseConfig = {
    apiKey:"AIzaSyARoifpteeDyjCwS5GMTe6DXQN3NQJ9hAU",
    authDomain:"reactfinal-cce92.firebaseapp.com",
    projectId: "reactfinal-cce92",
    storageBucket: "reactfinal-cce92.appspot.com",
    messagingSenderId: "391930271280",
    appId: "1:391930271280:web:64e036c77de48bc1f4bff5"
  };

  firebase.initializeApp(firebaseConfig)

  export const auth=firebase.auth()
  export default firebase

  export function singup(email,password)
{
    return auth.createUserWithEmailAndPassword(email,password)
}

export function useAuth()
{
    const [currentUser,setCurrentUser] = useState()
    useEffect(()=>
    {
        const unsub=auth.onAuthStateChanged(user=>setCurrentUser(user))
        return unsub
    },[])

    return currentUser
}

export function logout()
{
    return auth.signOut()
}

export function singin(email,password)
{
    return auth.signInWithEmailAndPassword(email,password)
}