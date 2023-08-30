import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import { DEFAULT_DATE_FORMAT } from 'dates/formats';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { getUserOrders } from 'app/order/api/get-user-orders.api';

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 1200,
  },
}));

const OrderHistoryPage = () => {
  const { t } = useTranslation();

  const classes = useStyles();

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
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell width="200px">{t('Created')}</TableCell>
              <TableCell width="200px">{t('Updated')}</TableCell>
              <TableCell width="150px">{t('order:Country')}</TableCell>
              <TableCell>{t('order:City')}</TableCell>
              <TableCell>{t('order:Address')}</TableCell>
              <TableCell width="120px">{t('order:Zip-code')}</TableCell>
              <TableCell>{t('order:Phone')}</TableCell>
              <TableCell width="190px">{t('order:Status')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(row => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{getDateText(row.created)}</TableCell>
                <TableCell>{getDateText(row.updated)} </TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.zipCode}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{t(`order:statuses.${row.status}`)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrderHistoryPage;
