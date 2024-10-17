import axios from 'axios';

const token = localStorage.getItem('token');  // Ejemplo de cómo obtener el token

const apiClient = axios.create({
    baseURL: 'https://api.example.com',
    headers: {
        "x-token": token
    }
});

export default apiClient;