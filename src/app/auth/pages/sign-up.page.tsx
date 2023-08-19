import { Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { NavLink as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  parent: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  form: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const SignUp = () => {
  const { t } = useTranslation('auth');

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.parent}>
      <Box className={classes.form} gap={3}>
        <Typography component="h1" variant="h5">
          {t('Sign-up')}
        </Typography>
        <Box component="form">
          <TextField margin="dense" name="firstName" required fullWidth label={t('First-name')} />
          <TextField margin="dense" name="lastName" required fullWidth label={t('Last-name')} />
          <TextField margin="dense" name="email" required fullWidth id="email" label={t('Email')} />
          <TextField
            margin="dense"
            name="password"
            required
            fullWidth
            label={t('Password')}
            type="password"
          />
        </Box>
        <Box display="flex" flexDirection="column" width="100%" gap={1}>
          <Button type="submit" fullWidth variant="contained">
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
    </Container>
  );
};

export default SignUp;
