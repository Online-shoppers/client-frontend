import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

interface NumericStepperProps {
  variant?: 'text' | 'contained' | 'outlined';
}

const NumericStepper: React.FC<NumericStepperProps> = ({ variant }) => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(current => current + 1);
  };

  const decrease = () => {
    setCount(current => current - 1);
  };

  return (
    <Grid
      container
      alignItems="center"
      display="grid"
      gridTemplateColumns="1fr 1fr 1fr"
      width="auto"
    >
      <Grid item>
        <Button variant={variant} size="small" onClick={decrease}>
          <RemoveIcon />
        </Button>
      </Grid>
      <Grid item display="flex" justifyContent="center">
        <Typography variant="button">{count}</Typography>
      </Grid>
      <Grid item>
        <Button variant={variant} size="small" onClick={increase}>
          <AddIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default NumericStepper;
