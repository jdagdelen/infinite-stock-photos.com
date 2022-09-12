import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Replay } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

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
    seed: generationDetails.seed ?? -1,
    promptScale: generationDetails.prompt_strength,
    width: generationDetails.width,
    height: generationDetails.height,
    modelVersion: generationDetails.model_version,
  };
  const [largeText, setLargeText] = useState(prompt.length > 400);
  const tStamp = moment.unix(timestamp);

  return (
    <>
      <Grid
        ref={forwardedRef}
        container
        direction='row'
        sx={{ marginTop: '1em' }}
      >
        <Grid item sm={12} md={3} sx={{ padding: '1em', width: '100%' }}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              {prompt.length > 400 ? (
                <Typography
                  maxHeight={largeText && 512}
                  overflow={largeText && 'hidden'}
                  marginBottom={largeText && '0.5em'}
                >
                  {largeText ? (
                    <>
                      {prompt.slice(0, 400)}...{' '}
                      <span
                        style={{ fontWeight: 600, cursor: 'pointer' }}
                        onClick={() => setLargeText(!largeText)}
                      >
                        Show More
                      </span>
                    </>
                  ) : (
                    <>
                      {prompt}{' '}
                      <span
                        style={{ fontWeight: 600, cursor: 'pointer' }}
                        onClick={() => setLargeText(!largeText)}
                      >
                        Show Less
                      </span>
                    </>
                  )}
                </Typography>
              ) : (
                <Typography>{prompt}</Typography>
              )}
              <Button
                variant='contained'
                color='secondary'
                fullWidth
                disableElevation
                startIcon={<Replay />}
                onClick={() =>
                  navigate({
                    pathname: '/generate',
                    search: `?prompt=${prompt}&promptScale=${promptScale}&width=${width}&height=${height}`,
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
          <Typography variant='subtitle1'>{`${tStamp.format(
            'LLL'
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
            {images}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default FeedGrid;
