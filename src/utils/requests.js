import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
    }
});

export default api
