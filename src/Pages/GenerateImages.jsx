/* eslint-disable react-hooks/exhaustive-deps */
//------ Path ------ //
//------ /generate ------ //
//------------------ //

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
  Typography,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Close, Settings } from '@mui/icons-material';
import { AnimatePresence } from 'framer-motion';

import CustomSlider from '../Components/UI/CustomSlider/CustomSlider';
import ImageComponent from '../Components/UI/ImageComponent/ImageComponent';
import Modal from '../Components/UI/Modal/Modal';
import useGenerate from '../hooks/useGenerate';
import useAuth from '../hooks/useAuth';

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
    requiredPrompt,
    setRequiredPrompt,
    showBuyCreditsModal,
    setShowBuyCreditsModal,
    showVerifyAccountModal,
    setShowVerifyAccountModal,
  } = useGenerate();
  const [searchParams] = useSearchParams();
  const { user, isLoggedIn, credits, emailVerified } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Generate Images';
    const prompt = searchParams.get('prompt');
    const seed = searchParams.get('seed');
    const promptScale = searchParams.get('promptScale');
    const width = searchParams.get('width');
    const height = searchParams.get('height');
    if (prompt) setPrompt(prompt);
    if (width) setWidth(parseInt(width));
    if (height) setHeight(parseInt(height));
    if (promptScale) setPromptWeighting(parseInt(promptScale));
    if (seed === '-1' || !seed) return;
    setUseSeed(true);
    setSeed(seed);
  }, []);

  const controls = (
    <>
      <CustomSlider
        min={512}
        max={1024}
        value={width}
        step={64}
        onChange={(e, v) =>
          setWidth(
            typeof e.target.value === 'string'
              ? parseInt(e.target.value)
              : e.target.value
          )
        }
        title='Width'
        disabled={isLoading}
      />
      <CustomSlider
        min={512}
        disabled={isLoading}
        max={1024}
        value={height}
        step={64}
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
        disabled={isLoading}
        max={10}
        value={promptWeighting}
        step={0.1}
        onChange={(e, v) =>
          setPromptWeighting(
            typeof e.target.value === 'string'
              ? parseInt(e.target.value)
              : e.target.value
          )
        }
        title='Prompt Strength'
        description='Adjusts how closely the model will try to match your prompt.'
      />
      <CustomSlider
        min={1}
        max={10}
        disabled={isLoading}
        value={noOfImages}
        onChange={(e, v) =>
          setNoOfImages(
            typeof e.target.value === 'string'
              ? parseInt(e.target.value)
              : e.target.value
          )
        }
        title='Number of images'
        description={
          <>
            {user.role && user.role === 'premium'
              ? 'You have unlimited credits'
              : `${credits} Credits Left.`}
            <br />
            {user.role && user.role === 'premium'
              ? ''
              : `Cost: ${noOfImages} credits`}
          </>
        }
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
            disabled={!useSeed || isLoading}
          />
        </Grid>
        <Grid item xs={3}>
          <Switch
            disabled={isLoading}
            color='secondary'
            checked={useSeed}
            onChange={({ target }) => setUseSeed(target.checked)}
          />
        </Grid>
      </Grid>
    </>
  );

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
          {controls}
        </Stack>
      </Drawer>
    </>
  );

  const generateOnClick = () => {
    if (!isLoggedIn) {
      navigate('/sign-in');
      return;
    }
    if (!prompt) {
      setRequiredPrompt(true);
      return;
    }
    if (!emailVerified) {
      setShowVerifyAccountModal(true);
      return;
    }
    if (credits === 0 && user.role !== 'premium') {
      setShowBuyCreditsModal(true);
      return;
    }
    generateImages();
  };

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
            gap='1em'
            sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}
          >
            <Grid item xs={12} paddingBottom='1em'>
              <Grid
                container
                direction='row'
                minHeight='75vh'
                alignContent='flex-start'
              >
                {imagesData.map((image, i) => (
                  <ImageComponent
                    key={i}
                    image={typeof image === 'number' ? null : image}
                  />
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <>
                <Grid
                  container
                  direction='row'
                  alignItems='center'
                  sx={{
                    padding: { xs: '0 0 1em 0', md: '0 1em 1em 0' },
                  }}
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
                      disabled={isLoading}
                      fullWidth
                      color='secondary'
                      helperText={requiredPrompt && 'This is Required'}
                      FormHelperTextProps={{
                        style: {
                          color: 'red',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                        },
                      }}
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
                      onClick={generateOnClick}
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
            {controls}
          </Stack>
        </Grid>
      </Grid>
      {mobileDrawer}
      <AnimatePresence>
        {showBuyCreditsModal && (
          <Modal
            key='BuyMoreCreditsModal'
            onClose={() => setShowBuyCreditsModal(!setShowBuyCreditsModal)}
          >
            <Typography variant='h3' align='center'>
              Insufficient Credits
            </Typography>
            <Typography variant='h6' align='center'>
              Buy more credits to generate images
            </Typography>
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showVerifyAccountModal && (
          <Modal
            key='VerifyAccountModal'
            onClose={() => setShowVerifyAccountModal(!setShowVerifyAccountModal)}
          >
            <Typography variant='h3' align='center'>
              Unverified Account!
            </Typography>
            <Typography variant='h6' align='center'>
              Please verify you account using the link sent to your email.
              If you have verified, plese refresh the page.
            </Typography>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default GenerateImages;
