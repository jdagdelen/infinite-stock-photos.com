import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from './useAuth';

export default function useFeed(feedPageNo, myCPageNo) {
  const [imagesData, setImagesData] = useState([]);
  const [myCreationsData, setMyCreationsData] = useState([]);
  const [feedLoading, setFeedLoading] = useState(false);
  const [creationLoading, setCreationLoading] = useState(false);

  const { token } = useAuth();

  const getFeedData = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/recent`,
        params: { hits: 40, offset: (feedPageNo - 1) * 40 },
      });
      setFeedLoading(false);
      setImagesData((prevImagesData) => {
        return [...prevImagesData, ...data];
      });
    } catch (e) {
      setFeedLoading(false);
      return;
    }
  };

  const getMyCreations = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/generation_history`,
        params: { hits: 40, offset: (feedPageNo - 1) * 40 },
      });
      console.log(data);
      setMyCreationsData((prevImagesData) => {
        return [...prevImagesData, ...data];
      });
      setCreationLoading(false);
    } catch (e) {
      setCreationLoading(false);
      return;
    }
  };

  useEffect(() => {
    setFeedLoading(true);
    getFeedData();
  }, [feedPageNo]);

  useEffect(() => {
    if (token) {
      setCreationLoading(true);
      getMyCreations();
    }
  }, [myCPageNo, token]);

  return { imagesData, feedLoading, myCreationsData, creationLoading };
}
