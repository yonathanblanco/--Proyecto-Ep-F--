<script setup>
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { getRepforaData } from "../services/apiRepfora";
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
    name: "ficheName",
    align: "center",
    label: "Nombre de Ficha",
    field: "name",
    sortable: true,
  },
  {
    name: "ficheNumber",
    align: "center",
    label: "Numero de Ficha",
    field: "number",
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "Estado",
    field: "status",
    sortable: true,
  },
  {
    name: "verAprendices",
    required: true,
    align: "center",
    label: "Ver Aprendices",
  },
]);

const rows = ref([]);
const searchTerm = ref('');

async function getFiches() {
  const storedAuth = localStorage.getItem('auth');
const token = storedAuth ? JSON.parse(storedAuth) : null;
console.log(token.token);
  const res = await getRepforaData("/listFiche");
  rows.value = res;
  console.log(res);
}

function viewApprentices(ficheId) {
  // Implement the logic to view apprentices for a specific fiche
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
          <q-td :props="props">
            <q-btn color="green" :label="props.row.status" size="sm" />
          </q-td>
        </template>
        <template v-slot:body-cell-verAprendices="props">
          <q-td :props="props">
            <q-btn flat round color="primary" icon="visibility" @click="viewApprentices(props.row.id)" />
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
</style>