<script>
import Song from '@/components/Song.vue';

export default {
    data() {
        return {
            songs: [{
                Id: 1,
                name: "ABC",
                artist: "AAB",
                album: "<M>",
                addedDate: "2022-3-1",
                duration: 180,
                isLiked: false,
                isHover: false,
            }, {
                Id: 2,
                name: "ABC",
                artist: "AAB",
                album: "<M>",
                addedDate: "2022-3-1",
                duration: 180,
                isLiked: false,
                isHover: false,
            }, {
                Id: 3,
                name: "ABC",
                artist: "AAB",
                album: "<M>",
                addedDate: "2022-3-1",
                duration: 180,
                isLiked: false,
                isHover: false,
            }, {
                Id: 4,
                name: "ABC",
                artist: "AAB",
                album: "<M>",
                addedDate: "2022-3-1",
                duration: 180,
                isLiked: true,
                isHover: false,
            }],
            playlist: {
                totalLikes: 10,
                totalSongs: 10,
                totalTime: 180,
                isliked: false,
            },
            isPlaying: false,
        }
    },
    methods: {
        togglePlay() {
            this.isPlaying = !this.isPlaying;
        },
        toggleLiked() {
            this.playlist.isliked = !this.playlist.isliked;
        },
        toggleSongLiked(i) {
            this.songs[i].isLiked = !this.songs[i].isLiked;
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
        hoverSong(i) {
            this.songs[i].isHover = true;
        },
        notHoverSong(i) {
            this.songs[i].isHover = false;
        }
    }
};
</script>
<template>
    <div class="container">
        <div class="contentSpacing" id="playlistHeader">
            <div class="playlistPicture" id="playlistPic">
                <img src="@/assets/music-note-icon-song-melody-tune-flat-symbol-free-vector.webp" alt="">
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
                <font-awesome-icon class="btn" id="play" icon="fa-solid fa-play" v-if="isPlaying == false"
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
                        <span>#</span>
                    </template>
                    <template #name>
                        <span class="header">標題</span>
                    </template>
                    <template #album>
                        <span class="header">專輯</span>
                    </template>
                    <template #addedDate>
                        <span class="header">新增日期</span>
                    </template>
                    <template #time>
                        <font-awesome-icon icon="fa-regular fa-clock" class="header" />
                    </template>
                </Song>
            </div>
            <div id="contentBody">
                <Song v-for="(song, i) in songs" :key="song.Id" class="songContent" @mouseover="hoverSong(i)"
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
                                <div class="songName">{{ song.name }}</div>
                                <div class="artistName">{{ song.artist }}</div>
                            </div>
                        </div>
                    </template>
                    <template #album>
                        <span>{{ song.album }}</span>
                    </template>
                    <template #addedDate>
                        <span>{{ song.addedDate }}</span>
                    </template>
                    <template #liked>
                        <span v-if="song.isHover == true || song.isLiked == true">
                            <font-awesome-icon v-if="song.isLiked" class="btn" icon="fa-solid fa-heart"
                                @click="toggleSongLiked(i)" style="color: #F6B352" />
                            <font-awesome-icon v-else class="btn" icon="fa-regular fa-heart" @click="toggleSongLiked(i)" />
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
    padding-bottom: 7rem;

    .contentSpacing {
        width: 100%;
        height: 20rem;
        padding: 0 2rem;
        background-color: rgb(83, 83, 83);
        display: flex;

        >.playlistPicture {
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

        >#playlistInfo {
            position: relative;
            top: 4rem;
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
                        font-size: 16px;

                        >.songName {
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