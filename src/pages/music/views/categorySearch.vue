<script>
import { ref } from 'vue'

export default {
    setup() {
        let SongGenres = ref({});
        let rowNumber = 2;
        async function loadData() {
            const responseSongGenres = await fetch(`https://localhost:7043/Albums/SongGenres/1?rowNumber=${rowNumber}`);
            SongGenres.value = await responseSongGenres.json();
        }

        loadData();

        return { SongGenres };

    },
    data() {
        return {
            items: {}
        }
    },
    inject: ['sharedData'],
    created() {
    }
}
</script>

<template>
    <div class="container">
        <div class="header">
            <span id="categoryName" style="font-size:100px; color: black">{{ this.sharedData.category.name }}</span>
        </div>
        <div class="body">
            <Card v-for="item in items" :key="item.id">
            </Card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100vh;
    background-color: #9d5a5a;
}
</style>