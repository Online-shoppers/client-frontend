import { Masonry } from '@mui/lab';
import { Box, Button, Drawer, MenuItem, Select, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useState } from 'react';

import ProductCard from 'components/product-card.component';

const ListPage = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const openFilters = () => {
    setFiltersOpen(true);
  };

  const closeFilters = () => {
    setFiltersOpen(false);
  };

  return (
    <Container>
      <Stack gap="1rem">
        <Box display="flex" flexDirection="row">
          <Typography component="h1" variant="h4">
            Accessories
          </Typography>

          <Box flex={1} />

          <Stack gap="1rem" direction="row">
            <Select defaultValue="popular-first">
              <MenuItem value="popular-first">Start with popular</MenuItem>
            </Select>
            <Button variant="contained" onClick={openFilters}>
              Filters
            </Button>
          </Stack>
        </Box>

        <Masonry columns={4} spacing={2}>
          <ProductCard category="accessories" />
        </Masonry>
      </Stack>

      <Drawer open={filtersOpen} onClose={closeFilters} anchor="right">
        <Typography variant="h5">Filters</Typography>
      </Drawer>
    </Container>
  );
};

export default ListPage;
