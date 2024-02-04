import host, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../api/host';
import storage from '../../components/tools/storage';

const advertsUrl = '/api/v1/adverts';

export const login = credentials => {
  return host.post('/api/auth/login', credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    if (credentials.rememberMe) {
      storage.set('auth', accessToken);
    }

    return credentials.email;
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove('auth');
  });
};

export const signup = credentials => {
  return host.post('/api/auth/signup', credentials);
};

export const getAllAdverts = () => {
  return host.get(advertsUrl);
};

export const postAdvert = advert => {
  const formData = new FormData();

  Object.keys(advert).forEach(key => {
    formData.append(key, advert[key]);
  });

  return host.post(advertsUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Establecer Content-Type como multipart/form-data
    },
  });
};

export const getOneAdvert = advertId => {
  const url = `${advertsUrl}/${advertId}`;
  return host.get(url);
};

export const deleteOneAdvert = advertId => {
  const url = `${advertsUrl}/${advertId}`;
  return host.delete(url);
};

export const getTags = () => {
  const url = `${advertsUrl}/tags`;
  return host.get(url);
};
