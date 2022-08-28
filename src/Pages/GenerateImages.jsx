import React, { useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { AnimatePresence } from 'framer-motion';

import CustomSlider from '../Components/UI/CustomSlider/CustomSlider';
import useGenerate from '../hooks/useGenerate';
import ImageComponent from '../Components/UI/ImageComponent/ImageComponent';

const GenerateImages = () => {
  const {
    width,
    setWidth,
    height,
    setHeight,
    promptWeighting,
    setPromptWeighting,
    noOfImages,
    setNoOfImages,
    seed,
    setSeed,
    setUseSeed,
    useSeed,
  } = useGenerate();

  useEffect(() => {
    document.title = 'Generate Images';
  }, []);

  return (
    <Grid
      container
      sx={{
        flexDirection: { xs: 'column-reverse', md: 'row' },
        padding: '1em',
        minHeight: { xs: null, md: '90vh' },
      }}
    >
      <Grid
        item
        xs={12}
        md={10}
        sx={{ paddingRight: '1em', paddingTop: { xs: '1em', md: 0 } }}
      >
        <Grid container direction='row'>
          <AnimatePresence>
            {Array.from(Array(noOfImages).keys()).map((_, i) => (
              <ImageComponent key={i} index={i} />
            ))}
          </AnimatePresence>
        </Grid>
        <Card sx={{ marginTop: '1em' }}>
          <CardContent>
            <Grid container direction='row' alignItems='center'>
              <Grid item xs={12} md={11} sx={{ paddingRight: '1em' }}>
                <Typography sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  Side profile centered painted portrait, Imogen Poots as a
                  paladin, blonde hair, Gloomhaven matte painting concept art,
                  beautifully backlit, official fanart behance hd artstation by
                  Jesper Ejsing, by RHADS and Makoto Shinkai and Lois van baarle
                  and ilya kuvshinov and rossdraws
                </Typography>
              </Grid>
              <Grid item xs={12} md={1}>
                <Button
                  variant='contained'
                  color='secondary'
                  sx={{ width: { xs: '100%', md: 'auto' } }}
                >
                  Generate
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={2}>
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='center'
          sx={{ height: '100%' }}
        >
          <CustomSlider
            min={50}
            max={1024}
            value={width}
            onChange={(e, v) => setWidth(v)}
            title='Width'
          />
          <CustomSlider
            min={50}
            max={1024}
            value={height}
            onChange={(e, v) => setHeight(v)}
            title='Height'
          />
          <CustomSlider
            min={1}
            max={10}
            value={promptWeighting}
            onChange={(e, v) => setPromptWeighting(v)}
            title='Prompt Weighting'
            description='Adjusts how much the model will try to match your prompt.'
          />
          <CustomSlider
            min={1}
            max={10}
            value={noOfImages}
            onChange={(e, v) => setNoOfImages(v)}
            title='Number of images'
          />
          <Grid container>
            <Grid item flexGrow={1}>
              <TextField
                size='small'
                color='secondary'
                type='number'
                fullWidth
                value={seed}
                onChange={({ target }) => setSeed(target.value)}
                disabled={!useSeed}
              />
            </Grid>
            <Grid item>
              <Switch
                color='secondary'
                checked={useSeed}
                onChange={({ target }) => setUseSeed(target.checked)}
              />
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default GenerateImages;
