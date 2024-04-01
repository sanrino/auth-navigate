import axios from 'axios';
import { API_URL } from '../api/endpoints/endpoints';

export const api = axios.create({
  baseURL: API_URL,
});
