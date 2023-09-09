import { Paper, Skeleton, Typography } from '@mui/material';
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

  price: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
}));

interface PreviousOrderProps {
  order: OrderType;
}

const PreviousOrder: React.FC<PreviousOrderProps> = ({ order }) => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <Paper className={classes.paper} data-testid="previous-order" spellCheck>
      <Stack gap="1rem" direction="column">
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>
              {t('order:Order-ID')}: {order.id}
            </Typography>
            <Typography className={classes.price}>${order.total}</Typography>
          </Stack>
          <Typography>{t(`order:statuses.${order.status}`)}</Typography>
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

export const PreviousOrderSkeleton = () => {
  const classes = useStyles();

  const amount = Math.ceil((Math.random() * 10) % 3);

  const items = Array(amount).fill(true);

  return (
    <Paper className={classes.paper} data-testid="previous-order-skeleton">
      <Stack gap="1rem" direction="column">
        <Stack>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Stack>

        {items.map((_, idx) => (
          <Box key={idx}>
            <Stack gap={3} direction="row" width="100%">
              <Box flexBasis={80} width="100%">
                <Skeleton width="100%" height="80px" variant="rectangular" />
              </Box>

              <Stack width="100%">
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default PreviousOrder;
