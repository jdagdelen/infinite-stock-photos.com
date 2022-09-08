import React from 'react';
import { Grid, Stack, Typography, Input, Slider, Box } from '@mui/material';

const CustomSlider = ({
  value,
  onChange,
  title,
  description,
  min,
  max,
  step = 1,
  disabled,
}) => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <Stack direction='row' justifyContent='space-between'>
          <Box>
            <Typography variant='subtitle1'>{title}</Typography>
          </Box>
          <Input
            size='small'
            value={value}
            onChange={onChange}
            color='secondary'
            disabled={disabled}
            inputProps={{
              step,
              min: min,
              max: max,
              type: 'number',
            }}
          />
        </Stack>
      </Grid>
      <Grid item>
        <Typography color='GrayText' variant='subtitle2'>
          {description}
        </Typography>
      </Grid>
      <Grid item>
        <Slider
          color='secondary'
          value={value}
          onChange={onChange}
          step={step}
          min={min}
          max={max}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};

export default CustomSlider;
