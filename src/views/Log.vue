<script setup>
import Tableclean from "../components/tables/Tableclean.vue";
import ButtonOpenModal from "../components/buttons/buttonAdd.vue";
import Title from "../components/tittle/tittle.vue";
import { ref, onMounted } from "vue";
import { getData } from "../services/apiClient.js";



const rows = ref([]);
let alert = ref(false);

const columns = ref([
    
    {
        name: "email.name",
        label: "Email",
        field: "email.name",
        align: 'center'
    },
    {
        name: "action.name",
        label: "Accion",
        field: "action.name",
        align: 'center'
    },
    {
        name: "information.name",
        label: "Informacion",
        field: "information.name",
        align: 'center'
    },
    {
        name: "data.name",
        label: "Datos",
        field: "data.name",
        align: 'center'
    },
]);
async function getLogs() {
  let res = await getData("log/listlogs");
  rows.value = res;
  console.log(res);
}

onMounted(() => {
  getLogs();
});

function openDialog(row) {
  alert.value = true;
  console.log(row);
}


</script>

<template>
    <div class="q-gutter-md divMain">
    <div>
        <Tableclean title="acciones" />
    </div>

    <div>
        <tablaLog :rows="rows" :columns="columns"/>
    </div>
</div>
</template>

<style scoped>

</style>