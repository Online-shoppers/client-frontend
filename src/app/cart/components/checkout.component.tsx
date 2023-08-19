import { Button, Paper, Stack, Typography } from '@mui/material';

const Checkout = () => {
  return (
    <Paper>
      <Stack padding="10px" gap={theme => theme.spacing(1)}>
        <Typography variant="h6">Checkout</Typography>
        <Stack direction="row">
          <Typography variant="subtitle1">5 items: </Typography>
          <Typography variant="subtitle1" marginLeft="auto">
            $100
          </Typography>
        </Stack>
        <Button variant="contained">Buy now</Button>
      </Stack>
    </Paper>
  );
};

export default Checkout;
