import { Button, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

interface CheckoutProps {
  total?: number;
  items?: number;
}

const Checkout: React.FC<CheckoutProps> = ({ total = 0, items = 0 }) => {
  const { t } = useTranslation('cart');

  return (
    <Paper>
      <Stack padding="10px" gap={theme => theme.spacing(1)}>
        <Typography variant="h6">{t('Checkout')}</Typography>
        <Stack direction="row">
          <Typography variant="subtitle1">
            {items} {t('items')}:
          </Typography>
          <Typography variant="subtitle1" marginLeft="auto" fontWeight="bold" fontSize="1.2rem">
            ${total}
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
