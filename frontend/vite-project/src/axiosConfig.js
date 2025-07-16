// ✅ CORRECT axios.js file
import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BANCKEND_URL,
  withCredentials: true,
});
