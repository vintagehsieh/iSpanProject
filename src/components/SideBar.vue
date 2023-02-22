<script>
export default {};
</script>

<template>
    <aside>
        <div id="logo">
            <img src="https://www.ispan.com.tw/img/Logoslogan_sm.png" alt="" />
        </div>
        <div id="default">
            <slot name="main"></slot>
            <slot name="search"></slot>
            <slot name="library"></slot>
        </div>
        <div id="playlists">

        </div>
    </aside>
</template>

<style lang="scss" scoped>
aside {
    width: 18rem;
    height: 100vh;
    position: fixed;
    margin: 0;
    background-color: #383A3F;
    color: white;

    >#logo {
        width: 80%;
        height: 3rem;
        margin: 2rem auto;
        background-color: #fff;

        >img {
            width: 100%;
            height: 100%;
        }
    }

    >#default {
        width: 80%;
        margin: auto;
    }
}
</style>