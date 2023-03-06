<script>
import { computed } from "vue";
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const album = computed(() => {
            return store.getters.getAlbum;
        });

        return { album };
    },
    data() {
        return {
        }
    },
    methods: {
        show() {
            console.log(this.album.albumName);
            return this.album.albumName;
        },
        formatTime(seconds) {
            // Compute the number of minutes and remaining seconds
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;

            // Pad the seconds with a leading zero if needed
            const paddedSeconds = remainingSeconds.toString().padStart(2, '0');

            // Combine the minutes and seconds into a string
            return `${minutes}:${paddedSeconds}`;
        },
    },
    onMounted() {

    }
};
</script>
<template>
    <div class="container">
        <div class="contentSpacing" id="albumHeader">
            <div class="picture" id="albumPic" @click="show()">
                <img src="@/assets/music-note-icon-song-melody-tune-flat-symbol-free-vector.webp" alt="">
            </div>
            <div id="albumInfo">
                <div id="type">專輯</div>
                <div id="albumName">{{ album.albumName }}</div>
                <div id="infoDetail">
                    <div id="ownerInfo">
                        <div class="picture" id="ownerPic">
                            <img src="@/assets/50402309-musician-icon.webp" alt="">
                        </div>
                        <div id="ownerName">{{ album.mainArtistName }}</div>
                    </div>
                    <span id="releasedYear">{{ album.released }}</span>
                    <!-- <span id="totalSongs">{{ album.songs.length }}首歌曲</span> -->
                    <!-- <span id="totaltime">{{ getAlbumTotalTime() }}</span> -->
                </div>
            </div>
        </div>
        <div id="btns">
            <button id="playPause">
                <!-- <font-awesome-icon class="btn" id="play" icon="fa-solid fa-play" v-if="isPlaying == false"
                                                                                                                                                                                @click="togglePlay" />
                                                                                                                                                                            <font-awesome-icon class="btn" id="pause" icon="fa-solid fa-pause" v-else @click="togglePlay" /> -->
            </button>
            <button id="liked">
                <!-- <font-awesome-icon v-if="album.isliked" class="btn" icon="fa-solid fa-heart" @click="toggleLiked"
                                                                                                                                                                                style="color: #F6B352" />
                                                                                                                                                                            <font-awesome-icon v-else class="btn" icon="fa-regular fa-heart" @click="toggleLiked" /> -->
            </button>
            <button id="options">
                <font-awesome-icon class="btn" icon="fa-solid fa-ellipsis" />
            </button>
        </div>
        <div class="content">
            <div id="contentHeader">
                <Song>
                    <template #order>
                    <span>#</span>
                </template>
                    <template #name>
                        <span class="header">標題</span>
                    </template>
                    <template #addedDate>
                        <span class="header">播放次數</span>
                    </template>
                    <template #time>
                        <font-awesome-icon icon="fa-regular fa-clock" class="header" />
                    </template>
                </Song>
            </div>
            <div id="contentBody">
                <Song v-for="(song, index) in album.songs" :key="song.Id" class="songContent" @mouseover="hoverSong(i)"
                    @mouseleave="notHoverSong(i)">
                    <template #order>
                        <p v-if="song.isHover == false">{{ i + 1 }}</p>
                        <font-awesome-icon class="btn" id="play" icon="fa-solid fa-play" v-else-if="isPlaying == false"
                            @click="togglePlay" />
                        <font-awesome-icon class="btn" id="pause" icon="fa-solid fa-pause" v-else @click="togglePlay" />
                    </template>
                    <template #name>
                        <div class="songInfo">
                            <div class="songPicture">
                                <img src="@/assets/logo.png" alt="" class="img">
                            </div>
                            <div class="desc">
                                <div class="songName">{{ song.songName }}</div>
                                <div class="artistName">{{ album.mainArtistName }}</div>
                            </div>
                        </div>
                    </template>
                    <template #album>
                        <span>{{ song.totalPlayedTimes }}</span>
                    </template>
                    <template #liked>
                        <span v-if="song.isHover == true || song.isLiked == true">
                            <!-- <font-awesome-icon v-if="song.isLiked" class="btn" icon="fa-solid fa-heart"
                                                                                                                                                                                                            @click="toggleSongLiked(i)" style="color: #F6B352" />
                                                                                                                                                                                                        <font-awesome-icon v-else class="btn" icon="fa-regular fa-heart" @click="toggleSongLiked(i)" /> -->
                        </span>
                    </template>
                    <template #time>
                        <span>{{ formatTime(song.duration) }}</span>
                    </template>
                    <template #options>
                        <span v-if="song.isHover">
                            <font-awesome-icon class="btn" icon="fa-solid fa-ellipsis" />
                        </span>
                    </template>
                </Song>
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
        padding: 0 2rem;
        background-color: rgb(83, 83, 83);
        display: flex;

        >.picture {
            width: 15rem;
            height: 15rem;
            position: relative;
            top: 4rem;
            margin-right: 2rem;

            >img {
                width: 100%;
                height: 100%;
            }
        }

        >#albumInfo {
            position: relative;
            top: 4rem;
            color: white;

            >#type {
                font-size: 20px;
                margin-bottom: 1rem;
            }

            >#albumName {
                font-size: 60px;
                margin-bottom: 2rem;
            }

            >#infoDetail {
                display: flex;
                align-items: center;

                >#ownerInfo {
                    display: flex;
                    align-items: center;
                    margin-right: 1rem;

                    >.picture {
                        width: 30px;
                        height: 30px;
                        margin-right: 10px;

                        >img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }

                    >#ownerName {
                        font-size: 16px;
                    }
                }

                >#likes {
                    font-size: 16px;
                    margin-right: 1rem;
                }

                >#totalSongs {
                    font-size: 16px;
                    margin-right: 1rem;
                }

                >#totaltime {
                    font-size: 16px;
                    margin-right: 1rem;
                }
            }
        }
    }

    >#btns {
        height: 5rem;
        padding-left: 2rem;
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
        min-height: 20px;
        height: auto;
        padding: 0 2rem;

        >#contentHeader {
            width: 100%;
            height: 3rem;
            color: rgb(152, 152, 152);
            border-bottom: 1px solid rgb(152, 152, 152);
        }

        >#contentBody {
            >.songContent {
                width: 100%;
                height: 5rem;
                color: white;

                &:hover {
                    background-color: rgb(70, 70, 70);
                }

                .songInfo {
                    display: flex;
                    align-items: center;

                    .songPicture {
                        width: 50px;
                        height: 50px;
                        margin-right: 1rem;
                        display: flex;
                        align-items: center;

                        .img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    >.desc {
                        width: auto;
                        height: 50px;
                        font-size: 14px;

                        >.songName {
                            font-size: 16px;
                            margin-bottom: 6px;
                        }
                    }
                }
            }
        }
    }
}

.header {
    &:hover {
        color: white;
        cursor: context-menu;
    }
}
</style>