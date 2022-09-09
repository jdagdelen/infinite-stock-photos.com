import axios from 'axios';

import useAuth from './useAuth';

export default function useLike() {
  const { token } = useAuth();

  const likeImage = (image_id) =>
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/like`,
      params: { image_id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const favoriteImage = (image_id) =>
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/favorite`,
      params: { image_id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  return { likeImage, favoriteImage };
}
