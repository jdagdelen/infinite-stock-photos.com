import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from './useAuth';

export default function useCredits() {
  const [creditsRemaining, setCreditsRemaining] = useState(0);
  const { token } = useAuth();

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/credits`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setCreditsRemaining(res.data);
      })
      .catch((e) => {});
  });
  return { creditsRemaining };
}
