import { Masonry } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import CategoryCard from 'components/category-card.component';

const HomePage = () => {
  return (
    <Container>
      <Stack gap="1rem">
        <Box textAlign="center">
          <Typography component="h1" variant="h4">
            Welcome to Beer Haven!
          </Typography>
        </Box>

        <Typography component="p" variant="body1">
          At Beer Haven, we have created a haven for true beer and snack connoisseurs. Our goal is
          to provide you with the widest selection of beer varieties, exquisite snacks, and quality
          accessories for an authentic beer experience.
        </Typography>

        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography component="h2" variant="h5">
            Categories
          </Typography>
          <Box flex={1} />
        </Box>

        <Masonry columns={3} spacing={10}>
          <CategoryCard category="beer" />
          <CategoryCard category="snacks" />
          <CategoryCard category="accessories" />
        </Masonry>
      </Stack>
    </Container>
  );
};

export default HomePage;
