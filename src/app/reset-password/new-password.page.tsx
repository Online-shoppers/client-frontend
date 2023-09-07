import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/lab/LoadingButton';
import {
  Alert,
  Box,
  Container,
  FormControl,
  FormHelperText,
  Snackbar,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { getErrorMessages } from 'utils/get-error-messages.util';

import { changePassword } from './api/change-password.api';
import { newPasswordSchema } from './schemas/new-password.schema';

const useStyles = makeStyles(() => ({
  parent: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'stretch',
  },

  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },

  form: { display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' },
}));

const NewPassword = () => {
  const { resetToken } = useParams();
  const classes = useStyles();

  const navigate = useNavigate();

  const { t } = useTranslation('auth');

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(newPasswordSchema),
  });

  const [loading, setLoading] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  const closeAlert = () => {
    setAlertOpen(false);
  };

  if (!resetToken) {
    return <Navigate to="./.." replace />;
  }

  const handleChangePassword = handleSubmit(async form => {
    try {
      setLoading(true);
      await changePassword(resetToken, form.password);

      navigate('/auth/sign-in', { replace: true });
    } catch (err) {
      console.error(err);

      const messages = getErrorMessages(err);
      const text = messages ? messages[0] : t('errors:Something-went-wrong');
      setAlertOpen(true);
      setAlertText(text);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Container maxWidth="xs" className={classes.parent}>
      <Box className={classes.box} gap={3}>
        <Box component="form" className={classes.form} onSubmit={handleChangePassword}>
          <Controller
            name="password"
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth>
                <TextField
                  {...field}
                  error={!!error}
                  margin="dense"
                  required
                  fullWidth
                  label={t('Password')}
                  type="password"
                />
                {error ? <FormHelperText error={!!error}>{error.message}</FormHelperText> : null}
              </FormControl>
            )}
            control={control}
          />
          <Controller
            name="passwordConfirm"
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth>
                <TextField
                  {...field}
                  error={!!error}
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  label={t('Confirm-password')}
                  type="password"
                />
                {error ? <FormHelperText error={!!error}>{error.message}</FormHelperText> : null}
              </FormControl>
            )}
            control={control}
          />
          <button hidden type="submit" />
        </Box>
        <Box display="flex" flexDirection="column" width="100%" gap={1}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleChangePassword}
            disabled={!isValid}
            loading={loading}
          >
            {t('Change-password')}
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert variant="filled" severity="error">
          {alertText}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NewPassword;
