import PersonIcon from '@mui/icons-material/Person';
import {
  AppBar,
  Badge,
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  Link as MuiLink,
  Stack,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink as RouterLink } from 'react-router-dom';

import { getIsAuthenticated } from 'app/auth/store/auth.selectors';
import { getCart } from 'app/cart/api/get-cart.api';

import SearchList from './search-list.component';
import UserMenu from './user-menu.component';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    flex: 1,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
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

const UserIcon = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(current => !current);
  };

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await getCart();
      return response.data;
    },
  });
  const cartData = cartQuery.data;

  const productsAmount = cartData?.products.length;

  return (
    <ClickAwayListener onClickAway={closeMenu} mouseEvent="onMouseDown">
      {/* box here is needed for click away logic */}
      <Box>
        <IconButton ref={buttonRef} onClick={toggleMenu}>
          <Badge badgeContent={productsAmount} color="primary" overlap="circular" variant="dot">
            <PersonIcon color="action" />
          </Badge>
        </IconButton>
        <UserMenu anchorEl={buttonRef.current} onClose={closeMenu} open={menuOpen} />
      </Box>
    </ClickAwayListener>
  );
};

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();

  const classes = useStyles();

  const isAuthenticated = useSelector(getIsAuthenticated);

  const handleChangeLanguage = (_: unknown, value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Stack spacing={5} direction="row" width="100%" alignItems="center">
            <Typography
              variant="h6"
              color="inherit"
              component={RouterLink}
              to="/"
              className={classes.logo}
            >
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
              <SearchList />
            </Box>

            <Stack direction="row" gap="1rem">
              <ToggleButtonGroup
                color="primary"
                size="small"
                value={i18n.language}
                exclusive
                onChange={handleChangeLanguage}
              >
                <ToggleButton value="en">En</ToggleButton>
                <ToggleButton value="ru">Ru</ToggleButton>
              </ToggleButtonGroup>
              {isAuthenticated ? (
                <UserIcon />
              ) : (
                <Button size="small" variant="contained" href="/auth/sign-in">
                  {t('auth:Do-sign-in')}
                </Button>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>{children}</main>
      {/* Footer */}
    </React.Fragment>
  );
};

export default PageLayout;
