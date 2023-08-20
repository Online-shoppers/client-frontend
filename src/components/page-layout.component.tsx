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
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink as RouterLink } from 'react-router-dom';

import UserMenu from './user-menu.component';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    flex: 1,
    marginTop: theme.spacing(5),
  },

  logo: {
    color: theme.palette.primary.main,
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.getContrastText(theme.palette.background.paper),
    '&.active': {
      color: theme.palette.primary.light,
    },
  },
}));

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const ref = useRef<HTMLButtonElement>(null);

  const { t } = useTranslation();

  const classes = useStyles();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(current => !current);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Stack spacing={5} direction="row" width="100%" alignItems="center">
            <Typography variant="h6" color="inherit" className={classes.logo}>
              {t('title')}
            </Typography>

            <Stack spacing={2} direction="row" justifyContent="space-around">
              <MuiLink component={RouterLink} to="/beer" className={classes.link}>
                {t('navigation.Beer')}
              </MuiLink>
              <MuiLink component={RouterLink} to="/snacks" className={classes.link}>
                {t('navigation.Snacks')}
              </MuiLink>
              <MuiLink component={RouterLink} to="/accessories" className={classes.link}>
                {t('navigation.Accessories')}
              </MuiLink>
            </Stack>

            <Box sx={{ flexBasis: 400, marginLeft: 'auto !important' }}>
              <Input color="primary" placeholder={t('Search')} fullWidth />
            </Box>

            <IconButton ref={ref} onClick={toggleMenu} onMouseLeave={closeMenu}>
              <PersonIcon />
              <UserMenu anchorEl={ref.current} open={menuOpen} />
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
