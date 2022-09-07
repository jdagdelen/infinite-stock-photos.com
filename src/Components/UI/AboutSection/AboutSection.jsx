import React from 'react';
import { Stack, Typography, Grid, Divider } from '@mui/material';

const AboutSection = () => {
  return (
    <Stack
      direction='column'
      sx={{
        justifyContent: { xs: null, md: 'center' },
        textAlign: { xs: 'center', md: 'left' },
        marginTop: { xs: '1em', md: 0 },
      }}
      minHeight='80vh'
    >
      <Typography variant='h4'>How does it work?</Typography>
      <Typography variant='subtitle1' gutterBottom>
        We use AI to generate images from text prompts. All the image search
        results you see were generated using Stable Diffusion. Sign up to generate
        your own.
      </Typography>
      <Typography variant='h4'>Are these images truly free?</Typography>
      <Typography variant='subtitle1' gutterBottom>
        Yes! You can safely use any images on this site for free in any meme, project, etc
        commercial or otherwise! (Even if you didn't generate them.) All images generated with our service are being put in the public domain.
      </Typography>
      {/* spacing divider */}
      <Divider sx={{ marginTop: '1em', marginBottom: '1em' }} />
      <Grid container direction='row'>
        <Grid item xs={12} md={4}>
          <Typography variant='h4' color='black'>
            Free Tier
            <br />
          </Typography>
          <Typography color='black' fontWeight={700} gutterBottom>
            40 free credits when you sign up.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant='h4' color='secondary'>
            Buy Credits
            <br />
          </Typography>
          <Typography color='secondary' fontWeight={700} gutterBottom>
            Pay as you go. Credits never expire.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant='h4' color='error'>
            Unlimited Tier
            <br />
          </Typography>
          <Typography color='error' fontWeight={700} gutterBottom>
            Go unlimited for $14.99/month. 
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AboutSection;
