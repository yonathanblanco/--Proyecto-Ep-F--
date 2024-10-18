import  apiRepfora  from '../plugins/axiosRephora.js'; // Importa tu instancia de Axios si está configurada en /plugins

// Función POST repfora

export async function postRepforaData(url, data) {
    try {
        const response = await apiRepfora.post(url, data);
        return response.data;  // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error en la petición POST:', error);
        throw error;
    }
}

