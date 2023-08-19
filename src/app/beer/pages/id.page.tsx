import { Button, Link, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import NumericStepper from 'components/numeric-stepper';

const MOCK_BEER = {
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
};

const IdPage = () => {
  const { t } = useTranslation(['cart', 'review']);

  return (
    <Container>
      <Stack display="flex" direction="row" gap={theme => theme.spacing(5)}>
        <Box flex={3}>
          <img src={MOCK_BEER.image} alt="Beer" width="100%" />
        </Box>
        <Box flex={4}>
          <Stack gap={theme => theme.spacing(1)}>
            <Typography variant="h4" component="h1">
              {MOCK_BEER.name}
            </Typography>
            <Typography paragraph margin={0}>
              {MOCK_BEER.description}
            </Typography>
            <Typography paragraph margin={0}>
              ${MOCK_BEER.price}
            </Typography>
            <Typography paragraph margin={0}>
              `Stars`{' '}
              <Link component="a" href="#">
                100 {t('review:reviews')}
              </Link>
            </Typography>
            <Box display="flex">
              <NumericStepper size="large" />
            </Box>
            <Box display="flex" marginTop={theme => theme.spacing(1)}>
              <Button variant="contained">{t('cart:Add-to-cart')}</Button>
            </Box>
          </Stack>
          <MuiLink component={RouterLink} to="../">
            List
          </MuiLink>
        </Box>
      </Stack>
    </Container>
  );
};

export default IdPage;
