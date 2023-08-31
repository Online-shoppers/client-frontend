import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { editCartProduct } from './api/edit-cart-product.api';
import { getCartInfo } from './api/get-cart-info.api';
import { getCartProducts } from './api/get-cart-products.api';
import CartProduct, { CartProductSkeleton } from './components/cart-product.component';
import Checkout from './components/checkout.component';

const CartPage = () => {
  const { t } = useTranslation('cart');

  const queryClient = useQueryClient();

  const cartInfoQuery = useQuery({
    queryKey: ['cart-info'],
    queryFn: async () => {
      const response = await getCartInfo();
      return response.data;
    },
  });

  const cartProductsQuery = useQuery({
    queryKey: ['cart-products'],
    queryFn: async () => {
      const response = await getCartProducts();
      return response.data;
    },
  });

  const cartProductMutation = useMutation({
    mutationFn: async ({ cartProductId, amount }: { cartProductId: string; amount: number }) => {
      const response = await editCartProduct(cartProductId, amount);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart-products'] });
      queryClient.invalidateQueries({ queryKey: ['cart-info'] });
    },
  });

  const onChangeAmount = async (cartProductId: string, amount: number) => {
    await cartProductMutation.mutateAsync({ cartProductId, amount });
  };

  const items = cartProductsQuery.data?.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Container>
      <Stack gap={theme => theme.spacing(3)}>
        <Typography component="h1" variant="h5">
          {t('Your-cart')}
        </Typography>
        <Stack display="flex" direction="row" gap={theme => theme.spacing(5)}>
          <Stack flex={5} gap={theme => theme.spacing(1)}>
            {cartProductsQuery.data ? (
              cartProductsQuery.data.length > 0 ? (
                cartProductsQuery.data.map(product => (
                  <CartProduct
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    imageUrl={product.imageUrl}
                    unitPrice={product.unitPrice}
                    amount={product.quantity}
                    onChange={onChangeAmount}
                  />
                ))
              ) : (
                <Typography>{t('cart:Nothing-in-the-cart')}</Typography>
              )
            ) : (
              <React.Fragment>
                <CartProductSkeleton />
                <CartProductSkeleton />
                <CartProductSkeleton />
              </React.Fragment>
            )}
          </Stack>
          <Box flex={2}>
            <Checkout total={cartInfoQuery.data?.total} items={items} />
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

export default CartPage;
