<script setup>
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { getRepforaData } from "../services/apiRepfora";
import Title from "../components/tittle/tittle.vue";
import ButtonBack from '../components/buttons/buttonBack.vue';

const fixed = ref(false);
const $q = useQuasar();

const group = ref("");
const selectedFilter = ref("");
const rows = ref([]);

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
    style: "width: 20%;  ",
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
  },
  {
    name: "verAprendices",
    align: "center",
    label: "VER APRENDICES",
    style: "width: 20%; text-align: center;",
  },
]);

async function getFiches() {
  const storedAuth = localStorage.getItem("auth");
  const token = storedAuth ? JSON.parse(storedAuth) : null;
  const res = await getRepforaData("/fiches");
  rows.value = res.map((item, index) => ({
    ...item,
    index: index + 1,
    concatenated: `${item.program?.name || "Sin Nombre"} - ${item.number || "Sin Código"}`
  }));
}

const fetchFicheOptions = async () => {
  const res = await getRepforaData("/fiches");
  return res.map(fiche => ({
    label: `${fiche.program?.name} - ${fiche.number}`,
    value: fiche.id
  }));
};

const filter = () => {
  const selectedFiche = rows.value.find(row => row.id === group.value);

  if (selectedFiche) {
    rows.value = [selectedFiche]; // Mostrar solo la ficha seleccionada
    $q.notify({
      type: "positive",
      message: "Filtro aplicado correctamente."
    });
  } else {
    $q.notify({
      type: "warning",
      message: "No se encontraron resultados para el filtro seleccionado."
    });
  }
};

function viewApprentices(ficheId) {
  console.log("Viewing apprentices for fiche:", ficheId);
}
</script>

<template>
  <div class="q-pa-md">
    <div class="q-mb-md">
      <ButtonBack />
      <Title title="FICHAS" />
    </div>

    <div class="divFiltersAndButtons">
      <div class="filters">
        <div class="divFilter">
          <filterSelect
            label="Buscar ficha"
            :fetchOptions="fetchFicheOptions"
            v-model="group"
            @filter="filter"
          />
        </div>
      </div>
    </div>

    <q-table
      :rows="rows"
      :columns="columns"
      row-key="id"
      flat
      bordered
      :pagination="{ rowsPerPage: 7 }"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props" class="text-center">
          <q-chip
            :color="props.row.status === 'Activa' ? 'green' : 'red'"
            text-color="white"
            class="status-chip"
          >
            {{ props.row.status === 'Activa' ? 'Activa' : 'Inactiva' }}
          </q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-verAprendices="props">
        <q-td :props="props" class="text-center">
          <q-btn
            flat
            round
            color="green"
            icon="visibility"
            @click="viewApprentices(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style scoped>
.q-table {
  background-color: white;
}

.q-table th {
  font-weight: bold;
  font-size: 14px;
  color: #000000;
  background-color: #f5f5f5;
}

.q-table td {
  font-size: 14px;
  color: #000000;
}

.status-chip {
  min-width: 80px;
}

:deep(.q-table__bottom) {
  border-top: 1px solid #e0e0e0;
}

:deep(.q-table__container) {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
</style>