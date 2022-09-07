import useAuth from './useAuth';
import { loadStripe } from '@stripe/stripe-js';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import {stripeConfig} from '../config';


export default function useStripe() {

    const { user, db } = useAuth();
    const { publishableKey, premiumPrice, creditsPrice } = stripeConfig;

    const subscribe = async () => {
        const docRef = await addDoc(
        collection(db, 'customers', user['id'], 'checkout_sessions'),
        {
            price: premiumPrice,
            allow_promotion_codes: true,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        }
        );
        onSnapshot(docRef, async (snap) => {
            const { sessionId } = snap.data();
            if (sessionId) {
                const stripePromise = loadStripe(publishableKey);
                const stripe = await stripePromise;
                console.log(stripe);
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    const purchase = async () => {
        const docRef = await addDoc(
        collection(db, 'customers', user['id'], 'checkout_sessions'),
        {
            price: creditsPrice,
            allow_promotion_codes: true,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
            mode: "payment",
        }
        );
        console.log(docRef)
        onSnapshot(docRef, async (snap) => {
            const { sessionId } = snap.data();
            if (sessionId) {
                const stripePromise = loadStripe(publishableKey);
                const stripe = await stripePromise;
                console.log(stripe);
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    return { subscribe, purchase };
}