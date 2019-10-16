import axios from 'axios';

// creating axios instance with options
export default axios.create({
  baseURL: '',
  timeout: 2 * 60 * 1000, // 2 min
});
