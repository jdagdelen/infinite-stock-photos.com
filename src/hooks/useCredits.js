/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useAuth from './useAuth';

export default function useCredits() {
    const { token, isLoggedIn, user, updateCredits, credits } = useAuth();

    const getCredits = () => {
        updateCredits();
        return credits
    };

    return { getCredits };
}
