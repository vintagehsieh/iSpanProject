<script>
export default {};
</script>

<template>
    <aside>
        <div id="logo">
            <a href="index.html" class="routerLink">
                <img src="@/assets/logo.png" alt="" />
            </a>
        </div>
        <div id="default">
            <slot name="main"></slot>
            <slot name="search"></slot>
            <slot name="library"></slot>
        </div>
        <div id="playlists">
            <slot name="playlist"></slot>
        </div>
    </aside>
</template>

<style lang="scss" scoped>
aside {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 3rem 2rem;
    background-color: #383A3F;
    color: white;

    #logo {
        display: flex;
        width: 200px;
        height: 60px;

        >a img {
            display: flex;
            width: max(10vw, 200px);
            scale: 2;
        }
    }

    >#default {
        width: 80%;
        margin: auto;
    }
}
</style>