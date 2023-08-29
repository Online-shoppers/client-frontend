import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/lab/LoadingButton';
import { Alert, Rating, Skeleton, Snackbar, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { getIsAuthenticated, getUserId } from 'app/auth/store/auth.selectors';
import { addProductReview } from 'app/product/api/add-product-review.api';
import { getProductReviews } from 'app/product/api/get-product-reviews.api';
import ProductReview from 'app/product/components/product-review.component';
import { createProductReviewSchema } from 'app/product/schemas/create-product-review.schema';
import { CreateProductReviewForm } from 'app/product/types/create-product-review-form.type';

import NumericStepper from 'components/numeric-stepper.component';

import { DefaultError } from 'errors/default.error';

import { getBeerById } from './api/getBeerById.api';

const IdPage = () => {
  const { t } = useTranslation(['cart', 'review']);

  const queryClient = useQueryClient();

  const [isPostingReview, setIsPostingReview] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isAuthenticated = useSelector(getIsAuthenticated);
  const userId = useSelector(getUserId);

  const { id } = useParams();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreateProductReviewForm>({
    resolver: yupResolver(createProductReviewSchema),
    defaultValues: {
      text: '',
      rating: 0,
    },
  });

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

  const reviewMutation = useMutation({
    mutationFn: (form: CreateProductReviewForm) =>
      addProductReview(data?.id as string, userId, form),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', id] });
      queryClient.invalidateQueries({ queryKey: ['beer', id] });
    },
  });

  const data = beerQuery.data;

  const isReviewed = reviewsQuery.data?.some(review => review.userId === userId);
  const reviewsDisabled = isReviewed || reviewsQuery.isLoading;

  const closeError = () => {
    setIsError(false);
  };

  const addReview = handleSubmit(async form => {
    if (!data) {
      setIsError(true);
      setErrorMessage('You are not authorized');
      return;
    }

    try {
      setIsPostingReview(true);
      await reviewMutation.mutateAsync(form);
    } catch (err) {
      console.error(err);

      if (isAxiosError<DefaultError>(err)) {
        setIsError(true);
        setErrorMessage(err.response?.data.message || err.message);
      } else {
        setIsError(true);
        setErrorMessage(t('errors:Something-went-wrong'));
      }
    } finally {
      setIsPostingReview(false);
    }
  });

  if (!beerQuery.isLoading && beerQuery.error) {
    return <Navigate to="/beer" />;
  }

  // "Reviews": "Отзывы",
  // "Leave-your-review": "Оставьте свой отзыв",
  // "Leave-review": "Оставить отзыв"

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
                    {data?.reviews_amount} {t('reviews:of-reviews')}
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
              {t('reviews:Reviews')}
            </Typography>
            <Stack gap="0.5rem">
              {reviewsQuery.data?.map(review => (
                <ProductReview
                  key={review.id}
                  userName={review.userName}
                  text={review.text}
                  rating={review.rating}
                  userId={review.userId}
                  edited={review.edited}
                />
              ))}
            </Stack>

            {isAuthenticated ? (
              <Stack gap="0.5rem" component="form" onSubmit={addReview}>
                <Controller
                  name="text"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled={reviewsDisabled}
                      multiline
                      placeholder={t('reviews:Leave-your-review')}
                    />
                  )}
                  control={control}
                />
                <Box display="flex" justifyContent="space-between">
                  <Controller
                    name="rating"
                    render={({ field }) => (
                      <Rating
                        {...field}
                        disabled={reviewsDisabled}
                        onChange={(_, value) => {
                          field.onChange(value ?? 0);
                        }}
                      />
                    )}
                    control={control}
                  />
                  <Button
                    loading={isPostingReview}
                    disabled={reviewsDisabled || !isValid}
                    variant="contained"
                    type="submit"
                  >
                    {t('reviews:Leave-review')}
                  </Button>
                </Box>
              </Stack>
            ) : null}
          </Stack>
        </Container>
      </Stack>
      <Snackbar
        open={isError}
        autoHideDuration={5000}
        onClose={closeError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert variant="filled" severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default IdPage;
