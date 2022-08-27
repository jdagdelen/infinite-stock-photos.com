import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useSearch(query, pageNo) {
  const [imagesData, setImagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/search`,
        params: { prompt: query },
      })
        .then((res) => {
          setIsLoading(false);
          setImagesData((prev) => {
            return [...prev, ...res.data.root.children];
          });
        })
        .catch((e) => {
          setIsLoading(false);
          return;
        });
    }
  }, [query, pageNo]);

  return { imagesData, isLoading };
}
