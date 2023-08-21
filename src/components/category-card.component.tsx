import { Box, Paper, Rating, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_CATEGORY = {
  category: 'Category name',
  category_description:
    'Our beer is simply irresistible. It’s like dark chocolate Reese’s in a glass! ',
  category_image:
    'https://craftshack.com/cdn/shop/products/Belching-Beaver-Peanut-Butter-Milk-Stout-12OZ-CAN_375x.jpg?v=1642715128',
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

interface CategoryCardProps {
  category: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const openCategoryPage = () => {
    navigate(`/${category}`);
  };

  return (
    <Paper className={classes.parent} onClick={openCategoryPage}>
      <Stack direction="column">
        <img
          src={MOCK_CATEGORY.category_image}
          alt={MOCK_CATEGORY.category}
          className={classes.image}
        />
        <Box
          className={classes.info}
          gap={theme => theme.spacing(0)}
          display="flex"
          flexDirection="column"
        >
          <Typography variant="h6">{MOCK_CATEGORY.category}</Typography>
          <Rating readOnly />
        </Box>
      </Stack>
    </Paper>
  );
};

export default CategoryCard;
