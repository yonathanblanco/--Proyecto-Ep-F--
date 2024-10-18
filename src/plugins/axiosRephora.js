import axios from 'axios';

const token = JSON.parse(localStorage.getItem('auth')) ;

const apiRepfora = axios.create({
    baseURL: 'http://localhost:4100/api',
    baseURL: 'http://89.116.49.65:4500/api',
    headers: {
        "token": token.token 
    }
});

apiRepfora.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
        config.headers['token'] = token; 
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiRepfora;