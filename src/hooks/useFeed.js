import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useFeed(query, pageNo) {
  const [imagesData, setImagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/search`,
      params: { prompt: query },
    })
      .then((res) => {
        setIsLoading(false);
        setImagesData((prevImagesData) => {
          return [
            ...prevImagesData,
            [...res.data.root.children.slice(0, 4)],
            [...res.data.root.children.slice(4, 8)],
            [...res.data.root.children.slice(8, 12)],
            [...res.data.root.children.slice(12, 16)],
          ];
        });
      })
      .catch((e) => {
        return;
      });
  }, [query, pageNo]);
  return { imagesData, isLoading };
}
