<script>
export default {
    methods: {
        formatTime(seconds) {
            if (isNaN(seconds)) {
                return '0:00';
            }
            // Compute the number of minutes and remaining seconds
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);

            // Pad the seconds with a leading zero if needed
            const paddedSeconds = remainingSeconds.toString().padStart(2, '0');

            // Combine the minutes and seconds into a string
            return `${minutes}:${paddedSeconds}`;
        },
    }
}
</script>
<template>
    <div class="container">
        <div class="header">
            <span>歌曲管理</span>
        </div>
        <div class="content">
            <RouterLink to="/song" v-for="(song, i) in songs" :key="song.id" class="song">
                <Card>
                    <template #order>
                        <span>{{ i + 1 }}</span>
                    </template>
                    <template #name>
                        <div class="pic">
                            <img :src=song.songCoverPath alt="">
                        </div>
                        <div class="names">
                            <span>{{ song.songName }}</span>
                        </div>
                    </template>
                    <template #album>
                        <span>{{ song.albumName }}</span>
                    </template>
                    <template #released>
                        <span>{{ song.released }}</span>
                    </template>
                    <template #time>
                        <span>{{ formatTime(song.duration) }}</span>
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

        .song {}
    }
}
</style>