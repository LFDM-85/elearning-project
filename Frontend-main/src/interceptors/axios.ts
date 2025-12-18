import axios from 'axios';

// Use absolute path from root to avoid issues with nested routes
const BASE_URL = '/';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to prevent 'my/' from being prepended to API calls
instance.interceptors.request.use((config) => {
  if (config.url && config.url.startsWith('my/')) {
    config.url = config.url.replace('my/', '');
  }
  // Ensure the URL starts with / if it doesn't have a protocol
  if (config.url && !config.url.startsWith('/') && !config.url.startsWith('http')) {
    config.url = '/' + config.url;
  }
  return config;
});

export default instance;
