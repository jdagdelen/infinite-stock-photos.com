/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { createContext, useState, useEffect, useRef } from 'react';
import useAuth from '../hooks/useAuth';

const FeedContext = createContext(null);

export const FeedProvider = ({ children }) => {
  const { token } = useAuth();
  const [imagesData, setImagesData] = useState([]);
  const [myCreationsData, setMyCreationsData] = useState([]);
  const [feedLoading, setFeedLoading] = useState(false);
  const [creationLoading, setCreationLoading] = useState(false);
  const [feedPageNo, setFeedPageNo] = useState(1);
  const [myCPageNo, setMyCPageNo] = useState(1);

  const [lastFeedElement, setLastFeedElement] = useState(null);

  const [lastGenerationElement, setLastGenerationElement] = useState(null);
  const generationObserver = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setMyCPageNo((no) => no + 1);
      }
    })
  );
  useEffect(() => {
    const currentElement = lastGenerationElement;
    const currentObserver = generationObserver.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastGenerationElement]);

  const feedObserver = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setFeedPageNo((no) => no + 1);
      }
    })
  );
  useEffect(() => {
    const currentElement = lastFeedElement;
    const currentObserver = feedObserver.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastFeedElement]);

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
        params: { hits: 40, offset: (myCPageNo - 1) * 40 },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setMyCreationsData((prevImagesData) => {
        return [...prevImagesData, ...data];
      });
      setCreationLoading(false);
    } catch (e) {
      setCreationLoading(false);
      return;
    }
  };

  const getLatestFeedData = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/recent`,
        params: { hits: 40, offset: (feedPageNo - 1) * 40 },
      });
      setFeedLoading(false);
      setImagesData(data);
    } catch (e) {
      setFeedLoading(false);
      return;
    }
  };

  const getLatestCreations = async () => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/generation_history`,
        params: { hits: 40, offset: (myCPageNo - 1) * 40 },
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setMyCreationsData(data);
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

  return (
    <FeedContext.Provider
      value={{
        imagesData,
        myCreationsData,
        feedLoading,
        creationLoading,
        setLastFeedElement,
        setLastGenerationElement,
        getLatestCreations,
        getLatestFeedData,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export default FeedContext;
