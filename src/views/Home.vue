<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar';
import CardComponent from '../components/cards/cardsHome.vue';

import logImage from '../assets/img/usuarios.png';
import apprenticeImage from '../assets/img/aprendices.png';
import binnacleImage from '../assets/img/bitacoras.png';
import modalityImage from '../assets/img/fichasImage.png';
import followupImage from '../assets/img/seguimientosImage.png';
import assignmentImage from '../assets/img/modalidadImage.png';

</script>

<template>
    <div class="q-pa-xl row items-center justify-center q-gutter-md contenedor">
        <div>
            <CardComponent titles="LOG" :imageSRC="logImage" to="/log" />
        </div>
        <div>
            <CardComponent titles="APRENDICES" :imageSRC="apprenticeImage" to="/apprentice" />
        </div>
        <div>
            <CardComponent titles="BITACORA" :imageSRC="binnacleImage" to="/binnacle" />
        </div>
        
        <div>
            <CardComponent titles="MODALIDAD" :imageSRC="modalityImage" to="/modality" />
        </div>
        
        <div>
            <CardComponent titles="SEGUIMIENTOS" :imageSRC="followupImage" to="/followup" />
        </div>

        <div>
            <CardComponent titles="ASIGNACION" :imageSRC="assignmentImage" to="/assignment" />
        </div>
    </div>
</template>

<style scoped>

.contenedor {
    padding-top: 65px;
}
</style>