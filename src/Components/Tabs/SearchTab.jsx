import React, { useEffect, useState, useRef } from 'react';

import { Stack, Grid, useTheme, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import SearchBar from '../UI/SearchBar/SearchBar';
import ImageComponent from '../UI/ImageComponent/ImageComponent';
import ScrollToTopButton from '../UI/ScrollToTopButton/ScrollToTopButton';
import splitArray from '../../utils/split-array';

const SearchTab = ({ imagesData, isLoading, setPageNo }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prompt = searchParams.get('prompt');
  const [query, setQuery] = useState(prompt ?? '');
  const [sections, setSections] = useState(4);
  const [lastElement, setLastElement] = useState(null);
  const [width, setWidth] = useState('');
  const theme = useTheme();
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
    changeSecitons(theme);
  }, [theme]);

  const changeSecitons = (theme) => {
    const w = window.innerWidth;
    const breakpoint = theme.breakpoints.values;
    const isBetween = (start, end) =>
      breakpoint[start] <= w && breakpoint[end] > w;

    if (isBetween('xs', 'md')) {
      setSections(1);
      setWidth('100%');
    } else if (isBetween('md', 'lg')) {
      setSections(2);
      setWidth('50%');
    } else if (isBetween('lg', 'xl')) {
      setSections(4);
      setWidth('25%');
    } else if (breakpoint['xl'] < w) {
      setSections(5);
      setWidth('20%');
    }
  };

  const grid = splitArray(imagesData, sections);
  const loaderGrid = splitArray(Array.from(Array(10).keys()), sections);
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

      {grid && grid[0].length > 0 ? (
        <Stack direction='row'>
          {grid?.map((col, index) => (
            <Grid container key={index} direction='column' sx={{ width }}>
              {col.map((data, i) => (
                <ImageComponent
                  forwardedRef={col.length === i + 1 ? setLastElement : null}
                  key={i}
                  image={data.fields.image_url}
                  description={
                    data.fields?.generation_prompt !== 'None' &&
                    data.fields?.generation_prompt
                  }
                  square
                />
              ))}
            </Grid>
          ))}
        </Stack>
      ) : (
        !isLoading &&
        prompt && (
          <Typography align='center' variant='h5' color='secondary'>
            Couldn't Find Any Images
          </Typography>
        )
      )}
      {isLoading && (
        <Stack direction='row'>
          {loaderGrid?.map((col, index) => (
            <Grid container key={index} direction='column' sx={{ width }}>
              {col.map((_, i) => (
                <ImageComponent key={i} square />
              ))}
            </Grid>
          ))}
        </Stack>
      )}
      <ScrollToTopButton />
    </>
  );
};

export default SearchTab;
