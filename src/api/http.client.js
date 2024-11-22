import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const password = process.env.REACT_APP_PASSWORD;

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'password': password,
  }
});

export default httpClient;
