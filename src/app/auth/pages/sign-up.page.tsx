import { Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import PageLayout from 'components/page-layout.component';

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
  const classes = useStyles();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      fullName: data.get('fullName'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.parent}>
      <Box className={classes.form}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <MuiLink component={RouterLink} to="/auth/sign-in">
                {'Already have an account? Sign in'}
                {/* <RouterLink to="/auth/sign-in">{'Already have an account? Sign in'}</RouterLink> */}
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
