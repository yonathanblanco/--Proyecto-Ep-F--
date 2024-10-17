<template>
    <div class="col-xs-12 col-sm-6 col-md-3">
        <q-card class="cards" flat bordered>
            <q-img class="img" :src="imageSRC" />
            <q-card-section class="section">
                <q-card-titles class="tittles">{{ titles }}</q-card-titles>
            </q-card-section>
            <q-card-actions class="buttons-background">
                <q-btn flat color="white" class="buttons" :to="to">
                    Ver
                </q-btn>
            </q-card-actions>
        </q-card>
    </div>
</template>

<script setup>
const props = defineProps({
    titles: {
        type: String,
        required: true
    },
    imageSRC: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }
});
</script>

<style scoped>
.cards:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.buttons-background {
    background-color: #ffffffd0;
}

.buttons:hover {
    background-color: #38803a;
}

.cards {
    display: flex;
    flex-direction: column;
    border: 1px solid #38803a; /* Cambiar borde a color verde */
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin: 10px;
    width: 450px;
}

.tittles {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    margin: 5px 0;
    background-color: transparent;
}

.section {
    background-color: #ffffffd0;
    text-align: center;
}

.buttons {
    background-color: #2E7D32;
    font-size: 15px;
    width: 100%;
    border-radius: 10px;
    padding: 10px 0;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 15px 15px 0 0;
}
</style>