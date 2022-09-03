//------ Path ------ //
//------  /   ------ //
//------------------ //

import { useRef, useState, useEffect } from 'react';
import { CircularProgress, Stack } from '@mui/material';

import FeedGrid from '../Components/UI/FeedGrid/FeedGrid';
import useFeed from '../hooks/useFeed';

const Feed = () => {
  const [pageNo, setPageNo] = useState(1);
  const { isLoading, imagesData } = useFeed(pageNo);
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
    </>
  );
};

export default Feed;
