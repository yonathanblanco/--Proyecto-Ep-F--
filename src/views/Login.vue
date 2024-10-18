<template>
  <div class="login-container">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="flex flex-center bg-login">
          <q-card class="q-pa-md shadow-2 my_card" bordered>
            <!-- Sección del logo y el título Login -->
            <q-card-section class="headerLogin text-center">
              <img :src="logosena" alt="Logo SENA" class="imgSena">
              <q-typography tag="h2" class="q-mt-md login-title">Login</q-typography>
            </q-card-section>

            <!-- Selección de Rol -->
            <q-card-section>
              <div class="form-group">
                <label for="rol" class="form-label"></label>
                <select id="rol" v-model="role" @change="handleRoleChange" class="input-field">
                  <option value="">SELECCIONE UN rol</option>
                  <option value="ETAPA PRODUCTIVA">Administrador</option>
                  <option value="instructor">Instructor</option>
                  <option value="consultor">Consultor</option>
                </select>
              </div>

              <!-- Mostrar Email y Contraseña solo si es administrador o instructor -->
              <q-input 
                v-if="isRole('ETAPA PRODUCTIVA') || isRole('instructor')"
                dense 
                label-color="green-7" 
                color="#38803a" 
                outlined 
                class="q-mt-md input" 
                v-model="email"
                :error="!!emailError" 
                :error-message="emailError" 
                label="Email">
              </q-input>

              <q-input 
                v-if="isRole('ETAPA PRODUCTIVA') || isRole('instructor')"
                dense 
                label-color="green-7" 
                color="#38803a" 
                outlined 
                class="q-mt-xs input" 
                v-model="password" 
                :type="passwordVisible ? 'text' : 'password'" 
                :error="!!passwordError" 
                :error-message="passwordError" 
                label="Password">
                <template v-slot:append>
                  <q-icon :name="passwordVisible ? 'visibility' : 'visibility_off'"
                          class="cursor-pointer" 
                          @click="passwordVisible = !passwordVisible"/>
                </template>
              </q-input>

              <!-- Mostrar Documento y Email solo si es consultor -->
              <q-input 
                v-if="isRole('consultor')"
                dense 
                label-color="green-7" 
                color="#38803a" 
                outlined 
                class="q-mt-md input" 
                v-model="documento"
                label="Documento">
              </q-input>

              <q-input 
                v-if="isRole('consultor')"
                dense 
                label-color="green-7" 
                color="#38803a" 
                outlined 
                class="q-mt-xs input" 
                v-model="email"
                :error="!!emailError" 
                :error-message="emailError" 
                label="Email">
              </q-input>
            </q-card-section>

            <!-- Olvidar contraseña -->
            <q-card-section class="forgot-password text-center q-my-sm">
              <q-btn flat color="#38803a" label="¿Olvidaste tu contraseña?" @click="forgotPassword()"></q-btn>
            </q-card-section>

            <!-- Botón de Login -->
            <q-card-section>
              <q-btn
                style="border-radius: 12px;" 
                color="#38803a" 
                rounded 
                size="md" 
                label="Iniciar Sesión" 
                no-caps 
                class="full-width btn-login" 
                @click="handleLogin"
                required>
              </q-btn>
            </q-card-section>
          </q-card>

          <q-footer class="footer-custom">
            <q-toolbar class="justify-center">
            <q-toolbar-titles class="text-center">
              <div class="text-bold tittleFooter">REPFORA - Sena 2024 Todos los derechos reservados </div>
            </q-toolbar-titles>
            </q-toolbar>
          </q-footer>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { postData } from "../services/apiClient.js";
import { notifySuccessRequest, notifyErrorRequest } from "../utils/notify.js";
import { validarCampos } from "../utils/validateFields.js";
import { useRouter } from 'vue-router';


const $router = useRouter();

const email = ref("");
const password = ref("");
const documento = ref("");
const role = ref("");
let passwordVisible = ref(false);

const isRole = (roles) => role.value === roles;

async function loginAdmin(email, password, role) {
  if (!validarCampos(email, password)) {
    return;  
  }
  
  try {
    const res = await postData("repfora/Login", { email, password, role });
    notifySuccessRequest("Inicio de sesión exitoso");
    $router.push("/home");
  } catch (error) {
    notifyErrorRequest("Contraseña/Email incorrecto");
  }
}


async function loginInstructor(email, password) {
  if (!validarCampos(email, password)) {
    return;  
  }
  try {
    const res = await postRepforaData("instructors/login", { email, password });
    notifySuccessRequest("Inicio de sesión exitoso");
    $router.push("/home");
  } catch (error) {
    notifyErrorRequest("Contraseña/Email incorrecto");
  }
}


async function loginConsultor(email, documento) {
  if (!validarCampos(email, '', documento)) {
    return; 
  }

  try {
    const res = await postRepforaData("aprendiz/login", { email, documento });
    notifySuccessRequest("Inicio de sesión exitoso");
    $router.push("/home");
  } catch (error) {
    notifyErrorRequest("Documento/Email incorrecto");
  }
}


async function handleLogin() {
  if (isRole('ETAPA PRODUCTIVA')) {
    await loginAdmin(email.value, password.value, role.value);
  } else if (isRole('instructor')) {
    await loginInstructor(email.value, password.value);
  } else if (isRole('consultor')) {
    await loginConsultor(email.value, documento.value);
  }
}
</script>

<style scoped>
.bg-login {
  background-color: transparent;
}

.headerLogin {
  display: flex;
  flex-direction: column; /* Cambiar a columna para colocar el texto Login debajo */
  align-items: center;
  justify-content: center;
  position: relative;
}

.imgSena {
  max-width: 100px;
  margin: 10px 0;
}

.login-title {
  font-family: 'Poppins', sans-serif; /* Fuente personalizada */
  color: #38803a; /* Color verde para combinar con el tema */
  font-weight: bold;
  font-size: 1.8rem;
}

.my_card {
  width: 28rem;
  border-radius: 18px;
  background-color: white;
  transition: all 0.4s ease;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #38803a; /* Añadir borde verde */
}

.my_card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
}

.input {
  margin-bottom: 12px; /* Ajustamos el espacio entre los inputs */
}

.q-mt-md {
  margin-top: 16px; /* Ajustamos el margen superior para bajar el campo de email */
}

.q-mt-xs {
  margin-top: 4px; /* Ajustamos el margen superior para subir el campo de password */
}

.input:focus {
  border-color: #38803a;
  box-shadow: 0 0 2px #38803a;
}

.cursor-pointer {
  cursor: pointer;
  transition: 0.3s;
}

.cursor-pointer:hover {
  color: #38803a;
}

.forgot-password {
  font-size: 0.9rem;
  font-weight: bold;
  color: #38803a;
  transition: 0.3s;
}

.forgot-password:hover {
  color: #38803a;
}

.btn-login {
  background: linear-gradient(45deg, #38803a, #38803a);
  color: white;
  font-weight: bold;
  transition: background 0.3s ease;
}

.btn-login:hover {
  background: linear-gradient(45deg, #38803a, #38803a);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(67, 160, 71, 0.4);
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #38803a; /* Cambiar borde a color verde */
}

/* Tittles and texts */
.tittleFooter {
  font-size: 16px;
  
}
.footer-custom {
  background-color: #b0b0b0d8; /* Cambia este color según tus necesidades */
  color: rgb(0, 0, 0); /* Color del texto en el footer */
}
</style>
