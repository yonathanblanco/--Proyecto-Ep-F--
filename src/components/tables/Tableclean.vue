<script setup>
const props = defineProps({
    rows: {
        type: Array,
        required: true
    },
    columns: {
        type: Array,
        required: true
    }
});
</script>

<template>
    <div>
        <q-table class="tabla" :rows="rows" :columns="columns" row-key="name" flat bordered>
            <!-- Slot para la cabecera -->
            <template v-slot:header-cell="props">
                <q-th :props="props" class="customHeader">
                    {{ props.col.label }}
                </q-th>
            </template>

            <!-- Slot para las celdas del cuerpo -->
            <template v-slot:body-cell="props">
                <q-td :props="props" >
                    <!-- Verificar si la columna tiene una función de campo -->
                    <template v-if="typeof props.col.field === 'function'">
                        {{ props.col.field(props.row) }}
                    </template>
                    <template v-else>
                        {{ props.row[props.col.name] }}
                    </template>
                </q-td>
            </template>
        </q-table>
    </div>
</template>

<style scoped>
/* Icons */
.buttonsTable {
    height: 20px;
    width: 40px;
    border-radius: 50%;
}

/* table */
.tabla {
    width: 100%;
}

.titleColumn {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    text-align: center;
}

.customHeader {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    text-align: center;
}


</style>