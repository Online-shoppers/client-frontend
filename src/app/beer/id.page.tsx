import { Button, Rating, Skeleton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';

import { getProductReviews } from 'app/product/api/get-product-reviews.api';
import ProductReview from 'app/product/components/product-review.component';

import NumericStepper from 'components/numeric-stepper.component';

import { getBeerById } from './api/getBeerById.api';

const IdPage = () => {
  const { t } = useTranslation(['cart', 'review']);

  const { id } = useParams();

  const beerQuery = useQuery({
    queryKey: ['beer', id],
    queryFn: async () => {
      const response = await getBeerById(id);
      return response.data;
    },
  });

  const reviewsQuery = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const response = await getProductReviews(id);
      return response.data;
    },
  });

  const data = beerQuery.data;

  if (!beerQuery.isLoading && beerQuery.error) {
    return <Navigate to="/beer" />;
  }

  return (
    <Container>
      <Stack direction="column" gap="2rem">
        <Stack display="flex" direction="row" gap={theme => theme.spacing(5)}>
          <Box flex={3}>
            {data?.image_url ? (
              <img src={data.image_url} alt="Beer" width="100%" />
            ) : (
              <Skeleton variant="rectangular" width="100%" sx={{ minHeight: '500px' }} />
            )}
          </Box>
          <Box flex={4}>
            <Stack gap={theme => theme.spacing(1)}>
              <Typography variant="h4" component="h1">
                {data?.name ? data.name : <Skeleton width="100%" />}
              </Typography>
              <Typography paragraph margin={0}>
                {data?.description ? (
                  data.description
                ) : (
                  <React.Fragment>
                    <Skeleton width="100%" />
                    <Skeleton width="100%" />
                    <Skeleton width="100%" />
                    <Skeleton width="100%" />
                    <Skeleton width="100%" />
                  </React.Fragment>
                )}
              </Typography>
              <Typography paragraph margin={0}>
                {typeof data?.price === 'number' ? '$' + data.price : <Skeleton width={40} />}
              </Typography>
              <Box display="flex" alignItems="center" gap="1rem">
                {typeof data?.rating === 'number' ? (
                  <Rating value={data?.rating} precision={0.5} readOnly />
                ) : (
                  <Skeleton width="25%" />
                )}
                {typeof data?.reviews_amount === 'number' ? (
                  <Typography>
                    {data?.reviews_amount} {t('review:reviews')}
                  </Typography>
                ) : (
                  <Skeleton width="25%" />
                )}
              </Box>
              <Box display="flex">
                <NumericStepper size="large" />
              </Box>
              <Box display="flex" marginTop={theme => theme.spacing(1)}>
                <Button disabled={beerQuery.isLoading} variant="contained">
                  {t('cart:Add-to-cart')}
                </Button>
              </Box>
            </Stack>
          </Box>
        </Stack>

        <Container maxWidth="md">
          <Stack direction="column" gap="1rem">
            <Typography variant="h5" component="h2">
              Reviews
            </Typography>
            <Stack gap="0.5rem">
              {reviewsQuery.data?.map(review => (
                <ProductReview
                  key={review.id}
                  summary={review.summary}
                  text={review.text}
                  rating={review.rating}
                  userId={review.userId}
                  edited={review.edited}
                />
              ))}
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </Container>
  );
};

export default IdPage;
