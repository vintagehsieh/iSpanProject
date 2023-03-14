<script>
export default {

}
</script>
<template>
    <div class="container">
        <div class="header">
            <span>專輯管理</span>
        </div>
        <div class="content">
            <RouterLink to="/album" v-for="album in albums" :key="album.id" class="album">
                <Card>
                    <template #picture>
                        <img :src=album.albumCoverPath alt="">
                    </template>
                    <template #name>
                        <span>{{ album.albumName }}</span>
                    </template>
                </Card>
            </RouterLink>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container {
    background-color: #242424;
    color: white;

    .header {
        font-size: 30px;
    }

    .content {
        flex-wrap: wrap;

        .album {}
    }
}
</style>