import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

interface NumericStepperProps {
  value?: number;
  onChange: (value: number) => void;
  color?: 'primary' | 'secondary' | 'default';
  size?: 'small' | 'medium' | 'large';
}

const NumericStepper: React.FC<NumericStepperProps> = ({
  value = 0,
  onChange,
  color = 'default',
  size = 'medium',
}) => {
  const [count, setCount] = useState(value);

  const increase = () => {
    setCount(current => current + 1);
    onChange(count + 1);
  };

  const decrease = () => {
    if (count > 1) {
      setCount(current => current - 1);
      onChange(count - 1);
    }
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
        <IconButton color={color} size={size} onClick={decrease}>
          <RemoveIcon />
        </IconButton>
      </Grid>
      <Grid item display="flex" justifyContent="center">
        <Typography variant="button">{count}</Typography>
      </Grid>
      <Grid item>
        <IconButton color={color} size={size} onClick={increase}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default NumericStepper;
