import {
  Badge,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Stack,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useQuery } from '@tanstack/react-query';
import { forwardRef } from 'react';
import { flushSync } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ACCESS_TOKEN_KEY, EXPIRATION_DATE_KEY, REFRESH_TOKEN_KEY } from 'app/auth/constants';
import { logout } from 'app/auth/store/auth.slice';
import { getCart } from 'app/cart/api/get-cart.api';

import storage from 'storage/client';

import { useAppDispatch } from 'store';

const useStyles = makeStyles(() => ({
  parent: {
    width: '100%',
    minWidth: '250px',
    position: 'relative',
    padding: '10px',
  },

  languageButton: {
    flex: 1,
  },
}));

interface UserMenuProps {
  open: boolean;
  onClose: () => void;
  anchorEl?: Element | null;
}

const UserMenu = forwardRef<HTMLDivElement, UserMenuProps>(({ open, onClose, anchorEl }, ref) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const classes = useStyles();

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await getCart();
      return response.data;
    },
  });
  const cartData = cartQuery.data;

  const productsAmount = cartData?.products.length;

  const links = [
    { text: t('navigation.Cart'), href: '/cart', notifications: productsAmount },
    { text: t('navigation.Order-history'), href: '/history/orders' },
  ];

  const handleLogout = () => {
    dispatch(logout());

    storage.remove(ACCESS_TOKEN_KEY);
    storage.remove(REFRESH_TOKEN_KEY);
    storage.remove(EXPIRATION_DATE_KEY);
  };

  return (
    <Popper ref={ref} open={open} anchorEl={anchorEl} placement="bottom-end">
      <Paper className={classes.parent}>
        <Stack gap={1}>
          <List disablePadding>
            {links.map(link => (
              <ListItemButton
                key={link.href}
                onClick={() => {
                  // flushSync needed to prevent scrollbar appearing in loading indicator
                  flushSync(() => {
                    onClose();
                  });

                  navigate(link.href);
                }}
              >
                <ListItemText>{link.text}</ListItemText>
                <Badge badgeContent={link.notifications} color="primary" />
              </ListItemButton>
            ))}
          </List>

          <Stack>
            <Button variant="contained" onClick={handleLogout}>
              {t('auth:Log-out')}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Popper>
  );
});

UserMenu.displayName = 'UserMenu';

export default UserMenu;
