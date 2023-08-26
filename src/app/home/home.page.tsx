import { Box, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import PageLayout from 'components/page-layout.component';

import CategoryCard from './components/category-card.component';

const HomePage = () => {
  return (
    <PageLayout>
      <Container>
        <Stack gap="1rem">
          <Box textAlign="center">
            <Typography component="h1" variant="h4">
              Welcome to Yummy Beer!
            </Typography>
          </Box>

          <Typography component="p" variant="body1">
            At Yummy Beer, we have created a haven for true beer and snack connoisseurs. Our goal is
            to provide you with the widest selection of beer varieties, exquisite snacks, and
            quality accessories for an authentic beer experience.
          </Typography>

          <Stack direction="row" gap={5}>
            <CategoryCard category="beer" />
            <CategoryCard category="snacks" />
            <CategoryCard category="accessories" />
          </Stack>
        </Stack>
      </Container>
    </PageLayout>
  );
};

export default HomePage;
