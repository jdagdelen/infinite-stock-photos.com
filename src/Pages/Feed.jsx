import { useRef, useState, useEffect } from 'react';
import { CircularProgress, Stack } from '@mui/material';

import FeedGrid from '../Components/UI/FeedGrid';
import useFeed from '../hooks/useFeed';

const Feed = () => {
  const [pageNo, setPageNo] = useState(1);
  const { isLoading, imagesData } = useFeed('test', pageNo);
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

  return (
    <>
      {imagesData.map((images, i) => {
        if (imagesData.length === i + 1)
          return (
            <FeedGrid forwardedRef={setLastElement} key={i} images={images} />
          );
        else return <FeedGrid key={i} images={images} />;
      })}
      {isLoading && (
        <Stack direction='column' alignItems='center' sx={{ marginTop: '1em' }}>
          <CircularProgress />
        </Stack>
      )}
    </>
  );
};

export default Feed;
