<script>
import { computed } from "vue";
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const artist = computed(() => {
            return store.getters.getArtist;
        });
        const currentSong = computed(() => {
            return store.getters.getCurrentSong;
        })

        return { artist, currentSong };
    },
    data() {
        return {

        }
    },
    methods: {
        toggleArtistLiked() {
            this.artist.isLiked = !this.artist.isLiked;
            if (this.artist.isLiked == true) {
                fetch(`https://localhost:7043/Members/LikedArtists/${this.artist.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error(error))
            } else {
                fetch(`https://localhost:7043/Members/LikedArtists/${this.artist.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error(error))
            }
        },
        toggleSongLiked(i) {
            this.artist.songs[i].isLiked = !this.artist.songs[i].isLiked;
            if (this.artist.songs[i].isLiked == true) {
                fetch(`https://localhost:7043/Members/LikedSongs/${this.artist.songs[i].id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error(error))
            } else {
                fetch(`https://localhost:7043/Members/LikedSongs/${this.artist.songs[i].id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error(error))
            }

            if (this.artist.sogns[i].id == this.currentSong.id) {
                this.currentSong.isLiked = this.artist.sogns[i].isLiked;
            }
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
    }
};
</script>
<template>
    <div class="container">
        <div class="contentSpacing" id="playlistHeader">
            <div class="picture">
                <img :src=artist.artistPicPath alt="">
            </div>
            <div id="Info">
                <div id="type">藝人</div>
                <div id="playlistName">{{ artist.artistName }}</div>
                <div id="infoDetail">
                    <span id="likes">追蹤人數 {{ artist.totalLikes }}</span>
                </div>
            </div>
        </div>
        <div id="btns">
            <button id="artistPlayPause">
                <font-awesome-icon class="btn" id="play" icon="fa-solid fa-play" @click="togglePlay" />
                <!-- <font-awesome-icon class="btn" id="pause" icon="fa-solid fa-pause" v-else @click="togglePlay" /> -->
            </button>
            <button id="artistFollowed">
                <font-awesome-icon v-if="artist.isLiked" class="btn" icon="fa-solid fa-heart" @click="toggleAlbumLiked"
                    style="color: #F6B352" />
                <font-awesome-icon v-else class="btn" icon="fa-regular fa-heart" @click="toggleAlbumLiked" />
            </button>
        </div>
        <div class="content">
            <div id="popSongs">
                <div class="header">
                    <span>熱門</span>
                </div>
                <div class="items" id="songs">
                    <Song v-for="song in artist.popularSongs" :key="song.id" class="song">
                        <template #order>
                            <p v-if="song.isHover == false">{{ i + 1 }}</p>
                            <font-awesome-icon class="btn" id="play" icon="fa-solid fa-play" v-else @click="togglePlay" />
                            <!-- <font-awesome-icon class="btn" id="pause" icon="fa-solid fa-pause" v-else @click="togglePlay" /> -->
                        </template>
                        <template #name>
                            <div class="songInfo">
                                <div class="songPicture">
                                    <img :src=song.songCoverPath alt="" class="img">
                                </div>
                                <div class="desc">
                                    <div class="songName">{{ song.songName }}</div>
                                </div>
                            </div>
                        </template>
                        <template #addedDate>
                            <span>{{ song.playedTimes }}</span>
                        </template>
                        <template #liked>
                            <span v-if="song.isHover == true || song.isLiked == true">
                                <font-awesome-icon v-if="song.isLiked" class="btn" icon="fa-solid fa-heart"
                                    @click="toggleSongLiked(i)" style="color: #F6B352" />
                                <font-awesome-icon v-else class="btn" icon="fa-regular fa-heart"
                                    @click="toggleSongLiked(i)" />
                            </span>
                        </template>
                        <template #time>
                            <span>{{ formatTime(song.duration) }}</span>
                        </template>
                        <!-- <template #options>
                                                        <div v-if="song.isHover">
                                                            <font-awesome-icon class="btn" icon="fa-solid fa-ellipsis" @click="toggleSongOption(i)" />
                                                        </div>
                                                        <div class="songOptionParent" v-if="song.optionIsOpen">
                                                            <div class="SongOptions">
                                                                <Options>
                                                                    <template #first>
                                                                        <div class="option" @click="addSongToQueue(song.id); closeSongOption(i)">
                                                                            加入佇列
                                                                        </div>
                                                                    </template>
                                                                    <template #second>
                                                                    </template>
                                                                    <template #third>
                                                                        <div class="option" @click="addToQueue(); closeSongOption(i)">顯示提供者</div>
                                                                    </template>
                                                                    <template #forth>
                                                                    </template>
                                                                    <template #fifth>
                                                                    </template>
                                                                    <template #sixth></template>
                                                                </Options>
                                                            </div>
                                                        </div>
                                                    </template> -->
                    </Song>
                </div>
            </div>
            <div id="popAlbums">

            </div>
            <div id="popPlaylists">

            </div>
            <div id="relatedArtists">

            </div>
            <div id="about">

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
    }

    >#btns {
        height: 5rem;
        padding-left: 2rem;
        display: flex;
        align-items: center;

        >#artistPlayPause {
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

        >#artistFollowed {
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

        >#artistOptions {
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
        min-height: 17rem;
        height: auto;
        padding: 0 2rem 3rem 2rem;
        color: white;

        #popSongs {
            #songs {
                width: 40rem;
                height: 20rem;

                .song {
                    width: 100%;
                    height: 4rem;
                    border-radius: 10px;

                    &:hover {
                        background-color: #686868;
                    }

                    .songInfo {
                        display: flex;

                        .songPicture {
                            width: 3rem;
                            height: 3rem;
                            margin-right: 1rem;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .desc {
                            .songName {
                                height: 100%;
                                display: flex;
                                align-items: center;
                            }
                        }
                    }
                }
            }
        }

        #popAlbums {}

        #popPlaylists {}

        #about {}
    }
}

.header {
    font-size: 40px;

    &:hover {
        color: white;
        cursor: context-menu;
    }
}
</style>