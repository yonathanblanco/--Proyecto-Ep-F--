<script setup>
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { getData, putData } from "../services/apiClient";
import Table from "../components/tables/tablestatus.vue";
import ButtonAdd from "../components/buttons/buttonAdd.vue";
import Title from "../components/tittle/tittle.vue";
import Modal from "../components/modal/modal.vue";
import ButtonBack from '../components/buttons/buttonBack.vue';

const fixed = ref(false);
const isEditing = ref(false);
const $q = useQuasar();

onBeforeMount(() => 


{
  getFiches();
});

const columns = ref([
  {
    name: "number",
    required: true,
    align: "center",
    label: "N°",
    field: "number",
    sortable: true,
  },
  {
    name: "ficheName",
    align: "center",
    label: "NOMBRE FICHA",
    field: "name",
    sortable: true,
  },
  {
    name: "ficheNumber",
    align: "center",
    label: "COD. FICHA",
    field: "number",
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "ESTADO",
    field: "status",
    sortable: true,
  },
  {
    name: "verAprendices",
    required: true,
    align: "center",
    label: "VER APRENDICES",
  },
]);

const rows = ref([]);
const searchTerm = ref('');

async function getFiches() {
  const storedAuth = localStorage.getItem('auth');
  const token = storedAuth ? JSON.parse(storedAuth) : null;
  console.log(token.token);
  const res = await getData("/listFiche");
  rows.value = res.map((fiche, index) => ({
    ...fiche,
    number: index + 1,
    status: "Activa"  // Assuming all fiches are active by default
  }));
  console.log(res);
}

function openAddModal() {
  fixed.value = true;
  isEditing.value = false;
}

function edit(row) {
  fixed.value = true;
  isEditing.value = true;
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
      <div>
        <ButtonAdd :openAddModal="openAddModal" />
      </div>
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

    <Modal
      :fixed="fixed"
      :isEditing="isEditing"
      entityName="Fichas"
      iconName="school"
      @update:fixed="(val) => (fixed = val)"
    >
      <template v-slot:modal-content>
        <q-input
          filled
          v-model="ficheName"
          label="Nombre de Ficha"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="note" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="ficheNumber"
          label="Cod. Ficha"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="confirmation_number" />
          </template>
        </q-input>
      </template>
    </Modal>
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