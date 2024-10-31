import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // Variables reactivas para almacenar el token y detalles del usuario
  let token = ref("");
  let user = ref({
    email: "",
    role: ""
  });

  // Función para establecer el token de autenticación
  function setToken(newToken) {
    token.value = newToken;
    if (newToken !== "") {
      console.log("Token establecido:", token.value);
    } else {
      console.log("No está llegando el token", token.value);
    }
  }

  // Función para obtener el token de autenticación
  function getToken() {
    return token.value;
  }

  // Función para establecer los detalles del usuario (email y rol)
  function setUserDetails({ email, role }) {
    user.value.email = email;
    user.value.role = role;
    console.log("Detalles de usuario establecidos:", user.value);
  }

  // Función para obtener los detalles del usuario
  function getUserDetails() {
    return user.value;
  }

  // Función para limpiar los datos de autenticación
  function clearAuthData() {
    token.value = "";
    user.value = { email: "", role: "" };
    console.log("Datos de autenticación limpiados.");
  }

  function login() {
    // Setea el token y detalles del usuario
    setToken(response.data.token);
    setUserDetails(response.data.user);
  
    // Forzar la redirección al Home
    router.push('/home');
  }

  return {
    setToken,
    getToken,
    token,
    setUserDetails,
    getUserDetails,
    user,
    clearAuthData,
    login
  };
}, {
  persist: {
    enabled: true, // Activa la persistencia
    strategies: [
      {
        key: 'auth', // Clave de almacenamiento en localStorage
        storage: localStorage, // Usa localStorage para la persistencia
      }
    ]
  }
});
