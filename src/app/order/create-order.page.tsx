import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/lab/LoadingButton';
import { Alert, Container, Snackbar, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getCartProducts } from 'app/cart/api/get-cart-products.api';

import { getErrorMessages } from 'utils/get-error-messages.util';

import { createOrder } from './api/create-order.api';
import CreateOrderForm from './components/create-order.form';
import OrderProduct from './components/order-product.component';
import { createOrderSchema } from './schemas/create-order.schema';
import { CreateOrderFormType } from './types/create-order-form.type';

const CreateOrderPage = () => {
  const { t } = useTranslation('order');

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const cartProductsQuery = useQuery({
    queryKey: ['cart-products'],
    queryFn: async () => {
      const response = await getCartProducts();
      return response.data;
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart-info'] });
      queryClient.invalidateQueries({ queryKey: ['cart-products'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });

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

      const messages = getErrorMessages(err);
      const text = messages ? messages[0] : t('errors:Something-went-wrong');
      setIsError(true);
      setErrorMessage(text);
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
            disabled={cartProductsQuery.data?.length === 0 || !isValid}
            loading={createOrderMutation.isLoading}
          >
            {t('Buy')}
          </Button>
        </Stack>
        <Stack flex={1} gap={theme => theme.spacing(3)}>
          <Typography variant="h5">{t('Order')}:</Typography>
          <Stack gap={theme => theme.spacing(2)}>
            {cartProductsQuery.data?.map(product => (
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
