import {
  Button,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { forwardRef } from 'react';
import { flushSync } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ACCESS_TOKEN_KEY, EXPIRATION_DATE_KEY, REFRESH_TOKEN_KEY } from 'app/auth/constants';
import { logout } from 'app/auth/store/auth.slice';

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
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const classes = useStyles();

  const links = [
    { text: t('navigation.Cart'), href: '/cart' },
    { text: t('navigation.Order-history'), href: '/order' },
  ];

  const handleChangeLanguage = (_: unknown, value: string) => {
    i18n.changeLanguage(value);
  };

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
              </ListItemButton>
            ))}
          </List>

          <ToggleButtonGroup
            color="primary"
            value={i18n.language}
            exclusive
            onChange={handleChangeLanguage}
          >
            <ToggleButton value="en" className={classes.languageButton}>
              {t('languages.English')}
            </ToggleButton>
            <ToggleButton value="ru" className={classes.languageButton}>
              {t('languages.Russian')}
            </ToggleButton>
          </ToggleButtonGroup>

          <Stack>
            <Button variant="contained" onClick={handleLogout}>
              Log Out
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Popper>
  );
});

UserMenu.displayName = 'UserMenu';

export default UserMenu;
