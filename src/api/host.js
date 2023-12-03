import axios from 'axios';

const host = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

host.interceptors.response.use(response => response.data);
export const setAuthorizationHeader = token =>
  (host.defaults.headers.common['Authorization'] = `Bearer ${token}`);

export const removeAuthorizationHeader = () => {
  delete host.defaults.headers.common['Authorization'];
};

export default host;
