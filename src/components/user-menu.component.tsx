import {
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
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  parent: {
    position: 'relative',
    padding: '10px',

    '&:before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'calc(100% + 15px)',
      height: 'calc(100% + 15px)',
    },
  },
}));

interface UserMenuProps {
  open: boolean;
  anchorEl?: Element | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ open, anchorEl }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const classes = useStyles();

  const links = [
    { text: t('navigation.Cart'), href: '/cart' },
    { text: t('navigation.Order-history'), href: '/order' },
  ];

  const handleChangeLanguage = (_: unknown, value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-end">
      <Paper className={classes.parent}>
        <Stack>
          <List>
            {links.map(link => (
              <ListItemButton key={link.href} onClick={() => navigate(link.href)}>
                <ListItemText>{link.text}</ListItemText>
              </ListItemButton>
            ))}
          </List>
        </Stack>

        <ToggleButtonGroup
          color="primary"
          value={i18n.language}
          exclusive
          onChange={handleChangeLanguage}
        >
          <ToggleButton value="en">{t('languages.English')}</ToggleButton>
          <ToggleButton value="ru">{t('languages.Russian')}</ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </Popper>
  );
};

export default UserMenu;
