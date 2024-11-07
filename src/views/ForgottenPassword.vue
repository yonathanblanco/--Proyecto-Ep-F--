<template>
    <div class="forgot-password-container">
      <q-layout view="lHh Lpr lFf">
        <q-page-container>
          <q-page class="flex flex-center bg-forgot-password">
            <q-card class="q-pa-md shadow-2 my_card" bordered>
              <!-- Sección del logo y el título Olvidé mi contraseña -->
              <q-card-section class="headerForgotPassword text-center">
                <img :src="logosena" alt="Logo SENA" class="imgSena">
                <q-typography tag="h2" class="q-mt-md forgot-password-title">¿Olvidaste tu Contraseña?</q-typography>
              </q-card-section>
  
              <!-- Input de Email -->
              <q-card-section>
                <div class="form-group">
                  <label for="email" class="form-label">Ingrese su Email</label>
                  <q-input
                    id="email"
                    dense
                    label-color="green-7"
                    color="#38803a"
                    outlined
                    v-model="email"
                    :error="!!emailError"
                    :error-message="emailError"
                    label="Email"
                  >
                    <template v-slot:prepend>
                      <q-icon name="mail" color="green-8" />
                    </template>
                  </q-input>
                </div>
              </q-card-section>
  
              <!-- Botón de Restablecer Contraseña -->
              <q-card-section>
                <q-btn
                  style="border-radius: 12px;"
                  color="#38803a"
                  rounded
                  size="md"
                  label="Enviar Codigo"
                  no-caps
                  class="full-width btn-reset-password"
                  @click="handleResetPassword"
                />
              </q-card-section>
  
              <!-- Mensaje de retorno -->
              <q-card-section class="text-center q-my-sm">
                <q-btn
                to="/"
                label="Regresar"
                color="#38803a"
                rounded
                class="btn-regresar"
                flat
                />
              </q-card-section>
            </q-card>
  
            <q-footer class="footer-custom">
              <q-toolbar class="justify-center">
                <q-toolbar-title class="text-center">
                  <div class="text-bold tittleFooter">REPFORA - Sena 2024 Todos los derechos reservados</div>
                </q-toolbar-title>
              </q-toolbar>
            </q-footer>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { notifySuccessRequest, notifyErrorRequest } from "../utils/notify.js";
  import { postData } from "../services/apiClient.js";
  import logosena from "../assets/img/logosena.png";
  
  const $router = useRouter();
  const email = ref("");
  const emailError = ref("");
  
  async function handleResetPassword() {
    if (!email.value) {
      emailError.value = "El email es obligatorio.";
      return;
    }
  
    try {
      // Aquí deberías implementar la lógica para restablecer la contraseña
      const res = await postData("http://89.116.49.65:4500/api/users/reset-password", { email: email.value });
      notifySuccessRequest("Se ha enviado un email para restablecer la contraseña.");
      $router.push("/");
    } catch (error) {
      notifyErrorRequest("Error al restablecer la contraseña. Verifica tu email.");
    }
  }
  </script>
  
  <style scoped>
  .bg-forgot-password {
    background-color: transparent;
  }
  
  .headerForgotPassword {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: #2e7d32;
    padding: 10px 20px; 
    border-radius: 10px 10px 0 0;
  }
  
  .imgSena {
    max-width: 200px; 
    margin-bottom: 10px;
  }
  
  .forgot-password-title {
    font-family: 'Poppins', sans-serif;
    color: white;
    font-weight: bold;
    font-size: 1.8rem;
  }
  
  .form-label{
    font-weight: bold;
  }
  .my_card {
    width: 28rem;
    border-radius: 18px;
    background-color: white;
    transition: all 0.4s ease;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #2e7d32;
  }
  
  .my_card:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  }
  
  .input {
    margin-bottom: 12px;
  }
  
  .q-mt-md {
    margin-top: 16px;
  }
  
  .forgot-password {
    font-size: 0.9rem;
    font-weight: bold;
    color: #2e7d32;
    transition: 0.3s;
  }
  
  .btn-reset-password {
    background: linear-gradient(45deg, #2e7d32, #2e7d32);
    color: white;
    font-weight: bold;
    transition: background 0.3s ease;
  }
  
  .btn-reset-password:hover {
    background: linear-gradient(45deg, #1b5e20, #1b5e20);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(46, 125, 50, 0.4);
  }
  
  .tittleFooter {
    font-size: 16px;
  }
  
 .btn-regresar {
  background: linear-gradient(45deg, #2e7d32, #2e7d32); 
  color: white; 
  border-radius: 12px; 
  margin-top: -30px; 
  font-weight: 600; 
  }

  .btn-regresar:hover {
  background: linear-gradient(45deg, #1b5e20, #1b5e20); 
  transform: translateY(-3px); 
  box-shadow: 0 10px 20px rgba(46, 125, 50, 0.4); 
  }

  .footer-custom {
  background-color: #b0b0b0d8;
  color: rgb(0, 0, 0);
  }
</style>