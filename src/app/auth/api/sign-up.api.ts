import repository from 'api/repository';

interface SignUpForm {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}

interface Tokens {
  access_token: string;
  refresh_token: string;
}

export const signUp = (form: SignUpForm) => {
  return repository.post<Tokens>('/api/auth/sign-up', form);
};
