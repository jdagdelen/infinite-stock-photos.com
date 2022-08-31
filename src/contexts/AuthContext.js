/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
// third-party
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
} from 'firebase/firestore';

import {
  firebaseConfig,
  STRIPE_PREMIUM_PRICE,
  STRIPE_PUBLISHABLE_KEY,
} from '../config';
import authError from '../utils/auth-error';

export const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [uid, setUid] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setToken(user.accessToken);
        setIsLoggedIn(true);
      } else {
        setUser({});
        setIsLoggedIn(false);
        await firebase.auth().signOut();
      }
    });
  }, []);

  useEffect(() => {
    if (uid) subscribe();
  }, [uid]);

  const subscribe = async () => {
    const docRef = await addDoc(
      collection(db, 'customers', uid, 'checkout_sessions'),
      {
        price: STRIPE_PREMIUM_PRICE,
        allow_promotion_codes: true,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    onSnapshot(docRef, async (snap) => {
      const { sessionId } = snap.data();
      if (sessionId) {
        const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
        const stripe = await stripePromise;
        stripe.redirectToCheckout({ sessionId });
        setIsLoading(false);
      }
    });
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(authError(error.code));
      setIsLoading(false);
      return;
    }
  };

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

  const firebaseGoogleSignIn = async (page) => {
    setIsLoading(true);
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredentials = await firebase.auth().signInWithPopup(provider);
      if (page === 'register') setUid(userCredentials.user.uid);
      else setIsLoading(false);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
