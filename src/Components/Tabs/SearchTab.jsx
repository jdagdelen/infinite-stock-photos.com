import React, { useEffect, useState, useRef } from 'react';

import { Stack, Grid, useTheme, Typography, Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import SearchBar from '../UI/SearchBar/SearchBar';
import ImageComponent from '../UI/ImageComponent/ImageComponent';
import ScrollToTopButton from '../UI/ScrollToTopButton/ScrollToTopButton';
import splitArray from '../../utils/split-array';
import { useInView } from 'react-intersection-observer';
import useSearch from '../../hooks/useSearch';

const SearchTab = () => {
  const [pageNo, setPageNo] = useState(1);
  const { imagesData, isLoading } = useSearch(pageNo, setPageNo);
  const [searchParams, setSearchParams] = useSearchParams();
  const prompt = searchParams.get('prompt');
  const [query, setQuery] = useState(prompt ?? '');
  const [sections, setSections] = useState(4);
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 1,
    delay: 1000,
  });
  const [width, setWidth] = useState('');
  const [grid, setGrid] = useState([]);
  const [loaderGrid] = useState(
    splitArray(Array.from(Array(15).keys()), sections)
  );
  const theme = useTheme();

  useEffect(() => {
    document.title = 'Search';
    changeSecitons();
  }, []);

  const changeSecitons = () => {
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

  useEffect(() => {
    setGrid(splitArray(imagesData, sections));
  }, [imagesData]);

  useEffect(() => {
    console.log('In View', inView);
    console.log('First Render', firstRender.current);
    if (
      inView &&
      (prompt !== '' || prompt || prompt !== null) &&
      !firstRender.current
    )
      setPageNo((prev) => (prev += 1));
    else firstRender.current = false;
  }, [inView]);

  return (
    <>
      <SearchBar
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        onClick={(e) => {
          if (e) e.preventDefault();
          firstRender.current = true;
          setPageNo(1);
          setSearchParams({ prompt: query }, { replace: true });
        }}
      />

      {grid && grid[0]?.length > 0 ? (
        <Stack direction='row' flexWrap='wrap' maxWidth='100vw'>
          {grid?.slice(0, sections).map((col, index) => (
            <Grid container key={index} direction='column' sx={{ width }}>
              {col.map((data, i) => (
                <ImageComponent
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
      <Box ref={ref} />
      <ScrollToTopButton />
    </>
  );
};

export default SearchTab;
