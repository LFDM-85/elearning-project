import axios from 'axios';

// Use relative path to leverage the package.json proxy
const BASE_URL = '';

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
