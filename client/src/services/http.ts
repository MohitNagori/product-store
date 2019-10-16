import axios from 'axios';

// creating axios instance with options
export default axios.create({
  baseURL: `http://localhost:5000`,
  timeout: 2 * 60 * 1000, // 2 min
});
