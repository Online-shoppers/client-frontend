import { Box, Paper, Rating, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_PRODUCT = {
  id: 'string-string-string-string',
  created: 'created-date',
  updated: 'updated-date',
  name: 'Beer name',
  description:
    'Our Peanut Butter Milk Stout is simply irresistible. It’s like dark chocolate Reese’s in a glass! Rolled oats and Lactose add to the creamy body of this beer while heavenly aromas of roasted buttery peanuts and chocolate greet you with every sip. Try this out with a scoop of vanilla ice cream for a real treat!',
  image:
    'https://craftshack.com/cdn/shop/products/Belching-Beaver-Peanut-Butter-Milk-Stout-12OZ-CAN_375x.jpg?v=1642715128',
  category: 'beer',
  price: 100,
  quantity: 447,
  archived: false,
};

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
    <Paper className={classes.parent} onClick={openProductPage}>
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

export default ProductCard;
