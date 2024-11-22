<template>
  <div class="login-container">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="flex flex-center bg-login">
          <q-card class="q-pa-md shadow-2 my_card" bordered>
            <!-- Sección del logo y el título Login -->
            <q-card-section class="headerLogin text-center">
              <img :src="logosena" alt="Logo SENA" class="imgSena">
              <q-typography tag="h2" class="q-mt-md login-title">Etapas Productivas</q-typography>
            </q-card-section>

            <!-- Selección de Rol -->
            <q-card-section>
              <div class="form-group">
                <label for="rol" class="form-label">Seleccione un rol</label>
                <q-select id="rol" v-model="role" @change="handleRoleChange" class="input-field" :options="rolesOptions"
                  emit-value map-options outlined dense label="Seleccione un rol" use-input input-debounce="300">
                  <template v-slot:prepend>
                    <q-icon name="list" color="green-8" />
                  </template>
                </q-select>
              </div>

              <!-- Mostrar Email y Contraseña solo si es administrador o instructor -->
              <q-input v-if="isRole('ETAPA PRODUCTIVA') || isRole('Instructor')" dense label-color="green-7"
                color="#38803a" outlined class="q-mt-md input" v-model="email" :error="!!emailError"
                :error-message="emailError" label="Email">
                <template v-slot:prepend>
                  <q-icon name="mail" color="green-8" />
                </template>
              </q-input>

              <q-input v-if="isRole('ETAPA PRODUCTIVA') || isRole('Instructor')" dense label-color="green-7"
                color="#38803a" outlined class="q-mt-xs input" v-model="password"
                :type="passwordVisible ? 'text' : 'password'" :error="!!passwordError" :error-message="passwordError"
                label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" color="green-8" />
                </template>
                <template v-slot:append>
                  <q-icon :name="passwordVisible ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                    @click="passwordVisible = !passwordVisible" />
                </template>
              </q-input>

              <!-- Mostrar Documento y Email solo si es consultor -->
              <q-input v-if="isRole('consultor')" dense label-color="green-7" color="#38803a" outlined
                class="q-mt-md input" v-model="documento" label="Documento">
                <template v-slot:prepend>
                  <q-icon name="assignment" color="green-8" />
                </template>
              </q-input>

              <q-input v-if="isRole('consultor')" dense label-color="green-7" color="#38803a" outlined
                class="q-mt-xs input" v-model="email" :error="!!emailError" :error-message="emailError" label="Email">
                <template v-slot:prepend>
                  <q-icon name="mail" color="green-8" />
                </template>
              </q-input>
            </q-card-section>

            <!-- Botón de Login -->
            <q-card-section>
              <q-btn style="border-radius: 12px;" color="#38803a" rounded size="md" label="Iniciar Sesión" no-caps
                class="full-width btn-login" @click="handleLogin" :loading="loading"
                :disable="loading" required>
                <template v-if="loading" v-slot:loading>
                  <q-spinner color="white" size="20px" />
                </template>
              </q-btn>
            </q-card-section>

            <!-- Olvidar contraseña -->
            <q-card-section class="forgot-password text-center q-my-sm">
              ¿Olvidaste tu contraseña?
            </q-card-section>
          </q-card>

          <q-footer class="footer-custom">
            <q-toolbar class="justify-center">
              <q-toolbar-titles class="text-center">
                <div class="text-bold tittleFooter">REPFORA Sena 2024 Todos los derechos reservados </div>
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
import { postRepforaData } from "../services/apiRepfora.js";
import { notifySuccessRequest, notifyErrorRequest } from "../utils/notify.js";
import { validarCampos } from "../utils/validateFields.js";
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore.js';
import logosena from "../assets/img/logosena.png"

const useAuth = useAuthStore();
const $router = useRouter();

const email = ref("");
const password = ref("");
const documento = ref("");
const role = ref("");
const passwordVisible = ref(false);
const loading = ref(false)

const rolesOptions = ref([
  { value: 'ETAPA PRODUCTIVA', label: 'Administrador' },
  { value: 'Instructor', label: 'Instructor' },
  { value: 'consultor', label: 'Consultor' },
]);

