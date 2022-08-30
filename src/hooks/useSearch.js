import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export default function useSearch(pageNo) {
  const [imagesData, setImagesData] = useState([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const prevPrompt = useRef();

  useEffect(() => {
    const prompt = searchParams.get('prompt');
    if (prompt) {
      if (prompt !== prevPrompt.current) setImagesData([]);
      prevPrompt.current = prompt;

      setIsLoading(true);
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/search`,
        params: { prompt },
      })
        .then((res) => {
          setIsLoading(false);
          setImagesData((prev) => {
            return [...prev, ...res.data.root.children];
          });
        })
        .catch((_) => {
          setIsLoading(false);
          return;
        });
    }
  }, [searchParams, pageNo]);

  return { imagesData, isLoading };
}
