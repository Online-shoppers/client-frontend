import { Box, Skeleton, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import NumericStepper from 'components/numeric-stepper.component';

interface CartProductProps {
  id: string;
  name: string;
  imageUrl: string;
  unitPrice: number;
  amount: number;
  onChange?: (cartProductId: string, amount: number) => void;
}

const CartProduct: React.FC<CartProductProps> = ({
  id,
  name,
  imageUrl,
  unitPrice,
  amount,
  onChange = () => {},
}) => {
  const [productTotal, setProductTotal] = useState(unitPrice * amount);
  const [productAmount, setProductAmount] = useState(amount);

  const onChangeAmount = (newAmount: number) => {
    setProductTotal(newAmount * unitPrice);
    setProductAmount(newAmount);
    onChange(id, newAmount);
  };

  useEffect(() => {
    setProductAmount(amount);
    setProductTotal(unitPrice * amount);
  }, [unitPrice, amount]);

  if (productAmount <= 0) {
    return null;
  }

  return (
    <Stack display="flex" direction="row" gap={theme => theme.spacing(3)} alignItems="center">
      <Box flexBasis={100}>
        <img src={imageUrl} alt="Beer" width="100%" />
      </Box>
      <Box alignSelf="baseline">
        <Stack>
          <Typography variant="h6" component="h4" margin={0}>
            {name}
          </Typography>
          <Typography margin={0}>${unitPrice}</Typography>

          <Box display="flex" justifyContent="flex-start">
            <NumericStepper
              data-testid="numeric-stepper"
              value={productAmount}
              onChange={onChangeAmount}
              size="small"
            />
          </Box>
        </Stack>
      </Box>
      <Box flex={1} />
      <Box display="flex" alignSelf="baseline">
        <Typography fontWeight="bold" fontSize="1.1rem">
          ${productTotal}
        </Typography>
      </Box>
    </Stack>
  );
};

export const CartProductSkeleton = () => {
  return (
    <Stack
      display="flex"
      direction="row"
      gap={theme => theme.spacing(3)}
      alignItems="center"
      width="100%"
    >
      <Box flexBasis={100} height="70px">
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
      <Box alignSelf="baseline" width="100%">
        <Stack>
          <Skeleton variant="text" />
          <Skeleton variant="text" />

          {/* <Box display="flex" justifyContent="flex-start">
            <NumericStepper value={amount} onChange={onChangeAmount} size="small" />
          </Box> */}
        </Stack>
      </Box>
      <Box flex={1} />
      <Box display="flex" alignSelf="baseline">
        <Skeleton variant="rounded" />
      </Box>
    </Stack>
  );
};

export default CartProduct;
