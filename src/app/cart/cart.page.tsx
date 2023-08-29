import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { editCartProduct } from './api/edit-cart-product.api';
import { getCart } from './api/get-cart.api';
import CartProduct from './components/cart-product.component';
import Checkout from './components/checkout.component';

const CartPage = () => {
  const { t } = useTranslation('cart');

  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await getCart();
      return response.data;
    },
  });
  const cartData = cartQuery.data;

  const cartProductMutation = useMutation({
    mutationFn: ({ cartProductId, amount }: { cartProductId: string; amount: number }) =>
      editCartProduct(cartProductId, amount),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const onChangeAmount = async (cartProductId: string, amount: number) => {
    await cartProductMutation.mutateAsync({ cartProductId, amount });
  };

  return (
    <Container>
      <Stack gap={theme => theme.spacing(3)}>
        <Typography component="h1" variant="h5">
          {t('Your-cart')}
        </Typography>
        <Stack display="flex" direction="row" gap={theme => theme.spacing(5)}>
          <Stack flex={5} gap={theme => theme.spacing(1)}>
            {cartData ? (
              cartData.products.map(product => (
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
              <Typography variant="body1">Nothing in cart</Typography>
            )}
          </Stack>
          <Box flex={2}>{cartData ? <Checkout cart={cartData} /> : null}</Box>
        </Stack>
      </Stack>
    </Container>
  );
};

export default CartPage;
