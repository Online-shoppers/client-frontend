import { Button, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { Cart } from '../types/cart.type';

interface CheckoutProps {
  cart: Cart;
}

const Checkout: React.FC<CheckoutProps> = ({ cart }) => {
  const { t } = useTranslation('cart');

  const items = cart.products.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <Paper>
      <Stack padding="10px" gap={theme => theme.spacing(1)}>
        <Typography variant="h6">{t('Checkout')}</Typography>
        <Stack direction="row">
          <Typography variant="subtitle1">
            {items} {t('items')}:{' '}
          </Typography>
          <Typography variant="subtitle1" marginLeft="auto" fontWeight="bold" fontSize="1.2rem">
            ${cart.total}
          </Typography>
        </Stack>
        <Button variant="contained" component={RouterLink} to="/order" disabled={items === 0}>
          {t('Proceed-to-payment')}
        </Button>
      </Stack>
    </Paper>
  );
};

export default Checkout;
