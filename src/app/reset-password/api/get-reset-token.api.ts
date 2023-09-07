import repository from 'api/repository';

export const getResetToken = (email: string) => {
  return repository.post<string>('/api/reset-password', { email });
};
