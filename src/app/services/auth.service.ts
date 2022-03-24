import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import {
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //obtain the firebase auth object
  auth = getAuth();
  googleProvider: any;
  user: any;
  credential: any;
  token: any;

  constructor(private firestore: Firestore) {}

  //email&password signUp method
  async signUp(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        //create a collection named users
        const userRef = collection(this.firestore, 'users'); //add to db
        //create a document and give its unique id the user's uid
        return setDoc(doc(userRef, res.user.uid), { email: res.user.email });
      })
      .catch((err) => {
        const errMsg = err.errMsg;
        console.log('an error has occurred: ', errMsg);
      });
  }

  //email&password signIn method
  async signIn(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        this.user = res.user.email;
      })
      .catch((err) => {
        const errorMsg = err.errorMsg;
        console.log('an error has occurred logging in: ', err);
      });
  }

  async googleSignInWithPopUp() {
    this.googleProvider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, this.googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  //signOut method
  async signOut() {
    if (getAuth().currentUser === null) {
      console.log('You are already signed out. ->', this.auth);
    } else {
      await signOut(this.auth);
    }
  }
}
