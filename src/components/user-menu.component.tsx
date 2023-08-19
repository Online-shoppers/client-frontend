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
    padding: '10px',
  },
}));

const links = [
  { text: 'Cart', href: '/cart' },
  { text: 'Order history', href: '/order' },
];

interface UserMenuProps {
  open: boolean;
  anchorEl?: Element | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ open, anchorEl }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const classes = useStyles();

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
          aria-label="Platform"
        >
          <ToggleButton value="en">English</ToggleButton>
          <ToggleButton value="ru">Russian</ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </Popper>
  );
};

export default UserMenu;
