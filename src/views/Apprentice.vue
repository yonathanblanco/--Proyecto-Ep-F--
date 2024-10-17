
<script setup>
import Table from "../components/tables/table.vue"
import ButtonOpenModal from '../components/buttons/buttonOpenModal.vue';
import { ref } from "vue"

let title = ref("APRENDICES")
let alert = ref(false)

const columns = ref([
  {
    name: "numero",
    label: "Numero de factura",
    field: "numero",
    align: "center",
  },
  {
    name: "fecha",
    required: true,
    label: "Fecha de factura",
    align: "center",
    field: "fecha",
    sortable: true,
  },
  {
    name: "comprador",
    align: "center",
    label: "Nombre comprador",
    field: "comprador",
    sortable: true,
  },
  { name: "total", label: "Valor Total", align: "center", field: "total" },
  { name: "estado", label: "Estado", align: "center", field: "estado" },
  { name: "editar", label: "Editar", align: "center", field: "editar" },
  { name: "activar", label: "Activar/Desactivar", align: "center", field: "activar" },
]);

const rows = ref([
  {
    numero: "123",
    fecha: "19-02-2024",
    comprador: "Alex Guevara",
    total: 334000,
    estado: 1
  },
  {
    numero: "124",
    fecha: "20-02-2024",
    comprador: "Luis Medina",
    total: 334000,
    estado: 1
  },
  {
    numero: "125",
    fecha: "21-02-2024",
    comprador: "Alfredo Gutierrez",
    total: 334000,
    estado: 0
  },
  {
    numero: "126",
    fecha: "22-02-2024",
    comprador: "Matias Garnica",
    total: 334000,
    estado: 0
  },
  {
    numero: "127",
    fecha: "23-02-2024",
    comprador: "Cristian Tarasona",
    total: 334000,
    estado: 0
  },
]);

function openDialog(row){
  alert.value=true
  console.log(row);
}

</script> 

<template>
  <div style="display: flex; justify-content: center; padding:10px">
    <Table :rows="rows" :columns="columns" :title="title" :onClickEdit="openDialog"></Table>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

  <div>
      <ButtonOpenModal 
        titles="CREAR" 
        icon="add" 
      />
    </div>
</template>

