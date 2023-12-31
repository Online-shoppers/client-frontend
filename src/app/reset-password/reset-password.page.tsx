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
import { useNavigate } from 'react-router-dom';

import { getErrorMessages } from 'utils/get-error-messages.util';

import { getResetToken } from './api/get-reset-token.api';
import { resetPasswordSchema } from './schemas/reset-password.schema';

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

const ResetPassword = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const { t } = useTranslation('auth');

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  const [loading, setLoading] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const handleResetPassword = handleSubmit(async form => {
    try {
      setLoading(true);
      const { data: resetToken } = await getResetToken(form.email);

      navigate(`./${resetToken}`, { replace: true });
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
        <Box
          component="form"
          className={classes.form}
          onSubmit={handleResetPassword}
          data-testid="form"
        >
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
                  autoComplete="email"
                  inputProps={{ 'data-testid': 'reset-email-input' }}
                />
                {error ? <FormHelperText error={!!error}>{t(error.message)}</FormHelperText> : null}
              </FormControl>
            )}
            control={control}
          />
          <button hidden type="submit" disabled={!isValid} data-testid="submit-button" />
        </Box>
        <Box display="flex" flexDirection="column" width="100%" gap={1}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleResetPassword}
            disabled={!isValid}
            loading={loading}
          >
            {t('Send-mail')}
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

export default ResetPassword;
