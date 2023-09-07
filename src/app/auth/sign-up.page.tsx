import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/lab/LoadingButton';
import { Alert, FormControl, FormHelperText, Link as MuiLink, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink as RouterLink } from 'react-router-dom';

import storage from 'storage/client';

import { useAppDispatch } from 'store';

import { getErrorMessages } from 'utils/get-error-messages.util';

import { signUp } from './api/sign-up.api';
import { ACCESS_TOKEN_KEY, EXPIRATION_DATE_KEY, REFRESH_TOKEN_KEY } from './constants';
import { signUpSchema } from './schemas/sign-up.schema';
import { UserSessionSchema } from './schemas/user-session.schema';
import { authenticate } from './store/auth.slice';

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

const SignUp = () => {
  const { t } = useTranslation('auth');

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(signUpSchema),
  });

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const handleSignUp = handleSubmit(async form => {
    try {
      setLoading(true);
      const { data } = await signUp(form);

      const payload = jwt_decode(data.access_token);
      const session = UserSessionSchema.validateSync(payload);

      storage.set(ACCESS_TOKEN_KEY, data.access_token);
      storage.set(REFRESH_TOKEN_KEY, data.refresh_token);
      storage.set(EXPIRATION_DATE_KEY, session.exp);

      dispatch(authenticate(session));
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
    <Container component="main" maxWidth="xs" className={classes.parent}>
      <Box className={classes.box} gap={3}>
        <Typography component="h1" variant="h5">
          {t('Sign-up')}
        </Typography>
        <Box component="form" className={classes.form} onSubmit={handleSignUp}>
          <Controller
            name="firstName"
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth>
                <TextField
                  {...field}
                  error={!!error}
                  margin="dense"
                  required
                  fullWidth
                  label={t('First-name')}
                />
                {error ? <FormHelperText error={!!error}>{error.message}</FormHelperText> : null}
              </FormControl>
            )}
            control={control}
          />

          <Controller
            name="lastName"
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth>
                <TextField
                  {...field}
                  error={!!error}
                  margin="dense"
                  required
                  fullWidth
                  label={t('Last-name')}
                />
                {error ? <FormHelperText error={!!error}>{error.message}</FormHelperText> : null}
              </FormControl>
            )}
            control={control}
          />

          <Controller
            name="email"
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth>
                <TextField
                  {...field}
                  error={!!error}
                  margin="dense"
                  required
                  fullWidth
                  label={t('Email')}
                />
                {error ? <FormHelperText error={!!error}>{error.message}</FormHelperText> : null}
              </FormControl>
            )}
            control={control}
          />

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
            disabled={!isValid}
            onClick={handleSignUp}
            loading={loading}
          >
            {t('Sign-up')}
          </Button>
          <Typography variant="subtitle1">
            {t('Already-have-an-account?')}{' '}
            <MuiLink component={RouterLink} to="/auth/sign-in">
              {t('Do-sign-in')}
            </MuiLink>
          </Typography>
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

export default SignUp;