const validateForm = () => {
  if (!role.value) {
    notifyErrorRequest("Por favor, selecciona un rol.");
    return false;
  }

  if ((isRole('ETAPA PRODUCTIVA') || isRole('Instructor')) && (!email.value || !password.value)) {
    notifyErrorRequest("Por favor, completa todos los campos obligatorios.");
    return false;
  }

  if (isRole('consultor') && (!email.value || !documento.value)) {
    notifyErrorRequest("Por favor, completa todos los campos obligatorios.");
    return false;
  }

  return true;
};

const isRole = (roles) => role.value === roles;

async function loginAdmin(email, password, role) {
  try {
    const res = await postData("http://89.116.49.65:4500/api/users/login", { email, password, role });

    // Guarda el token en Pinia
    useAuth.setToken(res.token);
    // Guarda el email y rol en Pinia
    useAuth.setUserDetails({ email: res.email, role: 'ADMINISTRADOR' });
    // Almacena el token en localStorage
    localStorage.setItem('auth', JSON.stringify({ token: res.token }));

    notifySuccessRequest("Inicio de sesión exitoso");
    // Redirige al home
    $router.push("/home");
  } catch (error) {
    notifyErrorRequest("Contraseña/Email incorrecto");
  }
}

async function loginInstructor(email, password,


) {
  try {
    const res = await postRepforaData("/instructors/login", { email, password, role });

    // Guarda el token en Pinia
    useAuth.setToken(res.token);
    useAuth.setToken(role);
    // Guarda el email y rol en Pinia
    useAuth.setUserDetails({ email: res.email, role: 'INSTRUCTOR' });
    // Almacena el token en localStorage
    localStorage.setItem('auth', JSON.stringify({ token: res.token }));

    notifySuccessRequest("Inicio de sesión exitoso");
    // Redirige al home
    $router.push("/home");
  } catch (error) {
    notifyErrorRequest("Contraseña/Email incorrecto");
  }
}

async function loginConsultor(email, documento) {
  try {
    const res = await postRepforaData("aprendiz/login", { email, documento });
    notifySuccessRequest("Inicio de sesión exitoso");
    $router.push("/home");
  } catch (error) {
    notifyErrorRequest("Documento/Email incorrecto");
  }
}

async function handleLogin() {
  if (!validateForm()) return;

  loading.value = true; // Activa el loading antes de la solicitud

  try {
    if (isRole('ETAPA PRODUCTIVA')) {
      await loginAdmin(email.value, password.value, role.value);
    } else if (isRole('Instructor')) {
      await loginInstructor(email.value, password.value);
    } else if (isRole('consultor')) {
      await loginConsultor(email.value, documento.value);
    }
  } finally {
    loading.value = false; // Desactiva el loading después de la solicitud
  }
}
</script>


<style scoped>
.bg-login {
  background-color: transparent;
}

.headerLogin {
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

.login-title {
  font-family: 'Poppins', sans-serif;
  color: white;
  font-weight: bold;
  font-size: 1.8rem;
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

.q-mt-xs {
  margin-top: 4px;
}

.input:focus {
  border-color: #2e7d32;
  box-shadow: 0 0 2px #2e7d32;
}

.cursor-pointer {
  cursor: pointer;
  transition: 0.3s;
}

.cursor-pointer:hover {
  color: #2e7d32;
}

.forgot-password {
  text-decoration: none;
  /* Elimina el subrayado */
  font-size: 0.9rem;
  font-weight: bold;
  color: #2e7d32;
  /* Color verde */
  transition: color 0.3s;
  /* Transición suave para el hover */
}

.forgot-password:hover {
  color: #4caf50;
  /* Color verde más claro en hover */
}



.btn-login {
  background: linear-gradient(45deg, #2e7d32, #2e7d32);
  color: white;
  font-weight: bold;
  transition: background 0.3s ease;
}

.btn-login:hover {
  background: linear-gradient(45deg, #1b5e20, #1b5e20);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(46, 125, 50, 0.4);
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
  border-color: #2e7d32;
}

.tittleFooter {
  font-size: 16px;
}

.footer-custom {
  background-color: #b0b0b0d8;
  color: rgb(0, 0, 0);
}
</style>