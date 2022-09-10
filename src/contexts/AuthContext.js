/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';

// third-party
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from '../config';
import authError from '../utils/auth-error';

export const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    photoURL: '',
    role: '',
  });
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uid, setUid] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setToken(user.accessToken);
        setIsLoggedIn(true);
        user.getIdTokenResult().then((idTokenResult) => {
          const role = idTokenResult.claims.stripeRole;
          setUser({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            role,
          });
        });
      } else {
        setUser({});
        setIsLoggedIn(false);
        await firebase.auth().signOut();
      }
    });
  }, []);

  const login = async (email, password, after) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      after();
    } catch (error) {
      setErrorMessage(authError(error.code));
      setIsLoading(false);
    }
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const register = (email, password) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const u = userCredential.user;
        setUid(u.uid);
        if (u && u.emailVerified === false) {
          sendEmailVerification(u)
            .then(() => {
              setShowSuccessModal(true);
            })
            .catch((error) => {
              setErrorMessage(authError(error.code));
              return;
            });
        }
      })
      .catch((error) => {
        setErrorMessage(authError(error.code));
        setIsLoading(false);
        return;
      })
      .catch((error) => {
        setErrorMessage(authError(error.code));
        setIsLoading(false);
        return;
      });
  };

  const logout = async () => {
    setIsLoading(true);
    await firebase.auth().signOut();
    setIsLoading(false);
  };

  const firebaseGoogleSignIn = async (page, after) => {
    setIsLoading(true);
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredentials = await firebase.auth().signInWithPopup(provider);
      if (page === 'register') setUid(userCredentials.user.uid);
      else {
        setIsLoading(false);
        after();
      }
    } catch (error) {
      setErrorMessage(authError(error.code));
      setIsLoading(false);
      return;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        register,
        logout,
        firebaseGoogleSignIn,
        errorMessage,
        token,
        showSuccessModal,
        setShowSuccessModal,
        isLoading,
        resetPassword,
        db,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
