<script setup>
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { getData, putData, postData } from "../services/apiClient";
import Table from "../components/tables/tablestatus.vue";
import ButtonBack from "../components/buttons/buttonBack.vue";
import Title from "../components/tittle/tittle.vue";
import Modal from "../components/modal/modal.vue";

const fixed = ref(false);
const isEditing = ref(false);
const $q = useQuasar();

let tpDocument = ref("");
let numDocument = ref("");
let firstName = ref("");
let lastName = ref("");
let personalEmail = ref("");
let phone = ref("");
let ficheName = ref("");
let ficheNumber = ref("");
let name = ref("");

onBeforeMount(() => {
  getApprentices();
});

const columns = ref([
  {
    name: "tpDocument",
    required: true,
    align: "center",
    label: "Tipo de Documento",
    field: "tpDocument",
    sortable: true,
    style: "width: 5%; text-align: center;",
  },
  {
    name: "numDocument",
    required: true,
    align: "center",
    label: "Num. Documento",
    field: "numDocument",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "firstName",
    required: true,
    align: "center",
    label: "Nombre",
    field: "firstName",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "lastName",
    required: true,
    align: "center",
    label: "Apellido",
    field: "lastName",
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
    name: "name",
    align: "center",
    label: "Modalidad",
    field: (row) => row.modality?.name || "",
    sortable: true,
    style: "width: 20%; text-align: center;",
  },
  {
    name: "opciones",
    align: "center",
    label: "Opciones",
    field: "opciones",
    style: "width: 15%; text-align: center;",
  },
]);

const rows = ref([]);

async function getApprentices() {
  const storedAuth = localStorage.getItem("auth");
  const token = storedAuth ? JSON.parse(storedAuth) : null;

  if (!token || !token.token) {
    console.error("No token found");
    return;
  }

  try {
    const res = await getData("apprentice/listallapprentice");
    rows.value = res;
    console.log(res);
  } catch (error) {
    console.error("Error fetching apprentices", error);
  }
}

function openAddModal() {
  fixed.value = true;
  isEditing.value = false;
  tpDocument.value = "";
  numDocument.value = "";
  firstName.value = "";
  lastName.value = "";
  phone.value = "";
  personalEmail.value = "";
  ficheName.value = "";
  ficheNumber.value = "";
  name.value = "";
}

function edit(row) {
  fixed.value = true;
  isEditing.value = true;
  tpDocument.value = row.tpDocument;
  numDocument.value = row.numDocument;
  firstName.value = row.firstName;
  lastName.value = row.lastName;
  phone.value = row.phone;
  personalEmail.value = row.personalEmail;
  name.value = row.modality?.name;
  ficheName.value = row.fiche?.name;
  ficheNumber.value = row.fiche?.number;
}

async function save() {
  const apprenticeData = {
    tpDocument: tpDocument.value,
    numDocument: numDocument.value,
    firstName: firstName.value,
    lastName: lastName.value,
    phone: phone.value,
    personalEmail: personalEmail.value,
    modality: name.value,
    fiche: {
      name: ficheName.value,
      number: ficheNumber.value,
    },
  };

  try {
    if (isEditing.value) {
      const res = await putData(`apprentice/updateapprenticebyid/${numDocument.value}`, apprenticeData);
      console.log("Apprentice updated", res);
    } else {
      const res = await postData("apprentice/addapprentice", apprenticeData);
      console.log("Apprentice created", res);
    }
    await getApprentices();
    fixed.value = false;
  } catch (error) {
    console.error("Error saving apprentice", error);
  }
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

    <Modal :fixed="fixed" :isEditing="isEditing" entityName="Aprendices" iconName="school"
      @update:fixed="(val) => (fixed = val)" @save="save">
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

        <q-input filled v-model="personalEmail" label="Email Personal" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="email" />
          </template>
        </q-input>

        <q-input filled v-model="name" label="Modalidad Epata Productiva" class="input thin-input"
          label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="book" />
          </template>
        </q-input>

        <q-input filled v-model="ficheName" label="Nombre de Ficha" class="input thin-input" label-color="green-9">
          <template v-slot:prepend>
            <q-icon color="green-10" name="note" />
          </template>
        </q-input>

        <q-input filled v-model="ficheNumber" label="Num. Ficha" class="input thin-input" label-color="green-9">
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