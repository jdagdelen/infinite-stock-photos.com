import React, { useState, useRef, useEffect } from 'react';
import { Stack, CircularProgress } from '@mui/material';

import FeedGrid from '../UI/FeedGrid/FeedGrid';
import ScrollToTopButton from '../UI/ScrollToTopButton/ScrollToTopButton';

const FeedTab = ({ setPageNo, imagesData, isLoading }) => {
  const [lastElement, setLastElement] = useState(null);
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNo((no) => no + 1);
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
    document.title = 'Feed';
  }, []);

  return (
    <>
      {imagesData.map((data, i) => (
        <FeedGrid
          forwardedRef={imagesData.length === i + 1 ? setLastElement : null}
          key={i}
          generationDetails={data.generation_details}
          generationPrompt={data.generation_prompt}
          images={data.image_urls}
          timestamp={data.timestamp}
        />
      ))}
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

export default FeedTab;
