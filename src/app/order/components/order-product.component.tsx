import { Badge, Box, Stack, Typography } from '@mui/material';
import React from 'react';

interface OrderProductProps {
  name: string;
  imageUrl: string;
  amount: number;
}

const OrderProduct: React.FC<OrderProductProps> = ({ name, imageUrl, amount }) => {
  return (
    <Stack display="flex" direction="row" gap={theme => theme.spacing(3)} alignItems="center">
      <Box flexBasis={60}>
        <Badge badgeContent={amount} color="primary">
          <img src={imageUrl} alt={name} width="100%" />
        </Badge>
      </Box>

      <Typography variant="h6" component="h4" margin={0} flexShrink={1000}>
        {name}
      </Typography>

      <Box flex={1} />

      {/* <Typography variant="button">$100</Typography> */}
    </Stack>
  );
};

export default OrderProduct;
