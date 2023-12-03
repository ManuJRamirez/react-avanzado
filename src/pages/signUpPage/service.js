import host from '../../api/host';

export const signup = credentials => {
  return host.post('/api/auth/signup', credentials);
};
