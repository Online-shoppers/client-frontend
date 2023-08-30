import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/lab/LoadingButton';
import { Alert, Container, Snackbar, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserId } from 'app/auth/store/auth.selectors';
import { getCart } from 'app/cart/api/get-cart.api';

import { DefaultError } from 'errors/default.error';

import { createOrder } from './api/create-order.api';
import CreateOrderForm from './components/create-order.form';
import OrderProduct from './components/order-product.component';
import { createOrderSchema } from './schemas/create-order.schema';
import { CreateOrderFormType } from './types/create-order-form.type';

const CreateOrderPage = () => {
  const { t } = useTranslation('order');

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const userId = useSelector(getUserId);

  const {
    handleSubmit,
    reset,
    formState: { isValid },
    control,
  } = useForm<CreateOrderFormType>({
    defaultValues: {
      city: '',
      phone: '',
      address: '',
      country: '',
      zipCode: '',
      lastName: '',
      firstName: '',
    },
    resolver: yupResolver(createOrderSchema),
  });

  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await getCart();
      return response.data;
    },
  });
  const cartData = cartQuery.data;

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      reset();
    },
  });

  const closeError = () => {
    setIsError(false);
  };

  const handleCreateOrder = handleSubmit(async form => {
    try {
      await createOrderMutation.mutateAsync(form);
    } catch (err) {
      console.error(err);

      if (isAxiosError<DefaultError>(err)) {
        setIsError(true);
        setErrorMessage(err.response?.data.message || err.message);
      } else {
        setIsError(true);
        setErrorMessage(t('errors:Something-went-wrong'));
      }
    }
  });

  return (
    <Container>
      <Stack display="flex" direction="row" gap={theme => theme.spacing(5)}>
        <Stack flex={2} gap={theme => theme.spacing(3)}>
          <Typography variant="h5">{t('Details')}:</Typography>
          <CreateOrderForm onSubmit={handleCreateOrder} control={control} />
          <Button
            variant="contained"
            onClick={handleCreateOrder}
            disabled={cartData?.products.length === 0 || !isValid}
            loading={createOrderMutation.isLoading}
          >
            {t('Buy')}
          </Button>
        </Stack>
        <Stack flex={1} gap={theme => theme.spacing(3)}>
          <Typography variant="h5">{t('Order')}:</Typography>
          <Stack gap={theme => theme.spacing(2)}>
            {cartData?.products.map(product => (
              <OrderProduct
                key={product.id}
                name={product.name}
                imageUrl={product.imageUrl}
                amount={product.quantity}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Snackbar
        open={isError}
        autoHideDuration={5000}
        onClose={closeError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert variant="filled" severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateOrderPage;
