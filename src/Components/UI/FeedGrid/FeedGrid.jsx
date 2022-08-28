import React from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Replay } from '@mui/icons-material';
import { AnimatePresence } from 'framer-motion';

import ImageComponent from '../ImageComponent/ImageComponent';

const FeedGrid = ({ images, forwardedRef }) => {
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
              <Typography>
                Side profile centered painted portrait, Imogen Poots as a
                paladin, blonde hair, Gloomhaven matte painting concept art,
                beautifully backlit, official fanart behance hd artstation by
                Jesper Ejsing, by RHADS and Makoto Shinkai and Lois van baarle
                and ilya kuvshinov and rossdraws
              </Typography>
              <Button
                variant='contained'
                color='secondary'
                fullWidth
                disableElevation
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
          <Typography variant='subtitle1'>2747573893</Typography>
          <Typography
            variant='subtitle2'
            color='GrayText'
            sx={{ marginTop: '1em', lineHeight: 0.6 }}
          >
            Prompt Scale
          </Typography>
          <Typography variant='subtitle1'>7</Typography>
          <Typography
            variant='subtitle2'
            color='GrayText'
            sx={{ marginTop: '1em', lineHeight: 0.6 }}
          >
            Created
          </Typography>
          <Typography variant='subtitle1'>August 9, 22 at 8:57 AM</Typography>
          <Typography
            color='GrayText'
            variant='subtitle2'
            sx={{ marginTop: '1em', lineHeight: 0.6 }}
          >
            Model
          </Typography>
          <Typography variant='subtitle1'>stable-diffusion-v1</Typography>
        </Grid>
        <Grid item sm={12} md={9}>
          <Grid container direction='row'>
            <AnimatePresence>
              {images.map((image, i) => (
                <ImageComponent
                  key={i}
                  index={i}
                  image={image.fields.image_file_name}
                  description='Test Test Test Test Test Test '
                />
              ))}
            </AnimatePresence>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default FeedGrid;
