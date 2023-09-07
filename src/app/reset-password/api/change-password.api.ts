import repository from 'api/repository';

export const changePassword = (token: string, password: string) => {
  console.log('change password');
  return repository.post(`/api/reset-password/${token}`, { password });
};
