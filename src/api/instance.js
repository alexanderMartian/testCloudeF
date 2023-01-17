import axios from 'axios';

const useUrl = 'http://localhost:5000';

const instance = axios.create({
  baseURL: useUrl,
});

export default instance;
