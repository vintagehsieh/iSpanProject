<script>
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const category = computed(() => {
            return store.getters.getCategory;
        })

        const albums = computed(() => {
            return store.getters.getGenreSongs;
        })

        return { albums, category };
    },
    data() {
        return {
            items: {}
        }
    },
    methods: {
        async setAlbum(albumId) {
            await this.$store.dispatch('setAlbum', albumId);
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="header">
            <span id="categoryName">{{ category.genreName }}</span>
        </div>
        <div class="body">
            <RouterLink to="/album" v-for="album in albums" :key="album.id" @click="setAlbum(album.id)">
                <Card>
                    <template #picture>
                        <img :src=album.albumCoverPath alt="">
                    </template>
                    <template #name>
                        <h3>{{ album.albumName }}</h3>
                    </template>
                    <template #desc>
                        <span>{{ album.mainArtistName }}</span>
                    </template>
                </Card>
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    background: linear-gradient(#eb0000 0%, #202020 20%, #202020 100%);

    .header {
        width: 100%;
        height: 5rem;
        color: white;
        padding: 2rem 2rem;
        margin-bottom: 2rem;

        #categoryName {
            font-size: 4rem;
        }
    }

    .body {
        display: flex;
        flex-wrap: wrap;
        min-height: 100vh;
        color: white;
    }
}
</style>