<script setup>
import { ref, onBeforeMount } from "vue";
import { format, useQuasar } from "quasar";
import { getData, putData } from "../services/apiClient";
import Table from "../components/tables/tablestatus.vue";
import buttonAdd from "../components/buttons/buttonAdd.vue";
import Title from "../components/tittle/tittle.vue";
import Modal from "../components/modal/modal.vue";
import ButtonBack from "../components/buttons/buttonBack.vue";

const fixed = ref(false);
const isEditing = ref(false);
const $q = useQuasar();

const tpDocument = ref('');
const numDocument = ref('');
const firstName = ref('');
const lastName = ref('');
const phone = ref('');
const email = ref('');
const emailInstitucional = ref('');
const modality = ref('');
const fiche = ref('');

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
  },
  {
    name: "numdocument",
    required: true,
    align: "center",
    label: "Num. Documento",
    field: "numdocument",
    sortable: true,
  },
  {
    name: "firstname",
    required: true,
    align: "center",
    label: "Nombre",
    field: "firstname",
    sortable: true,
  },
  {
    name: "lastname",
    required: true,
    align: "center",
    label: "Apellido",
    field: "lastname",
    sortable: true,
  },
  {
    name: "phone",
    align: "center",
    label: "Teléfono",
    field: "phone",
    sortable: true,
  },
  {
    name: "personalEmail",
    required: true,
    align: "center",
    label: "Email Personal",
    field: "personalEmail",
    sortable: true,
  },
  {
    name: "institucionalEmail",
    required: true,
    align: "center",
    label: "Email Institucional",
    field: "institucionalEmail",
    sortable: true,
  },
  {
    name: "ficheName",
    align: "center",
    label: "Nombre de Ficha",
    field: (row) => row.fiche?.name || "",
    sortable: true,
  },
  {
    name: "ficheNumber",
    align: "center",
    label: "Num. Ficha",
    field: (row) => row.fiche?.number || "",
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
    name: "opciones",
    required: true,
    align: "center",
    label: "Opciones",
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
}

function edit(row) {
  fixed.value = true;
  isEditing.value = true;

  tpDocument.value = row.tpdocument;
  numDocument.value = row.numdocument;
  firstName.value = row.firstname;
  lastName.value = row.lastname;
  phone.value = row.phone;
  email.value = row.personalEmail;
  emailInstitucional.value = row.institucionalEmail;
  modality.value = row.modality;
  fiche.value = row.fiche ? row.fiche.name : '';
}

async function save() {
  const apprenticeData = {
    tpdocument: tpDocument.value,
    numdocument: numDocument.value,
    firstname: firstName.value,
    lastname: lastName.value,
    phone: phone.value,
    personalEmail: email.value,
    institucionalEmail: emailInstitucional.value,
    modality: modality.value,
    fiche: fiche.value,
  };

  try {
    if (isEditing.value) {
      // Actualización
      const res = await putData(`apprentice/updateapprenticebyid/:id${row.id}`, apprenticeData);
      console.log('Apprentice updated', res);
    } else {
      // Creación
      const res = await postData("apprentice/addapprentice", apprenticeData);
      console.log('Apprentice created', res);
    }
    await getApprentices();
    fixed.value = false;
  } catch (error) {
    console.error('Error saving apprentice', error);
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
      <div>
        <buttonAdd :openAddModal="openAddModal" />
      </div>
    </div>

    <div>
      <Table :rows="rows" :columns="columns" :openEditModal="edit" :activate="activate" :deactivate="deactivate" />
    </div>

    <Modal v-model:fixed="fixed" :isEditing="isEditing" entityName="Aprendices" iconName="school"
      @update:fixed="(val) => (fixed = val)">
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
/* Inputs */

.input {
  margin: 7px 0;
  color: "green";
  border-color: "green";
}

/* divs */
.divMain {
  padding: 0 1.5%;
  margin-top: 20px;
}
</style>