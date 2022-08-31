import React, { useEffect } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { AnimatePresence } from 'framer-motion';

import CustomSlider from '../Components/UI/CustomSlider/CustomSlider';
import useGenerate from '../hooks/useGenerate';
import ImageComponent from '../Components/UI/ImageComponent/ImageComponent';
import { Close, Settings } from '@mui/icons-material';

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
    isDrawerOpen,
    setIsDrawerOpen,
    isLoading,
    prompt,
    setPrompt,
    generateImages,
    imagesData,
  } = useGenerate();

  useEffect(() => {
    document.title = 'Generate Images';
  }, []);

  const mobileDrawer = (
    <>
      <IconButton
        variant='contained'
        color='secondary'
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          top: 70,
          left: 'auto',
          right: 0,
        }}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        {isDrawerOpen ? <Close /> : <Settings />}
      </IconButton>
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='center'
          sx={{ height: '100%', width: 250 }}
          padding='0 1em'
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
      </Drawer>
    </>
  );

  return (
    <Container maxWidth='xl'>
      <Grid
        container
        direction='row'
        sx={{
          padding: '1em',
        }}
      >
        <Grid
          item
          xs={12}
          md={10}
          sx={{
            paddingRight: '1em',
            paddingTop: { xs: '1em', md: 0 },
            flexDirection: { xs: 'column-reverse', md: 'column' },
          }}
        >
          <Grid
            container
            sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}
          >
            <Grid item xs={12} paddingBottom='1em'>
              <Grid
                container
                direction='row'
                minHeight='79vh'
                sx={{
                  overflow: { xs: 'visible', md: 'auto' },
                  maxHeight: { xs: 'auto', md: '79vh' },
                }}
              >
                <AnimatePresence>
                  {imagesData.length > 0
                    ? imagesData.map((image, i) => (
                        <ImageComponent key={i} image={image} />
                      ))
                    : Array.from(Array(noOfImages).keys()).map((_, i) => (
                        <ImageComponent key={i} isLoading={isLoading} />
                      ))}
                </AnimatePresence>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <>
                <Grid
                  container
                  direction='row'
                  alignItems='center'
                  sx={{ padding: { xs: '0 0 1em 0', md: '0 1em 1em 0' } }}
                >
                  <Grid
                    item
                    xs={12}
                    md={11}
                    sx={{ paddingRight: { xs: '0', md: '1em' } }}
                  >
                    <TextField
                      rows={2}
                      variant='outlined'
                      multiline
                      fullWidth
                      color='secondary'
                      value={prompt}
                      onChange={({ target }) => setPrompt(target.value)}
                      InputProps={{
                        style: {
                          backgroundColor: 'white',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={1}>
                    <Button
                      variant='contained'
                      color='secondary'
                      sx={{
                        width: { xs: '100%', md: 'auto' },
                        marginTop: { xs: '1em', md: 0 },
                        transition: 'all 0.1s ease',
                      }}
                      onClick={generateImages}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <CircularProgress color='secondary' size={30} />
                      ) : (
                        'Generate'
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Stack direction='column' alignItems='center' sx={{ height: '100%' }}>
            <CustomSlider
              min={50}
              max={1024}
              value={width}
              onChange={(e, v) =>
                setWidth(
                  typeof e.target.value === 'string'
                    ? parseInt(e.target.value)
                    : e.target.value
                )
              }
              title='Width'
            />
            <CustomSlider
              min={50}
              max={1024}
              value={height}
              onChange={(e, v) =>
                setHeight(
                  typeof e.target.value === 'string'
                    ? parseInt(e.target.value)
                    : e.target.value
                )
              }
              title='Height'
            />
            <CustomSlider
              min={1}
              max={10}
              value={promptWeighting}
              onChange={(e, v) =>
                setPromptWeighting(
                  typeof e.target.value === 'string'
                    ? parseInt(e.target.value)
                    : e.target.value
                )
              }
              title='Prompt Weighting'
              description='Adjusts how much the model will try to match your prompt.'
            />
            <CustomSlider
              min={1}
              max={10}
              value={noOfImages}
              onChange={(e, v) =>
                setNoOfImages(
                  typeof e.target.value === 'string'
                    ? parseInt(e.target.value)
                    : e.target.value
                )
              }
              title='Number of images'
            />
            <Grid container>
              <Grid item xs={9} flexGrow={2}>
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
              <Grid item xs={3}>
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
      {mobileDrawer}
    </Container>
  );
};

export default GenerateImages;
