<script>
export default {};
</script>

<template>
    <div class="card">
        <div class="picture">
            <slot name="picture"></slot>
        </div>
        <div class="description">
            <div class="top">
                <slot name="name"></slot>
            </div>
            <div class="down">
                <slot name="desc"></slot>
            </div>
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
    margin: 1rem;

    >.picture {
        width: 100%;
        height: 70%;
        background-color: white;
        border-radius: 5%;
        margin-bottom: 5px;
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

        >.top {
            margin-bottom: 1rem;
        }
    }
}

.card:hover {
    background-color: #383A3F;
}
</style>