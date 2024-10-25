<script setup>
import Table from "../components/tables/tableStatus.vue";
import buttonAdd from "../components/buttons/buttonAdd.vue";
import Title from "../components/tittle/tittle.vue";
import { ref, onMounted } from "vue";
import { getData } from "../services/apiClient.js";

const fixed = ref(false);
const isEditing = ref(false);

const rows = ref([]);


let alert = ref(false);

const columns = ref([
  {
    name: "fiche",
    label: "Ficha",
    field: "fiche",
    align: "center",
    field: (row) => row.fiche.name,
  },
  {
    name: "tpdocument",
    label: "Tipo Documento",
    align: "center",
    field: "tpdocument",
    sortable: true,
  },
  {
    name: "numdocument",
    align: "center",
    label: "Número Documento",
    field: "numdocument",
    sortable: true,
  },
  {
    name: "firstname",
    label: "Nombre",
    align: "center",
    field: "firstname",
    sortable: true,
  },
  {
    name: "lastname",
    label: "Apellido",
    align: "center",
    field: "lastname",
    sortable: true,
  },
  {
    name: "phone",
    label: "Teléfono",
    align: "center",
    field: "phone",
    sortable: true,
  },
  {
    name: "email",
    label: "Correo Electrónico",
    align: "center",
    field: "email",
    sortable: true,
  },
  {
    name: "modality",
    label: "Modalidad",
    align: "center",
    field: "modality",
    sortable: true,
  },
  {
    name: "status",
    label: "Estado",
    align: "center",
    field: "status",
    sortable: true,
  },
  { name: "editar", label: "Editar", align: "center", field: "editar" },
  {
    name: "activar",
    label: "Activar/Desactivar",
    align: "center",
    field: "activar",
  },
]);

async function getApprentices() {
  let res = await getData("apprentice/listallapprentice");
  rows.value = res;
  console.log(res);
}

onMounted(() => {
  getApprentices();
});

function openAddModal(row) {
  alert.value = true;
  console.log(row);
}


</script>

<template>
  <div>
    <Title title="APRENDICES" />

    
    <div>
      <buttonAdd :openAddModal="openAddModal" />
    </div>
    <div style="display: flex; justify-content: center; padding: 10px">
      <Table :rows="rows" :columns="columns" :onClickEdit="openDialog" />
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="text-h6">Alerta</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
            perferendis totam, ea at omnis vel numquam exercitationem aut, natus
            minima, porro la
          </q-card-section>

          <ModalCreateUpdate
      :fixed="fixed"
      :isEditing="isEditing"
      entityName="Aprendices"
      iconName="school"
      @update:fixed="(val) => (fixed = val)"
    >
      <template v-slot:modal-content>
        <q-input
          filled
          v-model="tpDocument"
          label="Tipo de Documento"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="assignment" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="numDocument"
          label="Num. Documento"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="confirmation_number" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="firstName"
          label="Nombre"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="person" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="lastName"
          label="Apellido"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="person_outline" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="phone"
          label="Teléfono"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="phone" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="email"
          label="Email"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="email" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="ficheName"
          label="Nombre de Ficha"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="book" />
          </template>
        </q-input>

        <q-input
          filled
          v-model="ficheNumber"
          label="Num. Ficha"
          class="input thin-input"
          label-color="green-9"
        >
          <template v-slot:prepend>
            <q-icon color="green-10" name="note" />
          </template>
        </q-input>
      </template>
    </ModalCreateUpdate>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>