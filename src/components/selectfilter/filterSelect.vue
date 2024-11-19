<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    fetchOptions: {
        type: Function,
        required: true
    },
    optionDisable: {
        type: Function,
        default: () => false
    },
    value: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['update:modelValue', 'filter']);

const selectedValue = ref(null);
const options = ref([]);
const originalOptions = ref([]);

// Carga las opciones al montar el componente si fetchOptions es una función

async function loadOptions() {
    if (typeof props.fetchOptions === 'function') {
        originalOptions.value = await props.fetchOptions();
        options.value = originalOptions.value;
    } else {
        originalOptions.value = [];
        options.value = [];
    }
}

function filterOptions(val, update) {
    if (val === '') {
        update(() => {
            options.value = originalOptions.value;
        });
        return;
    }

    update(() => {
        const needle = val.toLowerCase();
        options.value = originalOptions.value.filter(
            option => option.label.toLowerCase().indexOf(needle) > -1
        );
    });
}

watch(selectedValue, (newValue) => {
    emit('update:modelValue', newValue);
});

// Observa cambios en fetchOptions y recarga las opciones
watch(() => props.fetchOptions, async () => {
    await loadOptions();
}, { immediate: true });

const useInput = computed(() => {
    return selectedValue.value === null || selectedValue.value === '';
});

</script>

<template>
    <div class="select-container">
        <q-select filled label-color="green-10" color="green-7" class="input" v-model="selectedValue" :options="options"
            emit-value option-label="label" :option-value="value" map-options :label="label" :use-input="useInput"
            input-debounce="300" @filter="filterOptions" use-chips>
            <template v-slot:prepend>
                <q-icon color="green-10" name="list" />
            </template>
        </q-select>
        <q-btn round dense icon="search" @click="$emit('filter')" class="search-button" />
    </div>
</template>

<style scoped>
.select-container {
    display: flex;
    align-items: center;
}

.input {
    max-width: 300px;
    min-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.search-button {
    margin-left: 8px;
    color: green;
}
</style>