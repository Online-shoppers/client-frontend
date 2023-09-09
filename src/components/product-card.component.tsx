import { Box, Paper, Rating, Skeleton, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  parent: {
    maxWidth: '100%',
    cursor: 'pointer',
  },

  image: {
    width: '100%',
  },

  info: {
    padding: '0.5rem',
  },
}));

interface ProductCardProps {
  title: string;
  price: number;
  rating: number;
  imageUrl: string;
  href: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, rating, imageUrl, href }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const openProductPage = () => {
    navigate(href);
  };

  return (
    <Paper className={classes.parent} onClick={openProductPage} data-testid="product-card">
      <Stack direction="column">
        <img src={imageUrl} alt={title} className={classes.image} />
        <Box
          className={classes.info}
          gap={theme => theme.spacing(0)}
          display="flex"
          flexDirection="column"
        >
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle1">${price}</Typography>
          <Rating value={rating} precision={0.5} readOnly />
        </Box>
      </Stack>
    </Paper>
  );
};

export const ProductCardSkeleton = () => {
  const classes = useStyles();

  const minHeight = 170;
  const maxHeight = 400;

  const generateHeight = () => {
    const delta = maxHeight - minHeight;
    return minHeight + Math.random() * delta;
  };

  const height = generateHeight();

  return (
    <Paper data-testid="product-card-skeleton">
      <Stack direction="column">
        <Skeleton className={classes.image} variant="rectangular" height={height} />
        <Box
          className={classes.info}
          gap={theme => theme.spacing(0)}
          display="flex"
          flexDirection="column"
        >
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Rating readOnly />
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProductCard;
