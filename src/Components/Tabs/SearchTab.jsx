import React, { useEffect, useState, useRef } from 'react';

import {
  Stack,
  Grid,
  useTheme,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
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
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    threshold: 1,
    delay: 1000,
  });
  // const [width, setWidth] = useState('');
  // const [loaderGrid] = useState(
  // splitArray(Array.from(Array(15).keys()), sections)
  // );
  const theme = useTheme();
  const XSorMD = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const MDorLG = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const LGorXL = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const moreThanXL = useMediaQuery(theme.breakpoints.up('xl'));
  const delay = useRef(true);

  useEffect(() => {
    document.title = 'Search';
  }, []);

  // const changeSecitons = () => {
  //   const w = window.innerWidth;
  //   const breakpoint = theme.breakpoints.values;
  //   const isBetween = (start, end) =>
  //     breakpoint[start] <= w && breakpoint[end] > w;

  //   if (isBetween('xs', 'md')) {
  //     setSections(1);
  //     setWidth('100%');
  //   } else if (isBetween('md', 'lg')) {
  //     setSections(2);
  //     setWidth('50%');
  //   } else if (isBetween('lg', 'xl')) {
  //     setSections(4);
  //     setWidth('25%');
  //   } else if (breakpoint['xl'] < w) {
  //     setSections(5);
  //     setWidth('20%');
  //   }
  // };

  let loaderGrid;
  let width;
  let grid;
  if (XSorMD) {
    width = '100%';
    grid = splitArray(imagesData, 1);
    loaderGrid = splitArray(Array.from(Array(15).keys()), 1);
  } else if (MDorLG) {
    width = '50%';
    grid = splitArray(imagesData, 2);
    loaderGrid = splitArray(Array.from(Array(15).keys()), 2);
  } else if (LGorXL) {
    width = '25%';
    grid = splitArray(imagesData, 3);
    loaderGrid = splitArray(Array.from(Array(15).keys()), 4);
  } else if (moreThanXL) {
    width = '20%';
    grid = splitArray(imagesData, 4);
    loaderGrid = splitArray(Array.from(Array(15).keys()), 5);
  }

  useEffect(() => {
    if (
      inView &&
      (prompt !== '' || prompt || prompt !== null) &&
      !firstRender.current &&
      !delay.current
    ) {
      setPageNo((prev) => (prev += 1));
      delay.current = true;
    } else firstRender.current = false;
    setTimeout(() => (delay.current = false), 300);
  }, [inView]);

  console.log(grid);
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
        <Grid container direction='row' maxWidth='100%'>
          {grid?.map((col, index) => (
            <Grid key={index} item xs={12} md={6} lg={4} xl={3}>
              <Grid
                container
                direction='column'
                width='100%'
                // sx={{ width }}
              >
                {col.map((data, i) => (
                  <ImageComponent
                    forwardedRef={
                      XSorMD && index === 0 && i === col.length - 1
                        ? // ? console.log('give ref mobile')
                          ref
                        : !XSorMD && index === 0 && i === col.length - 1
                        ? // ? console.log('give ref pc')

                          ref
                        : null
                    }
                    test={
                      XSorMD && index === 0 && i === col.length - 1
                        ? // ? console.log('give ref mobile')
                          true
                        : !XSorMD && index === 0 && i === col.length - 1
                        ? // ? console.log('give ref pc')

                          true
                        : false
                    }
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
            </Grid>
          ))}
        </Grid>
      ) : (
        !isLoading &&
        prompt && (
          <Typography align='center' variant='h5' color='secondary'>
            Couldn't Find Any Images
          </Typography>
        )
      )}

      {isLoading && prompt && (
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
      {/* <Box
        sx={{
          bgcolor: 'transparent',
          width: 10,
          height: 10,
        }}
      /> */}
      <ScrollToTopButton />
    </>
  );
};

export default SearchTab;
