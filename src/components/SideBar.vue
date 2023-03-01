<script>
export default {};
</script>

<template>
    <aside>
        <div id="logo">
            <a href="index.html" class="routerLink">
                <img src="https://www.ispan.com.tw/img/Logoslogan_sm.png" alt="" />
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
    background-color: #383A3F;
    color: white;

    >#logo {
        width: 80%;
        height: 3rem;
        margin: 2rem auto;
        background-color: #fff;

        &:hover {
            cursor: pointer;
        }

        >.routerLink {
            >img {
                width: 100%;
                height: 100%;
            }
        }
    }

    >#default {
        width: 80%;
        margin: auto;
    }
}
</style>