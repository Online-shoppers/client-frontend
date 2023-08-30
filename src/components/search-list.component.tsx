import {
  Avatar,
  Box,
  ClickAwayListener,
  Input,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getPageProducts } from 'app/product/api/get-page-products.api';

const useStyles = makeStyles(() => ({
  paper: {
    padding: '1rem',
    width: 'auto',
    minWidth: '500px',
    maxHeight: '500px',
    overflowY: 'auto',
  },

  listItem: {
    marginLeft: '-1rem',
    marginRight: '-1rem',
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 0,
  },

  listItemText: {
    marginLeft: '1rem',
  },
}));

const SearchList = () => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');

  const popperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const page = 1;
  const size = 5;

  const productsQuery = useQuery({
    queryKey: ['search-products', name],
    queryFn: async () => {
      const response = await getPageProducts(page, size, { name });
      return response.data;
    },
  });

  const data = productsQuery.data;

  const { t } = useTranslation();

  const classes = useStyles();

  const onChangeName = (value: string) => {
    setName(value);
    openSearch();
  };

  const openSearch = () => {
    setModalOpen(true);
  };

  const closeSearch = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <ClickAwayListener onClickAway={closeSearch}>
        <Box>
          <Input
            ref={inputRef}
            color="primary"
            placeholder={t('Search')}
            fullWidth
            onFocus={openSearch}
            onChange={event => onChangeName(event.target.value)}
          />

          <Popper
            ref={popperRef}
            open={modalOpen}
            anchorEl={inputRef.current}
            placement="bottom-start"
          >
            <Paper className={classes.paper}>
              <Stack gap={1}>
                <Typography>Results</Typography>
                <List disablePadding>
                  {data?.items.map(product => (
                    <ListItemButton
                      key={product.id}
                      className={classes.listItem}
                      onClick={() => {
                        // flushSync needed to prevent scrollbar appearing in loading indicator
                        flushSync(closeSearch);
                        navigate(`/${product.category}/${product.id}`);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={product.image_url} sizes="100%" className={classes.avatar} />
                      </ListItemAvatar>
                      <ListItemText className={classes.listItemText}>{product.name}</ListItemText>
                    </ListItemButton>
                  ))}
                </List>
              </Stack>
            </Paper>
          </Popper>
        </Box>
      </ClickAwayListener>
    </React.Fragment>
  );
};

export default SearchList;
