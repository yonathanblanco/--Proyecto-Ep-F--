<script setup>
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { getData } from "../services/apiClient";
import Table from "../components/tables/tablestatus.vue";
import Title from "../components/tittle/tittle.vue";
import Modal from "../components/modal/modal.vue";
import ButtonBack from '../components/buttons/buttonBack.vue';

const fixed = ref(false);
const $q = useQuasar();

onBeforeMount(() => {
  getFiches();
});

const columns = ref([
  {
    name: "index",
    align: "center",
    label: "N°",
    field: "index",
    format: val => val,
    sortable: false,
    style: "width: 5%; text-align: center;",
  },
  {
    name: "ficheName",
    align: "left",
    label: "NOMBRE FICHA",
    field: row => row.program?.name || "",
    sortable: true,
    style: "width: 35%; padding-left: 10px;",
  },
  {
    name: "ficheNumber",
    align: "center",
    label: "COD. FICHA",
    field: "number",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "status",
    align: "center",
    label: "ESTADO",
    field: "status",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "verAprendices",
    align: "center",
    label: "VER APRENDICES",
    style: "width: 20%; text-align: center;",
  },
]);

const rows = ref([]);
const searchTerm = ref('');

async function getFiches() {
  const storedAuth = localStorage.getItem('auth');
  const token = storedAuth ? JSON.parse(storedAuth) : null;
  const res = await getData("/repfora/listFiche");
  rows.value = res.map((item, index) => ({
    ...item,
    index: index + 1 // Asegura que la columna N° se rellene correctamente
  }));
}

function viewApprentices(ficheId) {
  console.log("Viewing apprentices for fiche:", ficheId);
}
</script>

<template>
  <div class="q-gutter-md divMain">
    <div>
      <ButtonBack />
      <Title title="FICHAS" />
    </div>

    <q-input
      v-model="searchTerm"
      filled
      placeholder="Ingrese el nombre o número de documento"
      class="q-mb-md"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <div>
      <Table
        :rows="rows"
        :columns="columns"
        :filter="searchTerm"
      >
        <template v-slot:body-cell-status="props">
          <q-td :props="props" class="status-cell">
            <div class="status-button" :class="{'active-status': props.row.status === 'Activa', 'inactive-status': props.row.status === 'Inactivo'}">
              {{ props.row.status }}
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-verAprendices="props">
          <q-td :props="props" class="view-apprentices-cell">
            <q-icon name="visibility" color="green" size="32px" @click="viewApprentices(props.row.id)" />
          </q-td>
        </template>
      </Table>
    </div>
  </div>
</template>

<style scoped>
.input {
  margin: 7px 0;
  color: green;
  border-color: green;
}

.divMain {
  padding: 0 1.5%;
  margin-top: 20px;
}

.status-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.status-button {
  border-radius: 20px;
  padding: 5px 15px;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
}

.active-status {
  background-color: #28a745; /* Verde */
}

.inactive-status {
  background-color: #dc3545; /* Rojo */
}

.view-apprentices-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.q-icon {
  cursor: pointer;
}
</style>
