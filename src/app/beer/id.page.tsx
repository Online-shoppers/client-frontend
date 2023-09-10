import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/lab/LoadingButton';
import { Alert, Rating, Skeleton, Snackbar, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { getIsAuthenticated, getUserId } from 'app/auth/store/auth.selectors';
import { addProductReview } from 'app/product/api/add-product-review.api';
import { addProductToCart } from 'app/product/api/add-product-to-cart.api';
import { getProductReviews } from 'app/product/api/get-product-reviews.api';
import ProductReview from 'app/product/components/product-review.component';
import { createProductReviewSchema } from 'app/product/schemas/create-product-review.schema';
import { CreateProductReviewForm } from 'app/product/types/create-product-review-form.type';

import NumericStepper from 'components/numeric-stepper.component';

import { getErrorMessages } from 'utils/get-error-messages.util';

import { getBeerById } from './api/get-beer-by-id.api';

const IdPage = () => {
  const { t } = useTranslation(['cart', 'review']);

  const [amount, setAmount] = useState(1);

  const queryClient = useQueryClient();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isAuthenticated = useSelector(getIsAuthenticated);
  const userId = useSelector(getUserId);

  const { id } = useParams();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting: isPostingReview },
  } = useForm<CreateProductReviewForm>({
    resolver: yupResolver(createProductReviewSchema),
    defaultValues: {
      text: '',
      rating: 0,
    },
  });

  const beerQuery = useQuery({
    retry: false,
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
      reset();
    },
  });

  const data = beerQuery.data;

  const isReviewed = reviewsQuery.data?.some(review => review.userId === userId);
  const reviewsDisabled = isReviewed || reviewsQuery.isLoading;

  const onChangeAmount = (newAmount: number) => {
    setAmount(newAmount);
  };

  const closeError = () => {
    setIsError(false);
  };

  const addReview = handleSubmit(async form => {
    try {
      await reviewMutation.mutateAsync(form);
    } catch (err) {
      console.error(err);

      const messages = getErrorMessages(err);
      const text = messages ? messages[0] : t('errors:Something-went-wrong');
      setIsError(true);
      setErrorMessage(text);
    }
  });

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      await addProductToCart(data?.id || '', amount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      queryClient.invalidateQueries(['cart-info']);
      queryClient.invalidateQueries(['cart-products']);
    },
  });

  const onAddToCart = async () => {
    try {
      await addToCartMutation.mutateAsync();
    } catch (err) {
      console.error(err);

      const messages = getErrorMessages(err);
      const text = messages ? messages[0] : t('errors:Something-went-wrong');
      setIsError(true);
      setErrorMessage(text);
    }
  };

  if (!beerQuery.isLoading && beerQuery.isError) {
    return <Navigate to="/beer" />;
  }

  const ableToAddReview = !reviewsDisabled && isValid;
  const ableToAddToCart = isAuthenticated && !beerQuery.isLoading;

  return (
    <Container>
      <Stack direction="column" gap="2rem">
        {data ? (
          <Stack
            display="flex"
            direction="row"
            gap={theme => theme.spacing(5)}
            data-testid="beer-id-info"
          >
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
                  {data.name}
                </Typography>
                <Typography paragraph margin={0}>
                  {data.description}
                </Typography>
                <Typography paragraph margin={0}>
                  {'$' + data.price}
                </Typography>
                <Box display="flex" alignItems="center" gap="1rem">
                  <Rating value={data.rating} precision={0.5} readOnly />
                  <Typography>
                    {data.reviews_amount} {t('reviews:of-reviews')}
                  </Typography>
                </Box>
                <Box display="flex">
                  <NumericStepper size="large" value={amount} min={1} onChange={onChangeAmount} />
                </Box>
                <Box display="flex" marginTop={theme => theme.spacing(1)}>
                  <Button
                    loading={addToCartMutation.isLoading}
                    disabled={!ableToAddToCart}
                    variant="contained"
                    onClick={onAddToCart}
                  >
                    {t('cart:Add-to-cart')}
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Stack>
        ) : (
          <BeerInfoSkeleton />
        )}

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
              <Stack
                gap="0.5rem"
                component="form"
                onSubmit={addReview}
                data-testid="new-review-form"
              >
                <Controller
                  name="text"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      // disabled={reviewsDisabled}
                      multiline
                      placeholder={t('reviews:Leave-your-review')}
                      inputProps={{
                        'data-testid': 'review-input',
                      }}
                      // InputProps={{
                      //   inputProps: {
                      //     'data-testid': 'review-input',
                      //   },
                      // }}
                      // inputProps={{
                      //   'data-testid': 'review-input',
                      // }}
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
                        data-testid="review-rating"
                      />
                    )}
                    control={control}
                  />
                  <Button
                    loading={isPostingReview}
                    disabled={!ableToAddReview}
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

const BeerInfoSkeleton = () => {
  const { t } = useTranslation(['cart', 'review']);

  return (
    <Stack
      display="flex"
      direction="row"
      gap={theme => theme.spacing(5)}
      data-testid="beer-id-info-skeleton"
    >
      <Box flex={3}>
        <Skeleton variant="rectangular" width="100%" sx={{ minHeight: '500px' }} />
      </Box>
      <Box flex={4}>
        <Stack gap={theme => theme.spacing(1)}>
          <Typography variant="h4" component="h1">
            <Skeleton width="100%" />
          </Typography>
          <Typography paragraph margin={0}>
            <React.Fragment>
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
            </React.Fragment>
          </Typography>
          <Typography paragraph margin={0}>
            <Skeleton width={40} />
          </Typography>
          <Box display="flex" alignItems="center" gap="1rem">
            <Skeleton width="25%" />
            <Skeleton width="25%" />
          </Box>
          <Box display="flex">
            <NumericStepper size="large" value={1} min={1} onChange={() => {}} />
          </Box>
          <Box display="flex" marginTop={theme => theme.spacing(1)}>
            <Button disabled variant="contained">
              {t('cart:Add-to-cart')}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};
