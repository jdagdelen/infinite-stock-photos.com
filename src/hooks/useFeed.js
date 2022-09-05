import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useFeed(pageNo) {
  const [imagesData, setImagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/recent`,
      params: { hits: 40, offset: (pageNo-1)*40 },
    })
      .then((res) => {
        setIsLoading(false);
        setImagesData((prevImagesData) => {
          return [...prevImagesData, ...res.data];
        });
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  }, [pageNo]);
  return { imagesData, isLoading };
}
