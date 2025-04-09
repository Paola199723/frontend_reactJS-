import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // o el endpoint de tu backend si está desplegado
});

export default api;
