import { Badge, Box, Stack, Typography } from '@mui/material';

const OrderProduct = () => {
  return (
    <Stack display="flex" direction="row" gap={theme => theme.spacing(3)} alignItems="center">
      <Box flexBasis={60}>
        <Badge badgeContent={4} color="primary">
          <img
            src="https://craftshack.com/cdn/shop/products/Belching-Beaver-Peanut-Butter-Milk-Stout-12OZ-CAN_375x.jpg?v=1642715128"
            alt="Beer"
            width="100%"
          />
        </Badge>
      </Box>

      <Typography variant="h6" component="h4" margin={0}>
        Beer name
      </Typography>

      <Box flex={1} />

      <Typography variant="button">$100</Typography>
    </Stack>
  );
};

export default OrderProduct;
