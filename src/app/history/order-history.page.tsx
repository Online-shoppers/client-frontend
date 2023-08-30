import { Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import { DEFAULT_DATE_FORMAT } from 'dates/formats';
import dayjs from 'dayjs';

import { getUserOrders } from 'app/order/api/get-user-orders.api';

import PreviousOrder from './components/previous-order.component';

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

  const getDateText = (seconds: number) => {
    return dayjs(seconds)
      .format(DEFAULT_DATE_FORMAT)
      .replace(/(^[ЁёА-Яa-я])/g, m => m.toUpperCase());
  };

  return (
    <Container maxWidth="xl">
      <Stack gap="1rem">{data?.map(order => <PreviousOrder key={order.id} order={order} />)}</Stack>
    </Container>
  );
};

export default OrderHistoryPage;
