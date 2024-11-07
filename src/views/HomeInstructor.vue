<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar';
import CardComponent from '../components/cards/cardsHome.vue';
import binnacleImage from '../assets/img/bitacoras.png';
import modalityImage from '../assets/img/fichasImage.png';
import followupImage from '../assets/img/seguimientosImage.png';
import assignmentImage from '../assets/img/modalidadImage.png';

</script>

<template>
    <div class="q-pa-xl row items-center justify-center q-gutter-md contenedor">
        <div>
            <CardComponent titles="MIS ASIGNACIONES" :imageSRC="assignmentImage" to="/assigmentInstructor" />
        </div>
        <div>
            <CardComponent titles="BITÁCORAS" :imageSRC="binnacleImage" to="/apprentice" />
        </div>
        <div>
            <CardComponent titles="SEGUIMIENTOS" :imageSRC="followupImage" to="/binnacle" />
        </div>

        <div>
            <CardComponent titles="REGISTRO HORAS" :imageSRC="modalityImage" to="/fiches" />
        </div>

    </div>
</template>

<style scoped>

.contenedor {
    padding-top: 65px;
}
</style>