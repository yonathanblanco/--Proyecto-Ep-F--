import axios from 'axios';

const token = localStorage.getItem('token');  // Ejemplo de cómo obtener el token

const apiClient = axios.create({
    baseURL: 'https://localhost:4100/api/',
     headers: {
         "x-token": token
     }
});

// const apiRepfora = axios.create({
//     baseURL: 'http://89.116.49.65:4500/api',
    
// });


export {apiClient, apiRepfora};