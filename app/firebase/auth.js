import { activeUserState } from "@/lib/ui";
import { hookstate } from "@hookstate/core";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import FireBase from "./firebase";
const auth = getAuth(FireBase);

const signup = async (fullName, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      user.displayName = fullName;
      return userCredential;
    }
  );
};

const logout = () =>
  signOut(auth).then((value) => {
    console.log(value);
  });

// sing ig user with email and password
export const signIn = async (email, password) => {
  if (!email || !password) {
    throw "Email and password arg missing";
  }

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    return res;
  } catch (err) {
    throw err;
  }
};

export const firebaseAuth = hookstate({
  auth: { signup: signup, logout: logout, signIn },
});

const user = auth.currentUser;

if (user !== null) {
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;
  activeUserState.set({
    user: { displayName, email, photoURL, emailVerified, uid: user.uid },
  });
}
