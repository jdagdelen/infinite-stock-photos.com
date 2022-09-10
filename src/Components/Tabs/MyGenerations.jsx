import React, { useState, useRef, useEffect } from 'react';
import { Stack, CircularProgress, Typography } from '@mui/material';

import FeedGrid from '../UI/FeedGrid/FeedGrid';
import ScrollToTopButton from '../UI/ScrollToTopButton/ScrollToTopButton';
import useAuth from '../../hooks/useAuth';

const MyGenerations = ({ setMyCPageNo, imagesData, isLoading }) => {
  const { isLoggedIn } = useAuth();
  const [lastElement, setLastElement] = useState(null);
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setMyCPageNo((no) => no + 1);
      }
    })
  );
  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  useEffect(() => {
    document.title = 'My Creations';
  }, []);

  return (
    <>
      {imagesData.length > 0
        ? imagesData.map((data, i) => (
            <FeedGrid
              forwardedRef={imagesData.length === i + 1 ? setLastElement : null}
              key={i}
              generationDetails={data.generation_details}
              generationPrompt={data.generation_prompt}
              images={data.image_urls}
              timestamp={data.timestamp}
            />
          ))
        : !isLoggedIn
        ? !isLoading && (
            <Typography variant='h5' align='center' color='secondary'>
              Sign In to see your Generations
            </Typography>
          )
        : !isLoading && (
            <Typography variant='h5' align='center' color='secondary'>
              No Previous Generations Found
            </Typography>
          )}
      {isLoading && (
        <Stack
          direction='column'
          alignItems='center'
          sx={{ margin: '1em 0', overflow: 'hidden' }}
        >
          <CircularProgress />
        </Stack>
      )}
      <ScrollToTopButton />
    </>
  );
};

export default MyGenerations;
