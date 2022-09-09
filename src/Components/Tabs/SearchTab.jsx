import React, { useEffect, useState, useRef } from 'react';

import { Stack, CircularProgress, Grid, useTheme } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

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

      <Stack direction='row'>
        {grid.map((col, index) => (
          <Grid container key={index} direction='column' sx={{ width }}>
            <AnimatePresence>
              {col.map((data, i) => (
                <ImageComponent
                  forwardedRef={col.length === i + 1 ? setLastElement : null}
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
        ))}
      </Stack>
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

export default SearchTab;
