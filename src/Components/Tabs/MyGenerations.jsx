import React, { useEffect } from 'react';
import { Typography } from '@mui/material';

import FeedGrid from '../UI/FeedGrid/FeedGrid';
import ScrollToTopButton from '../UI/ScrollToTopButton/ScrollToTopButton';
import useAuth from '../../hooks/useAuth';
import SkeletonFeedGrid from '../UI/SkeletonFeedGrid/SkeletonFeedGrid';
import FeedImageComponent from '../UI/ImageComponent/FeedImageComponent';
import useFeed from '../../hooks/useFeed';

const MyGenerations = () => {
  const { isLoggedIn } = useAuth();
  const { myCreationsData, setLastGenerationElement, creationLoading } =
    useFeed();

  useEffect(() => {
    document.title = 'My Creations';
  }, []);

  return (
    <>
      {myCreationsData?.length > 0
        ? myCreationsData?.map((data, i) => (
            <FeedGrid
              forwardedRef={
                myCreationsData.length === i + 1
                  ? setLastGenerationElement
                  : null
              }
              key={i}
              generationDetails={data.generation_details}
              generationPrompt={data.generation_prompt}
              images={data.image_urls.map((data, i) => (
                <FeedImageComponent key={i} image={data} square />
              ))}
              timestamp={data.timestamp}
            />
          ))
        : !isLoggedIn
        ? !creationLoading && (
            <Typography variant='h5' align='center' color='secondary'>
              Sign In to see your Generations
            </Typography>
          )
        : !creationLoading && (
            <Typography variant='h5' align='center' color='secondary'>
              No Previous Generations Found
            </Typography>
          )}
      {creationLoading &&
        Array.from(Array(7).keys()).map((i) => <SkeletonFeedGrid key={i} />)}
      <ScrollToTopButton />
    </>
  );
};

export default MyGenerations;
