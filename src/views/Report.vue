<script setup>
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { getData, putData } from "@/services/apiClient";
import Table from "@/components/tables/tablestatus.vue";
import Title from "@/components/tittle/tittle.vue";
import Modal from "@/components/modal/modal.vue";
import ButtonBack from '@/components/buttons/buttonBack.vue';

const fixed = ref(false);
const isEditing = ref(false);
const $q = useQuasar();

onBeforeMount(() => {
  getApprentices();
});

const columns = ref([
  { name: "number", align: "center", label: "N°", field: "number" },
  { name: "firstname", align: "center", label: "Nombre Aprendiz", field: "firstname", sortable: true },
  { name: "tpdocument", align: "center", label: "Tipo Documento", field: "tpdocument", sortable: true },
  { name: "numdocument", align: "center", label: "N° Documento", field: "numdocument", sortable: true },
  { name: "personalEmail", align: "center", label: "Email Personal", field: "personalEmail", sortable: true },
  { name: "institucionalEmail", align: "center", label: "Email Institucional", field: "institucionalEmail", sortable: true },
  { name: "phone", align: "center", label: "Teléfono", field: "phone", sortable: true },
  { name: "ficheName", align: "center", label: "Ficha", field: (row) => row.fiche?.name || "" },
  { name: "ficheNumber", align: "center", label: "Cod. Ficha", field: (row) => row.fiche?.number || "" },
  { name: "status", align: "center", label: "Estado", field: "status", format: (val) => val === "Activo" ? `<span class="status-active">Activo</span>` : `<span class="status-inactive">Inactivo</span>` },
]);

const rows = ref([]);

async function getApprentices() {
  const res = await getData("apprentice/listallapprentice");
  rows.value = res.map((item, index) => ({ ...item, number: index + 1 }));
}

function printReport() {
  window.print();
}
</script>

<template>
    <div class="q-gutter-md divMain">
      <div class="header-container">
        <ButtonBack class="button-back" />
        <Title title="Informe de Aprendices por Ficha" />
      </div>
  
      <div class="table-container">
        <Table
          :rows="rows"
          :columns="columns"
          :openEditModal="edit"
          :activate="activate"
          :deactivate="deactivate"
        />
        <div class="print-button-container">
          <q-btn
            label="Informe"
            icon="print"
            color="green"
            @click="printReport"
          />
        </div>
      </div>
  
      <Modal
        :fixed="fixed"
        :isEditing="isEditing"
        entityName="Aprendices"
        iconName="school"
        @update:fixed="(val) => (fixed = val)"
      >
        <template v-slot:modal-content>
          <q-input
            filled
            v-model="formData.firstname"
            label="Nombre Aprendiz"
            dense
            class="q-mb-sm"
          />
          <q-select
            filled
            v-model="formData.tpdocument"
            label="Tipo de Documento"
            :options="[ { label: 'Cédula de Ciudadanía', value: 'CC' }, { label: 'Tarjeta de Identidad', value: 'TI' }, { label: 'Cédula de Extranjería', value: 'CE' } ]"
            dense
            class="q-mb-sm"
          />
          <q-input
            filled
            v-model="formData.numdocument"
            label="Número de Documento"
            type="number"
            dense
            class="q-mb-sm"
          />
          <q-input
            filled
            v-model="formData.personalEmail"
            label="Email Personal"
            type="email"
            dense
            class="q-mb-sm"
          />
          <q-input
            filled
            v-model="formData.institucionalEmail"
            label="Email Institucional"
            type="email"
            dense
            class="q-mb-sm"
          />
          <q-input
            filled
            v-model="formData.phone"
            label="Teléfono"
            type="tel"
            dense
            class="q-mb-sm"
          />
          <q-input
            filled
            v-model="formData.ficheName"
            label="Nombre de la Ficha"
            dense
            class="q-mb-sm"
          />
          <q-input
            filled
            v-model="formData.ficheNumber"
            label="Código de la Ficha"
            dense
            class="q-mb-sm"
          />
          <q-select
            filled
            v-model="formData.status"
            label="Estado"
            :options="[ { label: 'Activo', value: 'Activo' }, { label: 'Inactivo', value: 'Inactivo' } ]"
            dense
            class="q-mb-sm"
          />
        </template>
      </Modal>
    </div>
  </template>
  
  <style scoped>
  .divMain {
    padding: 0 1.5%;
    margin-top: 20px;
  }
  
  .header-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .button-back {
    margin-right: auto;
  }
  
  .header-container > * {
    margin-right: auto;
  }
  
  .table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  .print-button-container {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    margin-left: 82.8%;
    width: 100%;
  }
  
  .status-active {
    color: white;
    background-color: green;
    padding: 2px 5px;
    border-radius: 3px;
  }
  
  .status-inactive {
    color: white;
    background-color: red;
    padding: 2px 5px;
    border-radius: 3px;
  }
  </style>