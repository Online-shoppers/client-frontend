import { Box, Paper, Rating, Stack, Typography } from '@mui/material';
import React from 'react';

interface ProductReviewProps {
  summary: string;
  text: string;
  rating: number;
  userId: string;
  edited: boolean;
}

const ProductReview: React.FC<ProductReviewProps> = ({ summary, text, rating, edited }) => {
  return (
    <Paper>
      <Stack direction="row" width="100%" padding="1rem">
        <Stack direction="column" flex={1}>
          <Typography>{summary}</Typography>
          <Typography variant="body2">{text}</Typography>
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
