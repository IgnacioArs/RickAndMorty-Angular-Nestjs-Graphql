import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/Graphql', // URL de tu servidor GraphQL
  headers: {
    'Content-Type': 'application/json',
  },
});
