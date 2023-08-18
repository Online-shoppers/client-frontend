import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

const ListPage = () => {
  return (
    <Container>
      <Box>List</Box>
      <MuiLink component={RouterLink} to="./id">
        Item
      </MuiLink>
    </Container>
  );
};

export default ListPage;
