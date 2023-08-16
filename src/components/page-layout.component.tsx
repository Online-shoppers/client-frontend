import PersonIcon from '@mui/icons-material/Person';
import {
  AppBar,
  Box,
  IconButton,
  Input,
  Link as MuiLink,
  Stack,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    color: theme.palette.primary.main,
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.getContrastText(theme.palette.background.paper),
  },
  main: {
    flex: 1,
  },
}));

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Stack spacing={5} direction="row" width="100%" alignItems="center">
            <Typography variant="h6" color="inherit" className={classes.logo}>
              Yummy Beer
            </Typography>

            <Stack spacing={2} direction="row" justifyContent="space-around">
              <MuiLink component={RouterLink} to="/beer" className={classes.link}>
                Beer
              </MuiLink>
              <MuiLink component={RouterLink} to="/snacks" className={classes.link}>
                Snacks
              </MuiLink>
              <MuiLink component={RouterLink} to="/accessories" className={classes.link}>
                Accessories
              </MuiLink>
            </Stack>

            <Box sx={{ flexBasis: 400, marginLeft: 'auto !important' }}>
              <Input color="primary" placeholder="Search" fullWidth />
            </Box>

            <IconButton>
              <PersonIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>{children}</main>
      {/* Footer */}
    </React.Fragment>
  );
};

export default PageLayout;
