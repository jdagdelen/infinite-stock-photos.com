import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import ImageComponent from '../ImageComponent/ImageComponent';
import { Replay } from '@mui/icons-material';

const SkeletonFeedGrid = () => {
  return (
    <>
      <Grid container direction='row' sx={{ marginTop: '1em' }}>
        <Grid item sm={12} md={3} sx={{ padding: '1em', width: '100%' }}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Typography>
                <Skeleton count={3} />
              </Typography>
              <Button
                variant='contained'
                color='secondary'
                fullWidth
                disableElevation
                disabled
                startIcon={<Replay />}
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
          <Typography variant='subtitle1'>
            <Skeleton />
          </Typography>
          <Typography
            variant='subtitle2'
            color='GrayText'
            sx={{ marginTop: '1em', lineHeight: 0.6 }}
          >
            Prompt Scale
          </Typography>
          <Typography variant='subtitle1'>
            <Skeleton />
          </Typography>
          <Typography
            variant='subtitle2'
            color='GrayText'
            sx={{ marginTop: '1em', lineHeight: 0.6 }}
          >
            Created
          </Typography>
          <Typography variant='subtitle1'>
            <Skeleton />
          </Typography>
          <Typography
            color='GrayText'
            variant='subtitle2'
            sx={{ marginTop: '1em', lineHeight: 0.6 }}
          >
            Model
          </Typography>
          <Typography variant='subtitle1'>
            <Skeleton />
          </Typography>
        </Grid>
        <Grid item sm={12} md={9}>
          <Grid container direction='row'>
            {Array.from(Array(4).keys()).map((data, i) => (
              <ImageComponent key={i} square />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SkeletonFeedGrid;
