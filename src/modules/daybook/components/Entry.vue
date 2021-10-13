<template>
    <div 
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({name:'entry', params: {id: 10}})"
    >
    <!-- Título -->
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">12</span>
            <span class="mx-1 fs-5">Octubre</span>
            <span class="mx-2 fw-light">2021, martes</span>

        </div>

        <div class="entry-description">
            Los leones son los únicos felinos que viven en manada. Las unidades familiares pueden incluir hasta tres machos, una docena de hembras y sus crías. Todas las leonas de una manada están emparentadas y usualmente los pequeñas hembras en su seno se quedan con el grupo a medida que envejecen. Los varones jóvenes sin embargo tarde o temprano abandonan el grupo o son expulsados y establecen su propia manada.
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.entry-container {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;

    }

    .entry-description{
        font-size: 12px;
    }
}
</style>