<template>
  <div style="width:90%">
    <q-table :rows="rows" :columns="columns" flat bordered class="styled-table">
      <!-- Celda de edición -->
      <template v-slot:body-cell-editar="props">
        <q-td :props="props" class="q-pa-sm">
          <q-btn class="edit-btn q-pa-sm" @click="onClickEdit(props.row)">
            <q-icon name="edit" />
          </q-btn>
        </q-td>
      </template>

      <!-- Slot para la columna 'opciones' -->
      <template v-slot:body-cell-opciones="props">
              <q-td :props="props">
                  <!-- Botón de edición -->
                  <q-btn @click="openEditModal(props.row)" class="buttonsTable">
                      <q-icon name="edit" class="icon-edit"></q-icon>
                  </q-btn>

                  <!-- Botón de activación -->
                  <q-btn @click="activate(props.row._id)" v-if="props.row.status == 0" class="buttonsTable">
                      <q-icon name="check" class="icon-activate"></q-icon>
                  </q-btn>


                  <!-- Botón de desactivación con spinner -->
                  <q-btn @click="deactivate(props.row._id)" v-else class="buttonsTable button-deactivate">
                      <q-icon name="close" class="icon-deactivate"></q-icon>
                  </q-btn>
              </q-td>
          </template>

          <!-- Slot para la columna 'estado' -->
          <template v-slot:body-cell-status="props">
                <q-td :props="props">
                    <p style="color:green" v-if="props.row.status == 1">Activo</p>
                    <p style="color:red" v-else>Inactivo</p>
                </q-td>
            </template>
      <!-- Celda de activación/desactivación -->
      <template v-slot:body-cell-activar="props">
        <q-td :props="props" v-if="props.row.estado == 1" class="q-pa-sm">
          <q-btn class="deactivate-btn q-pa-sm">
            <q-icon name="close" />
          </q-btn>
        </q-td>
        <q-td :props="props" v-else class="q-pa-sm">
          <q-btn class="activate-btn q-pa-sm">
            <q-icon name="check" />
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
const props = defineProps({
  rows: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  onClickEdit: {
    type: Function,
    required: true
  },
  activate: {
      type: Function,
      required: true
  },
  deactivate: {
      type: Function,
      required: true
  }

});
</script>

<style scoped>
/* Estilo general de la tabla */
.styled-table {
  font-family: 'Arial', sans-serif;
  font-size: 40px; /* Tamaño de texto más grande */
  color: #333;
  border-collapse: collapse;
  font-weight: bold; /* Texto en negrita */
}

/* Estilos de las celdas */
.q-td {
  padding: 12px 8px;
  text-align: center;
  vertical-align: middle;
  font-weight: bold; /* Texto en negrita */
}

/* Estilos de botones */
.q-btn {
  font-size: 15px; /* Tamaño más grande para los íconos */
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

/* Botón de editar */
.edit-btn {
  background-color: #2196F3;
}

.edit-btn:hover {
  background-color: #1976D2;
}

/* Botón de desactivación */
.deactivate-btn {
  background-color: #f44336;
}

.deactivate-btn:hover {
  background-color: #d32f2f;
}

/* Botón de activación */
.activate-btn {
  background-color: #4CAF50;
}

.activate-btn:hover {
  background-color: #388E3C;
}
.icon-edit {
  color: #1f7d22;
}

.icon-activate {
  color: #339536;
  font-weight: bold;
}

.icon-deactivate {
  color: #F44336;
  font-weight: bold;
}

</style>