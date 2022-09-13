import React, { useEffect } from 'react';

import useFeed from '../../hooks/useFeed';
import FeedGrid from '../UI/FeedGrid/FeedGrid';
import FeedImageComponent from '../UI/ImageComponent/FeedImageComponent';
import ScrollToTopButton from '../UI/ScrollToTopButton/ScrollToTopButton';
import SkeletonFeedGrid from '../UI/SkeletonFeedGrid/SkeletonFeedGrid';

const FeedTab = () => {
  const { imagesData, setLastFeedElement, feedLoading } = useFeed();

  useEffect(() => {
    document.title = 'Feed';
  }, []);

  return (
    <>
      {imagesData?.map((data, i) => (
        <FeedGrid
          forwardedRef={imagesData.length === i + 1 ? setLastFeedElement : null}
          key={i}
          generationDetails={data.generation_details}
          generationPrompt={data.generation_prompt}
          images={data.image_urls.map((data, i) => (
            <FeedImageComponent key={i} image={data} square />
          ))}
          timestamp={data.timestamp}
        />
      ))}
      {feedLoading &&
        Array.from(Array(3).keys()).map((i) => <SkeletonFeedGrid key={i} />)}
      <ScrollToTopButton />
    </>
  );
};

export default FeedTab;
