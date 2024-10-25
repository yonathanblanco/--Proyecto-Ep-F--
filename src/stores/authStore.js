import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  let token = ref("");
  let user = ref({
    email: "",
    role: ""
  });

  // Función para establecer el token
  function setToken(newToken) {
    token.value = newToken;
    if (newToken !== "") {
      console.log("Token establecido:", token.value);
    } else {
      console.log("No está llegando el token", token.value);
    }
  }

  // Función para obtener el token
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

  return {
    setToken,
    getToken,
    token,
    setUserDetails,
    getUserDetails,
    user
  };
}, { persist: true });
