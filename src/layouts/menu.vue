<template>
  <q-layout view="hHh Lpr lFf">

    <q-header elevated class="bg-green-9 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="titlesHeader">
          <router-link to="/home" class="titles">
            REPFORA
          </router-link>
        </q-toolbar-title>

        <!-- Agrega q-space para empujar el botón de logout a la derecha -->
        <q-space />

        <q-btn dense flat round icon="logout" @click="exit()" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="leftDrawer" side="left" overlay behavior="desktop" elevated>
      <q-item class="headerMenu">
        <q-item avatar class="no-padding">
          <q-avatar class="imgSena">
            <img :src="iconSena"/>
          </q-avatar>
        </q-item>

        <q-item-section>
          <q-item-label>
            <div class="text-h5 text-bold">
              <p class="tittleMenu"></p>
              <p class="userMenu"></p>
              <p class="userEmail"></p>
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="bodyMenu">
        <q-item-section>

          <buttonsMenu titles="LOG" icon="assignment" to="/log"></buttonsMenu>
          <buttonsMenu titles="APRENDICES" icon="school" to="/apprentice"></buttonsMenu>
          <buttonsMenu titles="BITACORA" icon="list_alt" to="/binnacle"></buttonsMenu>
          <buttonsMenu titles="MODALIDA" icon="info" to="/modality"></buttonsMenu>
          <buttonsMenu titles="SEGUIMIENTOS" icon="supervisor_account" to="/followup"></buttonsMenu>
          <buttonsMenu titles="ASIGNACION" icon="assignment_ind" to="/assignment"></buttonsMenu>

        </q-item-section>
      </q-item>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="footer-custom">
            <q-toolbar class="justify-center">
            <q-toolbar-titles class="text-center">
              <div class="text-bold tittleFooter">REPFORA - Sena 2024 Todos los derechos reservados </div>
            </q-toolbar-titles>
            </q-toolbar>
    </q-footer>

  </q-layout>
</template>


<script setup>
import { ref, onBeforeMount } from "vue";
import { QIcon } from "quasar";
import iconSena from '../assets/icon.png';
import buttonsMenu from '../components/buttons/buttonsMenu.vue';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}


</script>


<style scoped>
* {
  font-family: Roboto, -apple-system, Helvetica Neue, Helvetica, Arial, sans-serif
}

.bodyMenu {
  padding-top: 20px;
}



/* img */
.imgSena {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}

/* Drawer */
.headerMenu {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  background: rgb(228, 225, 225);
  text-align: center;
}

/* Tittles and texts */
.tittleFooter {
  font-size: .75em;
  
}
.footer-custom {
  background-color: #ddfadbd0; /* Cambia este color según tus necesidades */
  color: rgb(0, 0, 0); /* Color del texto en el footer */
}


.titlesHeader {
  font-size: 1.5em;
  font-weight: 700;
  color: white;
  text-decoration: none;
  cursor: pointer;
  margin: 0;
}

.tittleMenu {
  font-size: 1em;
  font-weight: 700;
}

.titles {
  color: white;
  text-decoration: none;
}

.userMenu {
  font-size: .8em;
  font-weight: 600;
}

.userEmail {
  font-size: .6em;
  font-weight: 500;
}

p {
  margin: 0;
  padding: 0;
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
