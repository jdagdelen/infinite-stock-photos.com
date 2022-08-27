import React, { useEffect, useState, useRef } from 'react';
import { Stack, CircularProgress, Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import SearchBar from '../Components/UI/SearchBar/SearchBar';
import useSearch from '../hooks/useSearch';
import ImageComponent from '../Components/UI/ImageComponent/ImageComponent';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prompt = searchParams.get('prompt');
  const [query, setQuery] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [lastElement, setLastElement] = useState(null);
  const { imagesData, isLoading } = useSearch(prompt, pageNo);
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
      <SearchBar
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        onClick={(e) => {
          if (e) e.preventDefault();
          setSearchParams({ prompt: query }, { replace: true });
        }}
      />

      <Grid container direction='row' flexWrap='wrap'>
        {imagesData.map((image, i) => {
          if (imagesData.length === i + 1)
            return (
              <ImageComponent
                forwardedRef={setLastElement}
                key={i}
                image={image.fields.image_file_name}
                description={
                  image.fields?.generation_prompt !== 'None' &&
                  image.fields?.generation_prompt
                }
              />
            );
          else
            return (
              <ImageComponent
                key={i}
                image={image.fields.image_file_name}
                description={
                  image.fields?.generation_prompt !== 'None' &&
                  image.fields?.generation_prompt
                }
              />
            );
        })}
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
    </>
  );
};

export default Search;
