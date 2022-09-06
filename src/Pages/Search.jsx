//------ Path ------ //
//------  /search   ------ //
//------------------ //

import React, { useEffect, useState, useRef } from 'react';
import { Stack, CircularProgress, Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import SearchBar from '../Components/UI/SearchBar/SearchBar';
import useSearch from '../hooks/useSearch';
import ImageComponent from '../Components/UI/ImageComponent/ImageComponent';
import ScrollToTopButton from '../Components/UI/ScrollToTopButton/ScrollToTopButton';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prompt = searchParams.get('prompt');
  const [query, setQuery] = useState(prompt ?? '');
  const [pageNo, setPageNo] = useState(1);
  const [lastElement, setLastElement] = useState(null);
  const { imagesData, isLoading } = useSearch(pageNo, setPageNo);
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
    document.title = 'Search';
  }, []);

  return (
    <>
      <SearchBar
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        onClick={(e) => {
          if (e) e.preventDefault();
          setSearchParams({ prompt: query }, { replace: true });
        }}
      />

      <Grid container direction='row' flexWrap='wrap'>
        <AnimatePresence>
          {imagesData.map((data, i) => (
            <ImageComponent
              forwardedRef={imagesData.length === i + 1 ? setLastElement : null}
              key={i}
              index={i}
              image={data.fields.image_url}
              description={
                data.fields?.generation_prompt !== 'None' &&
                data.fields?.generation_prompt
              }
              square
            />
          ))}
        </AnimatePresence>
      </Grid>
      {isLoading && (
        <Stack
          direction='column'
          alignItems='center'
          sx={{ marginTop: '1em', overflowX: 'hidden' }}
        >
          <CircularProgress />
        </Stack>
      )}
      <ScrollToTopButton />
    </>
  );
};

export default Search;
