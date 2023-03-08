<script>
import { computed } from "vue";
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        const queue = computed(() => {
            return store.getters.getQueue;
        });

        return { queue };
    },
};
</script>

<template>
    <div class="scrollable-container" @scroll.prevent="handleScroll">
        <div class="queueHeader">
            <div class="headerBtn">
                <span class="text">佇列</span>
            </div>
            <div class="headerBtn">
                <span class="text">最近播放</span>
            </div>
        </div>
        <div class="scrollable-content">
            <div class="song" v-for="song in queue.songInfos" :keys="song.id">
                <div class="pic">
                    <img :src=song.songCoverPath alt="">
                </div>
                <div class="desc">
                    <div class="name">{{ song.songName }}</div>
                    <div class="authorName">sss</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.scrollable-container {
    width: 20rem;
    height: 400px;
    border-radius: 10px 10px 0 0;
    box-shadow: -2px -2px 5px 2px rgba(0, 0, 0, 0.4);
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
}

.queueHeader {
    width: 100%;
    height: 3rem;
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid white;
    background-color: #383A3F;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    >.headerBtn {
        width: 45%;
        height: 80%;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;

        >.text {
            cursor: pointer;

            &:hover,
            &:active {
                font-size: 30px;
            }
        }
    }
}

.scrollable-content {
    /* Set the height and width of the content */
    height: auto;
    min-height: 400px;
    width: 100%;
    /* Add some padding to the content to prevent it from sticking to the sides of the container */
    background-color: #383A3F;

    .song {
        height: 100px;
        width: 100%;
        color: white;
        padding: 10px;
        display: flex;
        align-items: center;

        .pic {
            width: 60px;
            height: 60px;
            margin-right: 1rem;

            img {
                width: 100%;
                height: 100%;
            }
        }

        &:hover {
            background-color: rgb(117, 117, 117);
        }
    }
}
</style>