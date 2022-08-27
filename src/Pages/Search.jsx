import React, { useState } from 'react';
import { Stack, CircularProgress, Grid } from '@mui/material';

import SearchBar from '../Components/UI/SearchBar/SearchBar';
import useSearch from '../hooks/useSearch';
import ImageComponent from '../Components/UI/ImageComponent/ImageComponent';

const Search = () => {
  const [query, setQuery] = useState('');
  const { search, imagesData, isLoading } = useSearch();
  return (
    <>
      <SearchBar
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        onClick={() => search(query)}
      />
      {isLoading && (
        <Stack direction='column' alignItems='center' sx={{ marginTop: '1em' }}>
          <CircularProgress />
        </Stack>
      )}
      {!isLoading && (
        <Grid container direction='row'>
          {imagesData.map((image, i) => (
            <ImageComponent
              key={i}
              image={image.fields.image_file_name}
              description={
                image.fields?.generation_prompt !== 'None' &&
                image.fields?.generation_prompt
              }
            />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Search;
