<script setup>
import { ref } from 'vue';


const props = defineProps({
    openAddModal: {
        type: Function,
        required: true
    },
})

</script>
<template>
    <div class="divAgregar">
        <q-btn @click="openAddModal" class="add-aprendiz-btn" icon="add_circle" label="agregar">
        </q-btn>
    </div>
</template>

<style scoped>
/* Agregar  */
.add-aprendiz-btn {
    background-color: #2E7D32;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    border-radius: 25px;
    padding: 10px 15px;
    transition: all 0.3s ease;
    box-shadow: 0 5px 9px rgba(138, 138, 138, 0.308);
    margin-bottom: 15px;
}

.divAgregar {
    margin-top: 28px;
    display: flex;
    justify-content: flex-end;
}
</style>