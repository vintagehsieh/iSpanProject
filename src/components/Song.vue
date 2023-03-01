<script>
export default {

};
</script>

<template>
    <div class="song">
        <slot name="order" class="box"></slot>
        <slot name="name"></slot>
        <slot name="album"></slot>
        <slot name="addedDate"></slot>
        <slot name="time"></slot>
    </div>
</template>

<style lang="scss" scoped>
.song {
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;

    >.box {
        margin: 2rem;
    }
}
</style>