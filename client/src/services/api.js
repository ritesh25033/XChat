import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/api/users/register', userData),
  login: (credentials) => api.post('/api/users/login', credentials),
  logout: () => api.get('/api/users/logout'),
  getProfile: () => api.get('/api/users/me'),
  searchUsers: (searchTerm) => api.get(`/api/users/search?searchTerm=${searchTerm}`),
};

// Chat APIs
export const chatAPI = {
  initializeRoom: (otherUserId) => api.post('/api/rooms/init', { otheruser: otherUserId }),
  getUserRooms: () => api.get('/api/rooms/userrooms'),
};

export default api;
