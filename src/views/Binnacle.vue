<script setup>
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { getRepforaData } from "../services/apiRepfora";
import Title from "../components/tittle/tittle.vue";
import ButtonBack from '../components/buttons/buttonBack.vue';

const fixed = ref(false);
const $q = useQuasar();

// Nuevas variables para los filtros
const filterType = ref('aprendiz');
const searchText = ref('');


onBeforeMount(() => {
  getBitacoras();
});

const columns = ref([
  {
    name: "index",
    align: "center",
    label: "N°",
    field: "index",
    sortable: false,
    style: "width: 5%; text-align: center;",
  },
  {
    name: "stage",
    align: "left",
    label: "ETAPA PRODUCTIVA ASIGNADA",
    field: "stage",
    sortable: true,
    style: "width: 20%;",
  },
  {
    name: "date",
    align: "center",
    label: "FECHA",
    field: "date",
    sortable: true,
    style: "width: 10%; text-align: center;",
  },
  {
    name: "bitacoraNumber",
    align: "center",
    label: "N° BITACORA",
    field: "bitacoraNumber",
    sortable: true,
    style: "width: 10%; text-align: center;",
  },
  {
    name: "instructor",
    align: "center",
    label: "INSTRUCTOR",
    field: "instructor",
    sortable: true,
    style: "width: 15%; text-align: center;",
  },
  {
    name: "status",
    align: "center",
    label: "ESTADO",
    field: "status",
    sortable: true,
    style: "width: 10%; text-align: center;",
  },
  {
    name: "actions",
    align: "center",
    label: "OBSERVACIONES",
    style: "width: 10%; text-align: center;",
  },
]);

const rows = ref([]);
const searchTerm = ref('');

async function getBitacoras() {
  const storedAuth = localStorage.getItem('auth');
  const token = storedAuth ? JSON.parse(storedAuth) : null;
  const res = await getRepforaData("/binnacles/listarbinnacles");
  rows.value = res.map((item, index) => ({
    ...item,
    index: index + 1
  }));
};

function viewDetails(rowId) {
  console.log("Viewing details for row:", rowId);
}

function handleSearch() {
  // Implementar lógica de búsqueda basada en filterType y searchText
  console.log('Buscando:', filterType.value, searchText.value);
}
</script>

<template>
  <div class="q-pa-md">
    <div class="q-mb-md">
      <ButtonBack />
      <Title title="Bitácoras" />
    </div>

    <!-- Nuevo componente de filtros -->
    <div class="filter-section q-mb-md">
      <div class="filter-controls q-mt-md">
        <div class="text-subtitle2 q-mb-sm">Realizar filtro por</div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-8">
            <q-radio v-model="filterType" val="ficha" label="Ficha" color="green-9" />
            <q-radio v-model="filterType" val="aprendiz" label="Aprendiz" color="green-9" />
            <q-radio v-model="filterType" val="estado" label="Estado" color="green-9" />
          </div>
          <div class="col-12 col-md-4">
            <q-input 
              outlined 
              v-model="searchText"
              placeholder="Ingrese el nombre o número de documento"
              dense
              @input="handleSearch"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </div>

    <q-table
      :rows="rows"
      :columns="columns"
      :filter="searchTerm"
      row-key="id"
      flat
      bordered
      :pagination="{ rowsPerPage: 7 }"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props" class="text-center">
          <q-select
            v-model="props.row.status"
            :options="['Pendiente', 'Ejecutada']"
            outlined
            dense
            style="width: 100px;"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="text-center">
          <q-btn flat round color="green" icon="visibility" @click="viewDetails(props.row.id)" />
          <q-btn flat round color="green" icon="add" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style scoped>
.q-table {
  background-color: #ffffff;
}

.q-table th {
  font-weight: bold;
  font-size: 14px;
  color: #000000;
  background-color: #f5f5f5;
  border-bottom: 2px solid #4caf50;
}

.q-table td {
  font-size: 14px;
  color: #000000;
}

.filter-container {
  display: flex;
  align-items: center;
}

.filter-section {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.q-input {
  margin-left: auto;
}
</style>