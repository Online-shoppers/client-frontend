import { Box, Stack, Typography } from '@mui/material';

import NumericStepper from 'components/numeric-stepper';

const CartProduct = () => {
  return (
    <Stack display="flex" direction="row" gap={theme => theme.spacing(3)} alignItems="center">
      <Box flexBasis={100}>
        <img
          src="https://craftshack.com/cdn/shop/products/Belching-Beaver-Peanut-Butter-Milk-Stout-12OZ-CAN_375x.jpg?v=1642715128"
          alt="Beer"
          width="100%"
        />
      </Box>
      <Box alignSelf="baseline">
        <Stack gap={theme => theme.spacing(1)}>
          <Typography variant="h6" component="h4" margin={0}>
            Beer name
          </Typography>
          <Typography margin={0}>$100</Typography>

          <Box display="flex" justifyContent="flex-start">
            <NumericStepper size="small" />
          </Box>
        </Stack>
      </Box>
      <Box flex={1} />
      <Box display="flex" alignSelf="baseline">
        <Typography variant="button">$100</Typography>
      </Box>
    </Stack>
  );
};

export default CartProduct;
