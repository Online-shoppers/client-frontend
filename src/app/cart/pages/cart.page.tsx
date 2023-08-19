import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import CartProduct from '../components/cart-product.component';
import Checkout from '../components/checkout.component';

const MOCK_CART_PRODUCTS = [
  {
    id: 'string-string-string-string',
    created: 'created-date',
    updated: 'updated-date',
    name: 'Beer name',
    description:
      'Our Peanut Butter Milk Stout is simply irresistible. It’s like dark chocolate Reese’s in a glass! Rolled oats and Lactose add to the creamy body of this beer while heavenly aromas of roasted buttery peanuts and chocolate greet you with every sip. Try this out with a scoop of vanilla ice cream for a real treat!',
    image:
      'https://craftshack.com/cdn/shop/products/Belching-Beaver-Peanut-Butter-Milk-Stout-12OZ-CAN_375x.jpg?v=1642715128',
    category: 'Beer',
    abv: 'A little bitter',
    ibu: 40, // %
    price: 100,
    quantity: 447,
    type: 'Light',
    archived: false,
  },
  {
    id: 'string-string-string-string',
    created: 'created-date',
    updated: 'updated-date',
    name: 'GERMAN BEER CHEESE SAUCE',
    description:
      'Our Peanut Butter Milk Stout is simply irresistible. It’s like dark chocolate Reese’s in a glass! Rolled oats and Lactose add to the creamy body of this beer while heavenly aromas of roasted buttery peanuts and chocolate greet you with every sip. Try this out with a scoop of vanilla ice cream for a real treat!',
    image:
      'https://veryvera.wierstewarthosting.com/wp-content/uploads/2017/10/03114706/cheese-2400x1590.jpg',
    category: 'Snack',
    price: 100,
    quantity: 447,
    type: 'Cheese',
    archived: false,
  },
  {
    id: 'string-string-string-string',
    created: 'created-date',
    updated: 'updated-date',
    name: 'Accessory name',
    description:
      "Better than any Craft Beer Club! CraftShack's e-Gift Card makes the perfect gift for any beer geek or drink enthusiast. Unlock 1000's of different beers and a wide variety of rare and emerging spirits.",
    image:
      'https://craftshack.com/cdn/shop/products/e38bd83af578077b65a31424bd24d085_720x.png?v=1587282596',
    category: 'Accessory',
    price: 100,
    quantity: 447,
    type: 'Gift',
    archived: false,
  },
];

const CartPage = () => {
  return (
    <Container>
      <Stack display="flex" direction="row" gap={theme => theme.spacing(5)}>
        <Stack flex={5} gap={theme => theme.spacing(1)}>
          {MOCK_CART_PRODUCTS.map((product, idx) => (
            <CartProduct key={idx} />
          ))}
        </Stack>
        <Box flex={2}>
          <Checkout />
        </Box>
      </Stack>
    </Container>
  );
};

export default CartPage;
