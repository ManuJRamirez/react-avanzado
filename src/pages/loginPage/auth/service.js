import host, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../../api/host';
import storage from '../../../utils/storage';

export const login = credentials => {
  return host.post('/api/auth/login', credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    storage.set('auth', accessToken);
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove('auth');
  });
};
