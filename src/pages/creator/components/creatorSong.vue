<script>
export default {

};
</script>

<template>
    <div class="song">
        <div id="order" class="box">
            <slot name="order"></slot>
        </div>
        <div id="name" class="box">
            <slot name="name"></slot>
        </div>
        <div id="album" class="box">
            <slot name="album"></slot>
        </div>
        <div id="released" class="box">
            <slot name="released"></slot>
        </div>
        <div id="time" class="box">
            <slot name="time"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.song {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    cursor: context-menu;

    .box {
        display: flex;
        align-items: center;
    }

    >#order {
        width: 5%;
        height: 100%;
    }

    >#name {
        width: 35%;
        height: 100%;
    }

    >#album {
        width: 30%;
        height: 100%;
    }

    >#addedDate {
        width: 20%;
        height: 100%;
    }

    >#liked {
        width: 3%;
        height: 100%;
    }

    >#time {
        width: 3%;
        height: 100%;

    }

    >#options {
        width: 3%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
}
</style>