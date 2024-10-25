import axios from 'axios';

// Verifica si existe 'auth' en el localStorage y si es válido.
const authData = localStorage.getItem('auth');
const token = authData ? JSON.parse(authData) : null;


const apiRepfora = axios.create({
    baseURL: 'http://89.116.49.65:4500/api',
    headers: {
        "token": token ? token.token : ''  // Verifica que token no sea null
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
