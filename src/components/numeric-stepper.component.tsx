import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface NumericStepperProps {
  value?: number;
  color?: 'primary' | 'secondary' | 'default';
  size?: 'small' | 'medium' | 'large';
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

const NumericStepper: React.FC<NumericStepperProps> = ({
  value = 0,
  color = 'default',
  size = 'medium',
  min,
  max,
  onChange,
}) => {
  const [count, setCount] = useState(value);

  const increase = () => {
    setCount(current => {
      const newValue = getIncreasedValue(current);
      onChange(newValue);
      return newValue;
    });
  };

  const decrease = () => {
    setCount(current => {
      const newValue = getDecreasedValue(current);
      onChange(newValue);
      return newValue;
    });
  };

  const getIncreasedValue = (current: number) => Math.min(current + 1, max || Infinity);

  const getDecreasedValue = (current: number) => Math.max(current - 1, min || -Infinity);

  useEffect(() => {
    setCount(value);
  }, [value]);

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
