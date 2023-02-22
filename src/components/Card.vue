<script>
export default {};
</script>

<template>
    <div class="card">
        <div class="picture">
            <slot name="picture"></slot>
        </div>
        <div class="description">
            <slot name="name"></slot>
            <slot name="desc"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    width: 12rem;
    height: 16rem;
    border-radius: 5%;
    border-color: white;
    // border-style: dashed;
    padding: 1rem;

    >.picture {
        width: 100%;
        height: 70%;
        background-color: white;
        border-radius: 5%;
        overflow: hidden;
        display: flex;
        justify-content: center;

        >img {
            object-fit: cover;
            object-position: center;
        }
    }

    >.description {
        width: 100%;
        height: 30%;
        border-radius: 15%;
        color: white;
    }
}

.card:hover {
    background-color: #383A3F;
}
</style>