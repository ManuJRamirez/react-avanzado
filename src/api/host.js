import axios from 'axios';

export const host = axios.create({
  baseURL: process.env.API_BASE_URL,
});
