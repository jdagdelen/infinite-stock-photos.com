import axios from 'axios';
import { useState } from 'react';

export default function useSearch() {
  const [imagesData, setImagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = (query) => {
    setIsLoading(true);
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/search`,
      params: { prompt: query },
    })
      .then((res) => {
        setIsLoading(false);
        setImagesData(res.data.root.children);
      })
      .catch((e) => {
        setIsLoading(false);
        return;
      });
  };

  return { imagesData, isLoading, search };
}
