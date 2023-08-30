import { FormControl, FormLabel, Stack, TextField } from '@mui/material';
import React, { BaseSyntheticEvent } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CreateOrderFormType } from '../types/create-order-form.type';

interface OrderFormProps {
  control: Control<CreateOrderFormType>;
  onSubmit: (e?: BaseSyntheticEvent | undefined) => Promise<void>;
}

const CreateOrderForm: React.FC<OrderFormProps> = ({ control, onSubmit }) => {
  const { t } = useTranslation('order');

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={theme => theme.spacing(1)}>
        <Stack direction="row" gap={theme => theme.spacing(1)}>
          <Controller
            name="firstName"
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth>
                <TextField {...field} error={!!error} required fullWidth label={t('First-name')} />
                {error ? <FormLabel error>{t(error.message)}</FormLabel> : null}
              </FormControl>
            )}
            control={control}
          />

          <Controller
            name="lastName"
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth>
                <TextField {...field} error={!!error} required label={t('Last-name')} />
                {error ? <FormLabel error>{t(error.message)}</FormLabel> : null}
              </FormControl>
            )}
            control={control}
          />
        </Stack>

        <Controller
          name="country"
          render={({ field, fieldState: { error } }) => (
            <FormControl>
              <TextField {...field} error={!!error} required label={t('Country')} />
              {error ? <FormLabel error>{t(error.message)}</FormLabel> : null}
            </FormControl>
          )}
          control={control}
        />

        <Stack direction="row" gap={theme => theme.spacing(1)}>
          <Controller
            name="city"
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth>
                <TextField {...field} error={!!error} required label={t('City')} />
                {error ? <FormLabel error>{t(error.message)}</FormLabel> : null}
              </FormControl>
            )}
            control={control}
          />

          <Controller
            name="zipCode"
            render={({ field, fieldState: { error } }) => (
              <FormControl>
                <TextField {...field} error={!!error} required fullWidth label={t('Zip-code')} />
                {error ? <FormLabel error>{t(error.message)}</FormLabel> : null}
              </FormControl>
            )}
            control={control}
          />
        </Stack>

        <Controller
          name="address"
          render={({ field, fieldState: { error } }) => (
            <FormControl>
              <TextField {...field} error={!!error} required label={t('Address')} />
              {error ? <FormLabel error>{t(error.message)}</FormLabel> : null}
            </FormControl>
          )}
          control={control}
        />

        <Controller
          name="phone"
          render={({ field, fieldState: { error } }) => (
            <FormControl>
              <TextField {...field} error={!!error} required label={t('Phone')} />
              {error ? <FormLabel error>{t(error.message)}</FormLabel> : null}
            </FormControl>
          )}
          control={control}
        />
      </Stack>
      <button type="submit" hidden />
    </form>
  );
};

export default CreateOrderForm;
