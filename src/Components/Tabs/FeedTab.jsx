import React, { useState, useRef, useEffect } from 'react';

import FeedGrid from '../UI/FeedGrid/FeedGrid';
import ImageComponent from '../UI/ImageComponent/ImageComponent';
import ScrollToTopButton from '../UI/ScrollToTopButton/ScrollToTopButton';
import SkeletonFeedGrid from '../UI/SkeletonFeedGrid/SkeletonFeedGrid';

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
          images={data.image_urls.map((data, i) => (
            <ImageComponent key={i} image={data} square />
          ))}
          timestamp={data.timestamp}
        />
      ))}
      {isLoading &&
        Array.from(Array(3).keys()).map((i) => <SkeletonFeedGrid key={i} />)}
      <ScrollToTopButton />
    </>
  );
};

export default FeedTab;
