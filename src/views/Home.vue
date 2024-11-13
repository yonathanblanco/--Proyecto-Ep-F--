<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar';
import CardComponent from '../components/cards/cardsHome.vue';
import { useAuthStore } from '../stores/authStore';
import { computed } from "vue";

const authStore = useAuthStore();
const user = computed(() => authStore.getUserDetails());

import logImage from '../assets/img/usuarios.png';
import apprenticeImage from '../assets/img/aprendices.png';
import binnacleImage from '../assets/img/bitacoras.png';
import modalityImage from '../assets/img/fichasImage.png';
import followupImage from '../assets/img/seguimientosImage.png';
import assignmentImage from '../assets/img/modalidadImage.png';
import hoursImage from '../assets/img/Horas.png';
import registerImage from '../assets/img/Registros.png';
import fichesImage from '../assets/img/logImage.png';



</script>

<template>
    <div class="q-pa-xl row items-center justify-center q-gutter-md contenedor">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-if="user?.role === 'ADMINISTRADOR'">
            <CardComponent titles="APRENDICES" :imageSRC="followupImage" to="/apprentice" />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-if="user?.role === 'INSTRUCTOR'">
            <CardComponent titles="MIS ASIGNACIONES" :imageSRC="followupImage" to="/assigmentInstructor" />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-if="user?.role === 'INSTRUCTOR'">
            <CardComponent titles="BITACORAS" :imageSRC="binnacleImage" to="/binnacleInstructor" />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-if="user?.role === 'INSTRUCTOR'">
            <CardComponent titles="SEGUIMIENTOS" :imageSRC="fichesImage" to="/followupInstructor" />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-if="user?.role === 'ADMINISTRADOR'">
            <CardComponent titles="BITACORAS" :imageSRC="binnacleImage" to="/binnacle" />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-if="user?.role === 'ADMINISTRADOR'">
            <CardComponent titles="FICHAS" :imageSRC="fichesImage" to="/fiches" />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-if="user?.role === 'ADMINISTRADOR'">
            <CardComponent titles="MODALIDAD EP" :imageSRC="modalityImage" to="/modality" />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-if="user?.role === 'ADMINISTRADOR'">
            <CardComponent titles="SEGUIMIENTOS" :imageSRC="apprenticeImage" to="/followup" />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-if="user?.role === 'ADMINISTRADOR'">
            <CardComponent titles="ASIGNACIONES" :imageSRC="assignmentImage" to="/assignment" />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-if="user?.role === 'ADMINISTRADOR'">
            <CardComponent titles="REGISTROS" :imageSRC="registerImage" to="/register" />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-if="user?.role === 'ADMINISTRADOR'">
            <CardComponent titles="CERTIFICACIONES" :imageSRC="logImage" to="/certification" />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-if="user?.role === 'INSTRUCTOR'">
            <CardComponent titles="CERTIFICACIONES" :imageSRC="modalityImage"
                to="/certificationInstructor" />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-if="user?.role === 'ADMINISTRADOR'">
            <CardComponent titles="INFORME HORAS" :imageSRC="hoursImage" to="/recordHours" />
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-if="user?.role === 'INSTRUCTOR'">
            <CardComponent titles="INFORME DE HORAS" :imageSRC="apprenticeImage" to="/recordHoursInstructor" />
        </div>
    </div>
</template>

<style scoped>
.contenedor {
    padding-top: 5px;
    gap: 40px;
}
</style>
