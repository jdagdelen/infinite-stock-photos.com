import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Replay } from '@mui/icons-material';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import ImageComponent from '../ImageComponent/ImageComponent';

const FeedGrid = ({
  images,
  forwardedRef,
  generationDetails,
  generationPrompt,
  timestamp,
}) => {
  const navigate = useNavigate();
  const { prompt, promptScale, seed, height, modelVersion, width } = {
    prompt: generationPrompt,
    seed: timestamp,
    promptScale: generationDetails.prompt_strength,
    width: generationDetails.width,
    height: generationDetails.height,
    modelVersion: generationDetails.model_version,
  };
  const tStamp = new Date(timestamp);
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    minute: 'numeric',
    hour: 'numeric',
    second: 'numeric',
  };

  return (
    <>
      <Grid
        ref={forwardedRef}
        container
        direction='row'
        sx={{ marginTop: '1em' }}
      >
        <Grid item sm={12} md={3} sx={{ padding: '1em' }}>
          <Card>
            <CardContent>
              <Typography>{prompt}</Typography>
              <Button
                variant='contained'
                color='secondary'
                fullWidth
                disableElevation
                startIcon={<Replay />}
                onClick={() =>
                  navigate({
                    pathname: '/generate',
                    search: `?prompt=${prompt}&seed=${seed}&promptScale=${promptScale}&width=${width}&height=${height}`,
                  })
                }
              >
                Remix Prompt
              </Button>
            </CardContent>
          </Card>
          <Typography
            variant='subtitle2'
            sx={{ marginTop: '1em', lineHeight: 0.6 }}
            color='GrayText'
          >
            Seed
          </Typography>
          <Typography variant='subtitle1'>{seed}</Typography>
          <Typography
            variant='subtitle2'
            color='GrayText'
            sx={{ marginTop: '1em', lineHeight: 0.6 }}
          >
            Prompt Scale
          </Typography>
          <Typography variant='subtitle1'>{promptScale}</Typography>
          <Typography
            variant='subtitle2'
            color='GrayText'
            sx={{ marginTop: '1em', lineHeight: 0.6 }}
          >
            Created
          </Typography>
          <Typography variant='subtitle1'>{`${tStamp.toLocaleString(
            'en-US',
            options
          )}`}</Typography>
          <Typography
            color='GrayText'
            variant='subtitle2'
            sx={{ marginTop: '1em', lineHeight: 0.6 }}
          >
            Model
          </Typography>
          <Typography variant='subtitle1'>{modelVersion}</Typography>
        </Grid>
        <Grid item sm={12} md={9}>
          <Grid container direction='row'>
            <AnimatePresence>
              {images.map((image, i) => (
                <ImageComponent key={i} image={image} square />
              ))}
            </AnimatePresence>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default FeedGrid;
