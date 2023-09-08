import repository from 'api/repository';

export const changePassword = (token: string, password: string) => {
  return repository.post(`/api/reset-password/${token}`, { password });
};
