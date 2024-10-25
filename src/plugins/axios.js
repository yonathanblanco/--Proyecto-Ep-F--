import axios from 'axios';

// Aquí controlamos que no sea null antes de acceder a token.token
const storedAuth = localStorage.getItem('auth');
const token = storedAuth ? JSON.parse(storedAuth) : null;
console.log(token.token);

const apiClient = axios.create({

    baseURL: 'http://localhost:4100/api/',
    headers: {
        "token": token ? token.token : ''  // Verificamos si el token existe
    }
});

apiClient.interceptors.request.use((config) => {
    const storedAuth = localStorage.getItem('auth');
    const token = storedAuth ? JSON.parse(storedAuth) : null;
    if (token) {
        config.headers['token'] = token.token;  // Usamos token.token si está disponible
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
