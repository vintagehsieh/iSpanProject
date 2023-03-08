<script>
import { computed } from "vue";
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const playlist = computed(() => {
            return store.getters.getPlaylist;
        });

        return { playlist };
    },
    data() {
        return {
            isPlaying: false,
        }
    },
    methods: {
        togglePlay() {
            console.log(this.playlist.metadata[0])
            this.isPlaying = !this.isPlaying;
        },
        toggleLiked() {
            this.playlist.isliked = !this.playlist.isliked;
        },
        toggleSongLiked(i) {
            this.playlist.songs[i].isLiked = !this.playlist.songs[i].isLiked;
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
        formatDate(date) {
            const year = date.splice(0, 4);
            const month = date.splice(5, 2);
            console.log(month);
            const day = date.splice(7, 2);
            console.log(day);
            return year + '年' + month + '月' + day + '日';
        },
        hoverSong(i) {
            this.playlist.metadata[i].isHover = true;
        },
        notHoverSong(i) {
            this.playlist.metadata[i].isHover = false;
        },
        getPlaylistTotalTime() {
            const totaltime = Object.values(this.playlist.metadata).reduce((acc, cur) => acc + cur.song.duration, 0);

            const hours = Math.floor(totaltime / 3600);
            const minutes = Math.floor((totaltime % 3600) / 60);
            const seconds = totaltime % 60;

            return (hours == 0) ? minutes + '分鐘' + seconds + '秒' : hours + '小時' + minutes + '分鐘';
        },
        checkCover() {
            const imgName = this.playlist.playlistCoverPath.slice(39);

            return imgName.length != 0;
        }
    }
};
</script>
<template>
    <div class="container">
        <div class="contentSpacing" id="playlistHeader">
            <div class="playlistPicture" id="playlistPic">

                <img :src=playlist.playlistCoverPath alt="" v-if="checkCover()">
                <img src="@/assets/music-note-icon-song-melody-tune-flat-symbol-free-vector.webp" v-else alt="">
            </div>
            <div id="playlistInfo">
                <div id="type">播放清單</div>
                <div id="playlistName">{{ playlist.listName }}</div>
                <div id="infoDetail">
                    <div id="ownerInfo">
                        <div class="picture" id="ownerPic">
                            <img :src=playlistCoverPath alt="">
                        </div>
                        <div id="ownerName">{{ playlist.ownerName }}</div>
                    </div>
                    <span id="likes"> {{ playlist.totalLikes }} 人喜歡</span>
                    <span id="totalSongs">{{ Object.keys(this.playlist.metadata).length }}首歌</span>
                    <span id="totaltime">{{ getPlaylistTotalTime() }}</span>
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
        <div class="content" v-if="playlist.metadata.length != 0">
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
                <Song v-for="(metadata, i) in playlist.metadata" :key="metadata.Id" class="songContent"
                    @mouseover="hoverSong(i)" @mouseleave="notHoverSong(i)">
                    <template #order>
                        <p v-if="metadata.isHover == false">{{ i + 1 }}</p>
                        <font-awesome-icon class="btn" id="play" icon="fa-solid fa-play" v-else-if="isPlaying == false"
                            @click="togglePlay" />
                        <font-awesome-icon class="btn" id="pause" icon="fa-solid fa-pause" v-else @click="togglePlay" />
                    </template>
                    <template #name>
                        <div class="songInfo">
                            <div class="songPicture">
                                <img :src=metadata.song.songCoverPath alt="" class="img">
                            </div>
                            <div class="desc">
                                <div class="songName">{{ metadata.song.songName }}</div>
                                <div class="artistName">{{ metadata.song.artist }}</div>
                            </div>
                        </div>
                    </template>
                    <template #album>
                        <span>{{ metadata.song.album }}</span>
                    </template>
                    <template #addedDate>
                        <span>{{ (metadata.addedTime.slice(0, 10)) }}</span>
                    </template>
                    <template #liked>
                        <span v-if="metadata.isHover == true || metadata.song.isLiked == true">
                            <font-awesome-icon v-if="metadata.song.isLiked" class="btn" icon="fa-solid fa-heart"
                                @click="toggleSongLiked(i)" style="color: #F6B352" />
                            <font-awesome-icon v-else class="btn" icon="fa-regular fa-heart" @click="toggleSongLiked(i)" />
                        </span>
                    </template>
                    <template #time>
                        <span>{{ formatTime(metadata.song.duration) }}</span>
                    </template>
                    <template #options>
                        <span v-if="metadata.isHover">
                            <font-awesome-icon class="btn" icon="fa-solid fa-ellipsis" />
                        </span>
                    </template>
                </Song>
            </div>
        </div>
        <div class="content" v-else>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    padding-bottom: 3rem;

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
            color: white;

            >#type {
                font-size: 40px;
            }

            >#playlistName {
                font-size: 50px;
                margin-bottom: 5rem;
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
        min-height: 14rem;
        height: auto;
        padding: 0 2rem;

        >#contentHeader {
            width: 100%;
            height: 3rem;
            margin-bottom: 1rem;
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