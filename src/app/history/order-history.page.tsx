import { Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import { DEFAULT_DATE_FORMAT } from 'dates/formats';
import dayjs from 'dayjs';
import React from 'react';

import { getUserOrders } from 'app/order/api/get-user-orders.api';

import PreviousOrder, { PreviousOrderSkeleton } from './components/previous-order.component';

const OrderHistoryPage = () => {
  const ordersQuery = useQuery({
    refetchOnMount: true,
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await getUserOrders();
      return response.data;
    },
  });
  const data = ordersQuery.data;

  return (
    <Container maxWidth="xl">
      <Stack gap="1rem">
        {data ? (
          data.map(order => <PreviousOrder key={order.id} order={order} />)
        ) : (
          <React.Fragment>
            <PreviousOrderSkeleton />
            <PreviousOrderSkeleton />
            <PreviousOrderSkeleton />
            <PreviousOrderSkeleton />
            <PreviousOrderSkeleton />
          </React.Fragment>
        )}
      </Stack>
    </Container>
  );
};

export default OrderHistoryPage;
