import { Box, Paper, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  parent: {
    flex: 1,
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
  name: string;
  category: string;
  imageUrl: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, category, imageUrl }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const openCategoryPage = () => {
    navigate(`/${category}`);
  };

  return (
    <Paper className={classes.parent} onClick={openCategoryPage}>
      <Stack direction="column">
        <img src={imageUrl} alt={category} className={classes.image} />
        <Box className={classes.info}>
          <Typography variant="h6">{name}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default CategoryCard;
