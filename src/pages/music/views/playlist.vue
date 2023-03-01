<script>
import Song from '@/components/Song.vue';

export default {
    data() {
        return {
            songs: {},
            playlist: {
                totalLikes: 10,
                totalSongs: 10,
                totalTime: 180,
                isliked: false,
            },
            playStatus: false,
        }
    },
    methods: {
        togglePlay() {
            this.playStatus = !this.playStatus;
        },
        toggleLiked() {
            this.playlist.isliked = !this.playlist.isliked;
        }
    }
};
</script>
<template>
    <div class="container">
        <div class="contentSpacing" id="playlistHeader">
            <div class="picture" id="playlistPic">
                <img src="" alt="">
            </div>
            <div id="playlistInfo">
                <span id="type">Playlist</span>
                <span id="playlistName"></span>
                <div id="infoDetail">
                    <div id="artistInfo">
                        <div class="picture" id="artistPic">
                            <img src="" alt="">
                        </div>
                        <div id="artistName"></div>
                    </div>
                    <span id="likes">{{ playlist.totalLikes }}</span>
                    <span id="info">{{ playlist.totalSongs, playlist.totalTime }}</span>
                </div>
            </div>
        </div>
        <div id="btns">
            <button id="playlistPlayPause">
                <font-awesome-icon class="btn" id="play" icon="fa-solid fa-play" v-if="playStatus == false"
                    @click="togglePlay" />
                <font-awesome-icon class="btn" id="pause" icon="fa-solid fa-pause" v-else @click="togglePlay" />
            </button>
            <button id="playlistLiked">
                <font-awesome-icon v-if="playlist.isliked" class="btn" icon="fa-solid fa-heart" @click="toggleLiked"
                    style="color: #F6B352" />
                <font-awesome-icon v-else class="btn" icon="fa-regular fa-heart" @click="toggleLiked" />
            </button>
            <button id="playlistOptions">
                <font-awesome-icon class="btn" icon="fa-solid fa-ellipsis" />
            </button>
        </div>
        <div class="content">
            <div id="contentHeader">
                <Song>
                    <template #order>
                        <p>#</p>
                    </template>
                    <template #name>
                        <p>標題</p>
                    </template>
                    <template #album>
                        <p>專輯</p>
                    </template>
                    <template #addedDate>
                        <p>新增日期</p>
                    </template>
                    <template #time>
                        <font-awesome-icon icon="fa-regular fa-clock" />
                    </template>
                </Song>
            </div>
            <div id="contentBody">
                <Song v-for="song in songs" :key="song.Id"></Song>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;

    .contentSpacing {
        width: 100%;
        height: 20rem;
        background-color: rgb(83, 83, 83);
        display: flex;

        >#palylistPic {
            width: 15rem;
            height: 15rem;
        }
    }

    >#btns {
        height: 5rem;
        padding-left: 20px;
        display: flex;
        align-items: center;

        >#playlistPlayPause {
            width: 5rem;
            background-color: rgba(0, 0, 0, 0);
            border: none;

            >.btn {
                margin-right: 2rem;
                color: white;
                font-size: 3rem;

                &:hover {
                    font-size: 55px;
                }
            }
        }

        >#playlistLiked {
            background-color: rgba(0, 0, 0, 0);
            margin-right: 2rem;
            border: none;

            >.btn {
                color: grey;
                font-size: 2rem;

                &:hover {
                    color: white;
                }
            }
        }

        >#playlistOptions {
            border: none;
            background-color: rgba(0, 0, 0, 0);

            >.btn {
                color: grey;
                font-size: 2rem;

                &:hover {
                    color: white;
                }
            }
        }
    }

    >.content {
        width: 100%;
        min-height: 20rem;
        padding: 1rem;

        >#contentHeader {
            width: 100%;
            color: rgb(83, 83, 83);
        }
    }
}
</style>