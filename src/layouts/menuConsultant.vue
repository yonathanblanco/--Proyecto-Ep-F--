<template>
    <q-layout view="hHh Lpr lFf">
      <!-- Header -->
      <q-header elevated class="bg-green-9 text-white">
        <q-toolbar>
          <q-toolbar-title class="titlesHeader">
            <q-item avatar class="no-padding">
            <q-avatar class="imgSena">
              <img :src="iconSena" />
            </q-avatar>
          </q-item>
            <router-link to="/home" class="titles">
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
import iconSena from '@/assets/iconMenu.png';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();

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

/* img */
.imgSena {
  width: 110px;
  height: 50px;
  margin-bottom: 20px;
  margin-top: 10px;
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

