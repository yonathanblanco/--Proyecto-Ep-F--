<script setup>
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { getData, putData } from "../services/apiClient";
import Table from "../components/tables/tablestatus.vue";
import ButtonBack from "../components/buttons/buttonBack.vue";
import Title from "../components/tittle/tittle.vue";
import Modal from "../components/modal/modal.vue";

const fixed = ref(false);
const isEditing = ref(false);
const $q = useQuasar();

// Nuevas variables para los filtros
const filterType = ref('aprendiz');
const searchText = ref('');

onBeforeMount(() => {
  getApprentices();
});

const columns = ref([
  {
    name: "tpdocument",
    required: true,
    align: "center",
    label: "Tipo de Documento",
    field: "tpdocument",
    sortable: true,
    style: "width: 5%; text-align: center;",
  },
  {
    name: "numdocument",
    required: true,
    align: "center",
    label: "Num. Documento",
    field: "numdocument",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "firstname",
    required: true,
    align: "center",
    label: "Nombre",
    field: "firstname",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "lastname",
    required: true,
    align: "center",
    label: "Apellido",
    field: "lastname",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "phone",
    align: "center",
    label: "Teléfono",
    field: "phone",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "personalEmail",
    required: true,
    align: "center",
    label: "Email Personal",
    field: "personalEmail",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "institucionalEmail",
    required: true,
    align: "center",
    label: "Email Institucional",
    field: "institucionalEmail",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "ficheName",
    align: "center",
    label: "Nombre de Ficha",
    field: (row) => row.fiche?.name || "",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "ficheNumber",
    align: "center",
    label: "Num. Ficha",
    field: (row) => row.fiche?.number || "",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "status",
    align: "center",
    label: "Estado",
    field: "status",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "opciones",
    required: true,
    align: "center",
    label: "Opciones",
    style: "width: 20%; text-align: center;",
  },
]);

const rows = ref([]);

async function getApprentices() {
  const storedAuth = localStorage.getItem("auth");
  const token = storedAuth ? JSON.parse(storedAuth) : null;
  console.log(token.token);
  const res = await getData("apprentice/listallapprentice");
  rows.value = res;
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

async function activate(id) {
  const res = await putData(`apprentice/enableapprentice/${id}`);
  console.log(res);
  await getApprentices();
}

async function deactivate(id) {
  const res = await putData(`apprentice/disableapprentice/${id}`);
  console.log(res);
  await getApprentices();
}

// Nuevas funciones para manejar la subida de archivos y la búsqueda
function handleFileUpload() {
  // Implementar lógica de subida de archivos
  console.log('Subida de archivo iniciada');
}

function handleSearch() {
  // Implementar lógica de búsqueda basada en filterType y searchText
  console.log('Buscando:', filterType.value, searchText.value);
}
</script>

<template>
  <div class="q-gutter-md divMain">
    <div>
      <ButtonBack />
      <Title title="APRENDICES" />
    </div>

    <!-- Nuevo componente de filtros -->
    <div class="filter-section q-mb-md">
      <div class="q-gutter-md">
        <q-btn 
          icon="add" 
          label="Crear" 
          color="green-9"
          class="text-white"
          @click="openAddModal"
        />
        <q-btn 
          icon="upload_file" 
          label="Subir Archivo" 
          color="green-9"
          class="text-white"
          @click="handleFileUpload"
        />
      </div>

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

    <div>
      <Table 
        :rows="rows" 
        :columns="columns" 
        :openEditModal="edit" 
        :activate="activate" 
        :deactivate="deactivate" 
      />
    </div>
    <Modal 
      :fixed="fixed" 
      :isEditing="isEditing" 
      entityName="Aprendices" 
      iconName="school"
      @update:fixed="(val) => (fixed = val)"
    >
      <template v-slot:modal-content>
        <q-input filled v-model="tpDocument" label="Tipo de Documento" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="assignment" />
          </template>
        </q-input>
        
        <q-input filled v-model="numDocument" label="Num. Documento" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="confirmation_number" />
          </template>
        </q-input>

        <q-input filled v-model="firstName" label="Nombre" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="person" />
          </template>
        </q-input>

        <q-input filled v-model="lastName" label="Apellido" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="person_outline" />
          </template>
        </q-input>

        <q-input filled v-model="phone" label="Teléfono" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="phone" />
          </template>
        </q-input>

        <q-input filled v-model="email" label="Email Personal" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="email" />
          </template>
        </q-input>

        <q-input filled v-model="emailInstitucional" label="Email Institucional" class="input thin-input"
          label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="email" />
          </template>
        </q-input>

        <q-input filled v-model="modality" label="Modalidad Epata Productiva" class="input thin-input"
          label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="book" />
          </template>
        </q-input>

        <q-input filled v-model="fiche" label="Ficha" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="note" />
          </template>
        </q-input>
      </template>
    </Modal>
  </div>
</template>
<style scoped>
.input {
  margin: 7px 0;
  color: "green";
  border-color: "green";
}

.divMain {
  padding: 0 1.5%;
  margin-top: 20px;
}

.filter-section {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.filter-controls {
  border-top: 1px solid #e0e0e0;
  padding-top: 1rem;
}
</style>