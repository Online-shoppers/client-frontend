import { Masonry } from '@mui/lab';
import {
  Box,
  Button,
  Drawer,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ProductCard from 'components/product-card.component';

import { getPageBeer } from './api/getPageBeer.api';

const PAGE_SIZE = 20;

const PARAM_PAGE = 'page';
const PARAM_SEARCH = 'search';
const PARAM_SORTING = 'sorting';

const useStyles = makeStyles(() => ({
  pagination: {
    '& > .MuiPagination-ul': {
      justifyContent: 'center',
    },
  },
}));

const ListPage = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { search: urlSearchString, pathname } = useLocation();
  const params = new URLSearchParams(urlSearchString);
  const navigate = useNavigate();

  const page = Number(params.get(PARAM_PAGE)) || 1;
  const sorting = params.get(PARAM_SORTING) || '';
  const search = params.get(PARAM_SEARCH) || '';

  const beerQuery = useQuery({
    queryKey: ['page-beer', page],
    queryFn: async () => {
      const response = await getPageBeer(page, PAGE_SIZE);
      return response.data;
    },
  });

  const openFilters = () => {
    setFiltersOpen(true);
  };

  const closeFilters = () => {
    setFiltersOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onChangePage = useCallback(
    (newPage: number) => {
      const newParams = new URLSearchParams(urlSearchString);
      newParams.set(PARAM_PAGE, newPage.toString());

      // scrollToTop();
      navigate(`${pathname}?${newParams.toString()}`);
    },
    [pathname, urlSearchString],
  );

  useEffect(() => {
    const newParams = new URLSearchParams();

    newParams.append(PARAM_PAGE, page.toString());
    if (search) newParams.append(PARAM_SEARCH, search);
    // reset({ search });

    navigate(`${pathname}?${newParams.toString()}`, { replace: true });
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [urlSearchString]);

  const totalPages = Math.ceil((beerQuery.data?.info.total || 0) / PAGE_SIZE);

  const classes = useStyles();

  return (
    <Container>
      <Stack gap="1rem">
        <Box display="flex" flexDirection="row">
          <Typography component="h1" variant="h4">
            Beer
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
          {beerQuery.data
            ? beerQuery.data.items.map(item => (
                <ProductCard
                  key={item.id}
                  title={item.name}
                  price={item.price}
                  rating={item.rating}
                  imageUrl={item.image_url}
                  href={location.pathname.concat('/', item.id)}
                />
              ))
            : false}
        </Masonry>
        <Pagination count={totalPages} color="primary" className={classes.pagination} />
      </Stack>

      <Drawer open={filtersOpen} onClose={closeFilters} anchor="right">
        <Typography variant="h5">Filters</Typography>
      </Drawer>
    </Container>
  );
};

export default ListPage;
