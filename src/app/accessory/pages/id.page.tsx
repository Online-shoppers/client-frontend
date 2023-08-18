import { Button, Link, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

import NumericStepper from 'components/numeric-stepper';

const MOCK_ACCESSORY = {
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
};

const IdPage = () => {
  return (
    <Container>
      <Stack display="flex" direction="row" gap={theme => theme.spacing(5)}>
        <Box flex={3}>
          <img src={MOCK_ACCESSORY.image} alt="Accessory" width="100%" />
        </Box>
        <Box flex={4}>
          <Stack gap={theme => theme.spacing(1)}>
            <Typography variant="h4" component="h1">
              {MOCK_ACCESSORY.name}
            </Typography>
            <Typography paragraph margin={0}>
              {MOCK_ACCESSORY.description}
            </Typography>
            <Typography paragraph margin={0}>
              ${MOCK_ACCESSORY.price}
            </Typography>
            <Typography paragraph margin={0}>
              `Stars`{' '}
              <Link component="a" href="#">
                100 reviews
              </Link>
            </Typography>
            <Box display="flex">
              <NumericStepper />
            </Box>
            <Box display="flex" marginTop={theme => theme.spacing(1)}>
              <Button variant="contained">Add to cart</Button>
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
