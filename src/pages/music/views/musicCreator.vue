<script>
import { computed } from "vue";
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const creator = computed(() => {
            return store.getters.getCreator;
        });

        const currentSong = computed(() => {
            return store.getters.getCurrentSong;
        })

        return { creator, currentSong };
    },
    data() {
        return {}
    },
    methods: {
        toggleCreatorLiked() {
            this.creator.isLiked = !this.creator.isLiked;
            if (this.creator.isLiked == true) {
                fetch(`https://localhost:7043/Members/FollowedCreators/${this.creator.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                })
                    .then(response => response.text())
                    .then(data => console.log(data))
                    .catch(error => console.error(error))
            } else {
                fetch(`https://localhost:7043/Members/FollowedCreators/${this.creator.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                })
                    .then(response => response.text())
                    .then(data => console.log(data))
                    .catch(error => console.error(error))
            }
        },
        toggleSongLiked(i) {
            this.creator.popularSongs[i].isLiked = !this.creator.popularSongs[i].isLiked;
            if (this.creator.popularSongs[i].isLiked == true) {
                fetch(`https://localhost:7043/Members/LikedSongs/${this.creator.popularSongs[i].id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                })
                    .then(response => response.text())
                    .then(data => console.log(data))
                    .catch(error => console.error(error))
            } else {
                fetch(`https://localhost:7043/Members/LikedSongs/${this.creator.popularSongs[i].id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                })
                    .then(response => response.text())
                    .then(data => console.log(data))
                    .catch(error => console.error(error))
            }

            if (this.creator.popularSongs[i].id == this.currentSong.id) {
                this.currentSong.isLiked = this.creator.popularSongs[i].isLiked;
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
        hoverSong(i) {
            this.creator.popularSongs[i].isHover = true;
        },
        notHoverSong(i) {
            this.creator.popularSongs[i].isHover = false;
        },
        async togglePlay() {
            this.$store.dispatch('setForcePlayMode', true);
            await fetch(`https://localhost:7043/Queues/${this.creator.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Value": "Creator"
                }),
                credentials: 'include',
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error))

            await this.$store.dispatch("fetchQueueDataAsync");
        },
        async setAlbum(albumId) {
            await this.$store.dispatch('setAlbum', albumId)
        }
    }
};
</script>
<template>
    <div class="container">
        <div class="contentSpacing" id="playlistHeader">
            <div class="picture">
                <img :src=creator.creatorPicPath alt="">
            </div>
            <div id="artistInfo">
                <div id="type">創作者</div>
                <div id="artistName">{{ creator.creatorName }}</div>
                <div id="infoDetail">
                    <span id="likes">追蹤人數 {{ creator.totalFollows }}</span>
                </div>
            </div>
        </div>
        <div id="btns">
            <button id="artistPlayPause">
                <font-awesome-icon class="btn" id="play" icon="fa-solid fa-play" @click="togglePlay" />
                <!-- <font-awesome-icon class="btn" id="pause" icon="fa-solid fa-pause" v-else @click="togglePlay" /> -->
            </button>
            <button id="artistFollowed">
                <font-awesome-icon v-if="creator.isLiked" class="btn" icon="fa-solid fa-heart" @click="toggleCreatorLiked"
                    style="color: #F6B352" />
                <font-awesome-icon v-else class="btn" icon="fa-regular fa-heart" @click="toggleCreatorLiked" />
            </button>
        </div>
        <div class="content">
            <div id="popSongs" v-if="creator.popularSongs.length > 0">
                <div class="header">
                    <span>熱門</span>
                </div>
                <div class="items" id="songs">
                    <Song v-for="(song, i) in creator.popularSongs" :key="song.id" class="song" @mouseover="hoverSong(i)"
                        @mouseleave="notHoverSong(i)">
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
                    </Song>
                </div>
            </div>
            <div id="popAlbums" v-if="creator.popularAlbums.length > 0">
                <div class="header">
                    <span>專輯作品</span>
                </div>
                <div class="items" id="albums">
                    <RouterLink class="link" to="/album" v-for="album in creator.popularAlbums" :key="album.id"
                        @click="setAlbum(album.id)">
                        <Card>
                            <template #picture>
                                <img :src=album.albumCoverPath alt="">
                            </template>
                            <template #name>
                                <h3>{{ album.albumName }}</h3>
                            </template>
                        </Card>
                    </RouterLink>
                </div>
            </div>
            <div id="popPlaylists" v-if="creator.includedPlaylists.length > 0">
                <div class="header">
                    <span>演出清單</span>
                </div>
                <div class="items" id="playlists">
                    <Card v-for="playlist in creator.includedPlaylists" :key="playlist.id">
                        <template #picture>
                            <img :src=playlist.playlistCoverPath alt="">
                        </template>
                        <template #name>
                            <h3>{{ playlist.listName }}</h3>
                        </template>
                        <template #desc>
                            <!-- <p>{{ playlist.mainArtistName[0] }}</p> -->
                        </template>
                    </Card>
                </div>
            </div>
            <div id="relatedArtists">

            </div>
            <div id="about">
                <div class="header">關於</div>
                <div class="block">
                    <div id="pic">
                        <img :src=creator.creatorPicPath alt="">
                    </div>
                    <div id="desc">
                        <h2>{{ creator.creatorName }}</h2>
                        <p>{{ creator.about }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    background-color: #202020;

    .contentSpacing {
        width: 100%;
        height: 20rem;
        padding: 0 2rem;
        display: flex;
        background: linear-gradient(#c0bfbf 0%, #202020 60%, #202020 100%);

        >.picture {
            width: 15rem;
            height: 15rem;
            position: relative;
            top: 4rem;
            margin-right: 2rem;

            >img {
                width: 100%;
                height: 100%;
                border-radius: 50%;

            }
        }

        >#artistInfo {
            position: relative;
            top: 4rem;
            color: white;

            >#type {
                font-size: 25px;
                margin-bottom: 1rem;
            }

            >#artistName {
                font-size: 60px;
                margin-bottom: 4rem;
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

        #popAlbums {
            margin-top: 1rem;

            .items {
                display: flex;
            }
        }

        #popPlaylists {

            .items {
                display: flex;
            }
        }

        #about {
            display: block;

            .block {
                margin: 1rem auto;
                width: 60rem;
                height: 30rem;
                border-radius: 1rem;
                background-color: #fff;
                display: flex;
                overflow: hidden;

                #pic {
                    width: 35%;
                    height: 100%;
                    overflow: hidden;

                    img {
                        height: 100%;
                        position: relative;
                        transform: translateX(-15%);
                    }
                }

                #desc {
                    width: 65%;
                    height: 100%;
                    padding: 1rem;
                    background-color: #595858;

                    h2 {
                        font-size: 3rem;
                        margin-bottom: 1rem;
                    }

                    p {
                        padding: 0 1rem;
                        font-size: 1rem;
                    }
                }
            }
        }
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