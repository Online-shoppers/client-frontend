import PersonIcon from '@mui/icons-material/Person';
import { Box, Paper, Rating, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  userImage: {
    marginRight: '1rem',
    maxWidth: 30,
  },

  stack: {
    display: 'flex',
    alignItems: 'baseline',
  },
}));

interface ProductReviewProps {
  imageUrl?: string;
  text: string;
  rating: number;
  userName: string;
  userId: string;
  edited: boolean;
}

const ProductReview: React.FC<ProductReviewProps> = ({
  imageUrl = '',
  userName,
  text,
  rating,
  edited,
}) => {
  const classes = useStyles();

  return (
    <Paper>
      <Stack direction="row" width="100%" padding="1rem">
        <Box>
          {imageUrl ? (
            <img src={imageUrl} alt="user avatar" className={classes.userImage} />
          ) : (
            <PersonIcon className={classes.userImage} />
          )}
        </Box>
        <Stack direction="column" flex={1}>
          <Typography>{userName}</Typography>
          <Typography variant="body2" whiteSpace="pre-wrap">
            {text}
          </Typography>
        </Stack>
        <Box>
          <Rating value={rating} precision={0.5} readOnly></Rating>
          {edited ? <Typography variant="caption">edited</Typography> : null}
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProductReview;
