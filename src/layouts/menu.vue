<template>
  <q-layout view="hHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="bg-green-9 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="titlesHeader">
          <router-link to="/home" class="titles">
            ETAPAS PRODUCTIVAS
          </router-link>
        </q-toolbar-title>
        <q-space />
        <q-btn dense flat round icon="logout" @click="exit" />
      </q-toolbar>
    </q-header>

    <!-- Drawer (menú lateral) -->
    <q-drawer v-model="leftDrawerOpen" class="leftDrawer" side="left" overlay behavior="desktop" elevated>
      <!-- Información del usuario -->
      <q-item class="headerMenu">
        <q-item avatar class="no-padding">
          <q-avatar class="imgSena">
            <img :src="iconSena" />
          </q-avatar>
        </q-item>
        <q-item-section>
          <q-item-label>
            <div class="text-h5 text-bold">
              <!-- Mostrar el rol y el email del usuario -->
              <p class="userMenu">{{ user?.role || 'Rol no disponible' }}</p>
              <p class="userEmail">{{ user?.email || 'Email no disponible' }}</p>
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>

      <!-- Opciones del menú, según el rol -->
      <q-item class="bodyMenu">
        <q-item-section>
          <buttonsMenu titles="INICIO" icon="list" to="/home" v-if="user?.role === 'ADMINISTRADOR' || user?.role === 'INSTRUCTOR'"></buttonsMenu>
          <buttonsMenu titles="ASIGNACIONES" icon="history_edu" to="/assigmentInstructor"
            v-if="user?.role === 'INSTRUCTOR'"></buttonsMenu>
          <buttonsMenu titles="REGISTROS" icon="assignment" to="/register" v-if="user?.role === 'ADMINISTRADOR'">
          </buttonsMenu>
          <buttonsMenu titles="FICHAS" icon="people" to="/fiches" v-if="user?.role === 'ADMINISTRADOR'"></buttonsMenu>
          <buttonsMenu titles="APRENDICES" icon="school" to="/apprentice" v-if="user?.role === 'ADMINISTRADOR'">
          </buttonsMenu>
          <buttonsMenu titles="BITÁCORAS" icon="list_alt" to="/binnacle"
          v-if="user?.role === 'ADMINISTRADOR'">
          </buttonsMenu>
          <buttonsMenu titles="BITÁCORAS" icon="list_alt" to="/binnacleInstructor"
          v-if="user?.role === 'INSTRUCTOR'">
          </buttonsMenu>
          <buttonsMenu titles="MODALIDAD" icon="info" to="/modality" v-if="user?.role === 'ADMINISTRADOR'">
          </buttonsMenu>
          <buttonsMenu titles="CERTIFICACIONES" icon="analytics" to="/certification" v-if="user?.role === 'ADMINISTRADOR'">
          </buttonsMenu>
          <buttonsMenu titles="SEGUIMIENTOS" icon="calendar_today" to="/followup"
          v-if="user?.role === 'ADMINISTRADOR'">
          </buttonsMenu>
          <buttonsMenu titles="SEGUIMIENTOS" icon="calendar_today" to="/followupInstructor"
          v-if="user?.role === 'INSTRUCTOR'">
          </buttonsMenu>
          <buttonsMenu titles="ASIGNACIONES" icon="history_edu" to="/assignment" v-if="user?.role === 'ADMINISTRADOR'">
          </buttonsMenu>
          <buttonsMenu titles="ASIGNACIONES" icon="history_edu" to="/assigmentInstructor" v-if="user?.role === 'INSTRUCTOR'">
          </buttonsMenu>
          <!-- <buttonsMenu titles="INFORME" icon="calculate" to="/report" v-if="user?.role === 'ADMINISTRADOR'">
          </buttonsMenu> -->
          <buttonsMenu titles="CONSULTA" icon="analytics" to="/consultor" v-if="user?.role === 'CONSULTOR'">
          </buttonsMenu>
          <buttonsMenu titles="CERTIFICACIONES" icon="analytics" to="/certificationInstructor"
            v-if="user?.role === 'INSTRUCTOR'">
          </buttonsMenu>
          <buttonsMenu titles="HORAS" icon="analytics" to="/recordHours" v-if="user?.role === 'ADMINISTRADOR'">
          </buttonsMenu>
          <buttonsMenu titles="HORAS" icon="analytics" to="/recordHoursInstructor" v-if="user?.role === 'INSTRUCTOR'">
          </buttonsMenu>

        </q-item-section>
      </q-item>
    </q-drawer>

    <!-- Contenedor de página -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer class="footer-custom">
      <q-toolbar class="justify-center">
        <q-toolbar-title class="text-center">
          <div class="text-bold tittleFooter">
            REPFORA - Sena 2024 Todos los derechos reservados
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import iconSena from '../assets/icon.png';
import buttonsMenu from '../components/buttons/buttonsMenu.vue';
import { useAuthStore } from '../stores/authStore';

const leftDrawerOpen = ref(false);
const router = useRouter();

// Función para abrir/cerrar el drawer
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// Obtener los detalles del usuario desde el store
const authStore = useAuthStore();
const user = computed(() => authStore.getUserDetails());  // Computed para reactividad

// Función para cerrar sesión
function exit() {
  authStore.setToken("");  // Limpiar el token
  authStore.setUserDetails({ email: "", role: "" });  // Limpiar los detalles del usuario
  localStorage.removeItem('auth');  // Limpiar el localStorage
  router.push('/');  // Redireccionar al inicio de sesión
}
</script>

<style scoped>
* {
  font-family: Roboto, -apple-system, Helvetica Neue, Helvetica, Arial, sans-serif;
}

.bodyMenu {
  padding-top: 20px;
}

/* img */
.imgSena {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  margin-top: 10px;
}

/* Drawer */
.headerMenu {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  background: rgb(228, 225, 225);
  text-align: center;
  margin-bottom: 10px;
}

/* Títulos y textos */
.titlesHeader {
  font-size: 1.5em;
  font-weight: 700;
  color: white;
  text-decoration: none;
  cursor: pointer;
  margin: 0;
}

.userMenu {
  font-size: 1em;
  font-weight: 600;
}

.titles {
  color: white;
  text-decoration: none;
}

.userEmail {
  font-size: 0.8em;
  font-weight: 500;
}

/* Footer */
.footer-custom {
  background-color: #b0b0b0d8;
  color: rgb(0, 0, 0);
}

.tittleFooter {
  font-size: 16px;
  font-weight: bold;
}
</style>
