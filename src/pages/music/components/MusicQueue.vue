<script>
import { computed } from "vue";
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        const queue = computed(() => {
            return store.getters.getQueue;
        });

        const recentlyPlayed = computed(() => {
            return store.getters.getRecentlyPlayed;
        })

        return { queue, recentlyPlayed };
    },
    data() {
        return {
            QueueMode: true,
        }
    },
    methods: {
        queueMode() {
            this.QueueMode = true;

            const q = document.querySelector("#qMode");
            const rp = document.querySelector("#rpMode");

            rp.classList.remove('active');
            q.classList.add('active');
        },
        recentlyPlayedMode() {
            this.QueueMode = false;
            const q = document.querySelector("#qMode");
            const rp = document.querySelector("#rpMode");

            q.classList.remove('active');
            rp.classList.add('active');
        }
    }
};
</script>

<template>
    <div class="scrollable-container" @scroll.prevent="handleScroll">
        <div class="queueHeader">
            <div class="headerBtn active" @click="queueMode" id="qMode">
                <span class="text">佇列</span>
            </div>
            <div class="headerBtn" @click="recentlyPlayedMode" id="rpMode">
                <span class="text">最近播放</span>
            </div>
        </div>
        <div class="scrollable-content" v-if="QueueMode == true">
            <div class="song" v-for="(song, i) in queue.songInfos" :keys="song.id">
                <div class="number">{{ i + 1 }}</div>
                <div class="pic">
                    <img :src=song.songCoverPath alt="">
                </div>
                <div class="desc">
                    <div class="name">{{ song.songName }}</div>
                    <div class="authorName" v-for="artist in song.artists">{{ artist.artistName }}</div>
                </div>
            </div>
        </div>
        <div class="scrollable-content" v-else>
            <div class="recentlyPlayed" v-for="song in recentlyPlayed" :key="song.id">
                <div class="pic">
                    <img :src=song.songCoverPath alt="">
                </div>
                <div class="desc">
                    <div class="name">{{ song.songName }}</div>
                    <div class="authorName" v-for="artist in song.artistlist">{{ artist.artistName }}</div>
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
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        &.active {
            color: #ff9412;
            background-color: #fff;
        }

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

    .song,
    .recentlyPlayed {
        height: 100px;
        width: 100%;
        color: white;
        padding: 10px;
        display: flex;
        align-items: center;

        .number {
            margin-right: 1rem
        }

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