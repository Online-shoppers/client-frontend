import { Button, Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Checkout = () => {
  const { t } = useTranslation('cart');

  return (
    <Paper>
      <Stack padding="10px" gap={theme => theme.spacing(1)}>
        <Typography variant="h6">{t('Checkout')}</Typography>
        <Stack direction="row">
          <Typography variant="subtitle1">5 {t('items')}: </Typography>
          <Typography variant="subtitle1" marginLeft="auto">
            $100
          </Typography>
        </Stack>
        <Button variant="contained">{t('Proceed-to-payment')}</Button>
      </Stack>
    </Paper>
  );
};

export default Checkout;
