import { Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const OrderForm = () => {
  const { t, i18n } = useTranslation('order');

  useEffect(() => {
    i18n.changeLanguage('ru');
  });

  return (
    <form>
      <Stack gap={theme => theme.spacing(1)}>
        <Stack direction="row" gap={theme => theme.spacing(1)}>
          <TextField required fullWidth label={t('First-name')} />
          <TextField required fullWidth label={t('Last-name')} />
        </Stack>

        <TextField required label={t('Country')} />

        <Stack direction="row" gap={theme => theme.spacing(1)}>
          <TextField required fullWidth label={t('City')} />
          <TextField required fullWidth label={t('Zip-code')} />
        </Stack>

        <TextField required label={t('Address')} />
        <TextField required label={t('Phone')} />
      </Stack>
    </form>
  );
};

export default OrderForm;
