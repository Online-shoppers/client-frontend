import { Paper, Typography } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { OrderType } from 'app/order/types/order.type';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '1rem',
  },
}));

interface PreviousOrderProps {
  order: OrderType;
}

const PreviousOrder: React.FC<PreviousOrderProps> = ({ order }) => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <Paper className={classes.paper}>
      <Stack gap="1rem" direction="column">
        <Stack direction="row" justifyContent="space-between">
          <Typography>
            {t('order:Order-ID')}: {order.id}
          </Typography>
          <Typography>${order.total}</Typography>
        </Stack>

        {order.products.map(product => (
          <Box key={product.id}>
            <Stack gap={3} direction="row">
              <Box
                flexBasis={80}
                component={RouterLink}
                to={`/${product.category}/${product.productId}`}
              >
                <img src={product.imageUrl} alt={product.name} width="100%" />
              </Box>

              <Stack>
                <MuiLink component={RouterLink} to={`/${product.category}/${product.productId}`}>
                  {product.name}
                </MuiLink>
                <Typography>${product.price}</Typography>
              </Stack>

              <Box flex={1} />

              <Typography>{product.quantity + t('pc')}</Typography>
              <Typography>${product.price * product.quantity}</Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default PreviousOrder;
