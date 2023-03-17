<script>
import { throwStatement } from "@babel/types";
import { computed } from "vue";
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const album = computed(() => {
            return store.getters.getAlbum;
        });
        const currentSong = computed(() => {
            return store.getters.getCurrentSong;
        })

        return { album, currentSong };
    },
    data() {
        return {
            isPlaying: false,
            optionIsOpen: false,
            searchPlaylistValue: "",
            searchPlaylists: [],
            songModalOpen: false,
        }
    },
    methods: {
        show() {
            console.log(this.album);
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
        formatReleased(released) {
            return released.slice(0, 10);
        },
        toggleSongLiked(i) {
            this.album.songs[i].isLiked = !this.album.songs[i].isLiked;
            if (this.album.songs[i].isLiked == true) {
                fetch(`https://localhost:7043/Members/LikedSongs/${this.album.songs[i].id}`, {
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
                fetch(`https://localhost:7043/Members/LikedSongs/${this.album.songs[i].id}`, {
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

            if (this.album.sogns[i].id == this.currentSong.id) {
                this.currentSong.isLiked = this.album.sogns[i].isLiked;
            }
        },
        toggleAlbumLiked() {
            this.album.isLiked = !this.album.isLiked;
            if (this.album.isLiked == true) {
                fetch(`https://localhost:7043/Members/LikedAlbums/${this.album.id}`, {
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
                fetch(`https://localhost:7043/Members/LikedAlbums/${this.album.id}`, {
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
        toggleOption() {
            this.optionIsOpen = !this.optionIsOpen;
        },
        toggleSongOption(i) {
            if (this.album.songs[i].optionIsOpen == undefined) {
                this.album.songs[i].optionIsOpen = false;
            }
            this.album.songs[i].optionIsOpen = !this.album.songs[i].optionIsOpen;
        },
        closeSongOption(i) {
            this.album.songs[i].optionIsOpen = false;
        },
        hoverSong(i) {
            this.album.songs[i].isHover = true;
        },
        notHoverSong(i) {
            this.album.songs[i].isHover = false;
        },
        getAlbumTotalTime() {
            const totaltime = Object.values(this.album.songs).reduce((acc, cur) => acc + cur.duration, 0);

            const hours = Math.floor(totaltime / 3600);
            const minutes = Math.floor((totaltime % 3600) / 60);
            const seconds = totaltime % 60;

            return (hours == 0) ? minutes + '分鐘' + seconds + '秒' : hours + '小時' + minutes + '分鐘';
        },
        async togglePlay() {
            this.$store.dispatch('setForcePlayMode', true);
            await fetch(`https://localhost:7043/Queues/${this.album.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Value": "Album"
                }),
                credentials: 'include',
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error))

            this.$store.dispatch("fetchQueueDataAsync");
        },
        async addToQueue() {
            await fetch(`https://localhost:7043/Queues/Albums/${this.album.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error))

            this.$store.dispatch("fetchQueueDataAsync");
        },
        async addSongToQueue(songId) {
            await fetch(`https://localhost:7043/Queues/Songs/${songId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error))

            this.$store.dispatch("fetchQueueDataAsync");
        },
        async setArtist(artistId) {
            await this.$store.dispatch('setArtist', artistId);
        },
        async setCreator(creatorId) {
            await this.$store.dispatch('setCreator', creatorId);
        },
        showSongModal(songId, i) {
            this.album.songs[i].optionIsOpen = false;
            this.modalSongId = songId;
            this.songModalOpen = true;
            this.searchPlaylist();
        },
        hideSongModal() {
            this.songModalOpen = false;
            this.searchPlaylistValue = "";
        },
        async searchPlaylist() {
            var url = 'https://localhost:7043/Members/Playlists?RowNumber=2&IncludedLiked=false&Condition=RecentlyAdded';
            if (this.searchPlaylistValue != '') {
                url += `&Value=${this.searchPlaylistValue}`
            }
            await fetch(url,
                { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include', })
                .then(response => response.json())
                .then(data => this.searchPlaylists = data)
                .catch(error => console.error(error))
        },
        async addSongToPlaylistEx(playlistId) {
            await fetch(`https://localhost:7043/Playlists/${playlistId}/Songs/${this.modalSongId}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'value': true
                    }),
                    credentials: 'include',
                })
                .then(response => response.text())
                .then(data => {
                    alert("新增成功")
                    console.log(data)
                })
                .catch(error => console.error(error))

            if (playlistId == this.playlist.id)
                this.$store.dispatch('setPlaylist', this.playlist.id);
        },
    }
};
</script>
<template>
    <div class="container">
        <div class="contentSpacing" id="albumHeader">
            <div class="picture" id="albumPic" @click="show()">
                <img :src=album.albumCoverPath alt="">
            </div>
            <div id="albumInfo">
                <div id="type">專輯</div>
                <div id="albumName">{{ album.albumName }}</div>
                <div id="infoDetail">
                    <div id="ownerInfo">
                        <div class="picture" id="ownerPic">
                            <img :src=album.mainArtistPicPath v-if="album.mainArtistName" alt="">
                            <img :src=album.mainCreatorPicPath v-else alt="">
                        </div>
                        <RouterLink to="/artist" v-if="album.mainArtistName" class="link"
                            @click="setArtist(album.mainArtistId)">
                            <div id="ownerName">{{ album.mainArtistName }}</div>
                        </RouterLink>
                        <RouterLink to="/creator" v-else class="link" @click="setCreator(album.mainCreatorId)">
                            <div id=" ownerName">{{ album.mainCreatorName }}
                            </div>
                        </RouterLink>
                    </div>
                    <span id="releasedYear" style="margin-right: 1rem">{{ formatReleased(album.released) }}</span>
                    <span id="totalSongs">{{ album.songs.length }}首歌曲</span>
                    <span id="totaltime">{{ getAlbumTotalTime() }}</span>
                </div>
            </div>
        </div>
        <div id="btns">
            <button id="albumPlayPause">
                <font-awesome-icon class="btn" id="play" icon="fa-solid fa-play" @click="togglePlay" />
                <!-- <font-awesome-icon class="btn" id="pause" icon="fa-solid fa-pause" v-else @click="togglePlay" /> -->
            </button>
            <button id="albumLiked">
                <font-awesome-icon v-if="album.isLiked" class="btn" icon="fa-solid fa-heart" @click="toggleAlbumLiked"
                    style="color: #F6B352" />
                <font-awesome-icon v-else class="btn" icon="fa-regular fa-heart" @click="toggleAlbumLiked" />
            </button>
            <button id="albumOptions">
                <font-awesome-icon class="btn" icon="fa-solid fa-ellipsis" @click="toggleOption" />
                <div id="AOptions">
                    <Options v-if="optionIsOpen">
                        <template #first>
                            <div class="option" @click="addToQueue()">加入佇列</div>
                        </template>
                        <template #second>
                            <div class="option" v-if="album.isLiked == false" @click="toggleAlbumLiked">加入音樂庫</div>
                            <div class="option" v-else @click="toggleAlbumLiked">從音樂庫中移除</div>
                        </template>
                        <template #third>
                            <div class="option">加入播放清單</div>
                        </template>
                        <template #forth>
                        </template>
                        <template #fifth>
                        </template>
                        <template #sixth>
                        </template>
                    </Options>
                </div>
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
                <Song v-for="(song, i) in album.songs" :key="song.Id" class="songContent" @mouseover="hoverSong(i)"
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
                                <img :src=song.songCoverPath alt="" class="img">
                            </div>
                            <div class="desc">
                                <div class="songName">{{ song.songName }}</div>
                                <RouterLink to="/artist" v-if="album.mainArtistName" class="link artistName"
                                    @click="setArtist(album.mainArtistId)">
                                    <div>{{ album.mainArtistName }}</div>
                                </RouterLink>
                                <RouterLink to="/artist" v-if="album.mainCreatorName" class="link artistName"
                                    @click="setCreator(album.mainCreatorId)">
                                    <div>{{ album.mainCreatorName }}</div>
                                </RouterLink>
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
                            <font-awesome-icon v-else class="btn" icon="fa-regular fa-heart" @click="toggleSongLiked(i)" />
                        </span>
                    </template>
                    <template #time>
                        <span>{{ formatTime(song.duration) }}</span>
                    </template>
                    <template #options>
                        <div v-if="song.isHover">
                            <font-awesome-icon class="btn" icon="fa-solid fa-ellipsis" @click="toggleSongOption(i)" />
                        </div>
                        <div class="songOptionParent" v-if="song.optionIsOpen">
                            <div class="SongOptions">
                                <Options>
                                    <template #first>
                                        <div class="option" @click="addSongToQueue(song.id); closeSongOption(i)">加入佇列</div>
                                    </template>
                                    <template #second>
                                        <div class="option" @click="addToQueue(); closeSongOption(i)">顯示提供者</div>
                                    </template>
                                    <template #third>
                                        <div class="option" @click="(event) => showSongModal(song.id, i)">加入播放清單
                                        </div>
                                    </template>
                                    <template #forth>
                                    </template>
                                    <template #fifth>
                                    </template>
                                    <template #sixth></template>
                                </Options>
                            </div>
                        </div>
                    </template>
                </Song>
            </div>
            <div id="company">
                <font-awesome-icon icon="fa-regular fa-copyright" /><span>{{ album.albumCompany }}</span>
            </div>
        </div>
    </div>
    <Modal v-if="songModalOpen">
        <template #header>
            <div id="searchPlaylist"
                style="width: 16rem; height: 35px; padding: 0 1rem; background-color: #a7a7a7; border-radius: 30px; display: flex; justify-content: center; align-items: center;">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" style="font-size: 20px; margin-right: 8px;" />
                <input type="text" placeholder="輸入清單名稱" v-model="searchPlaylistValue" @keyup="searchPlaylist()"
                    style="font-size:large; border: none; background-color: #a7a7a7; outline: none;" />
            </div>
            <font-awesome-icon icon="fa-solid fa-xmark" style="font-size: 2rem; margin-left: 10rem"
                @click="hideSongModal" />
        </template>
        <template #content>
            <div id="scrollable-div" style="overflow-y;:scroll">
                <div id="searchPlaylists">
                    <div class="playlist" v-for="playlist in searchPlaylists"
                        style="width: 100%; height: 3rem;display: flex; align-items: center;">
                        <div class="playlistName">
                            <span>{{ playlist.listName }}</span>
                        </div>
                        <div class="plus" @click="addSongToPlaylistEx(playlist.id)" style="color: black; margin-left: auto"
                            onmouseover="this.style.color='#f68718'" onmouseout="this.style.color='black'">
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Modal>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    min-height: 60rem;
    padding-bottom: 3rem;
    background-color: #202020;

    .contentSpacing {
        width: 100%;
        height: 20rem;
        padding: 0 2rem;
        display: flex;
        background: linear-gradient(#7b7b7b 0%, #202020 70%, #202020 100%);


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

        >#albumPlayPause {
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

        >#albumLiked {
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

        >#albumOptions {
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

        #company {
            margin-top: 1rem;
            font-size: 14px;
            color: white;
        }
    }
}

.songOptionParent {
    position: relative;

    .SongOptions {
        position: absolute;
        top: -1rem;
        right: 1rem;

        &::after {
            content: "";
            clear: both;
        }
    }
}

.option {
    width: 100%;
    height: 50px;
    color: white;
    font-size: 16px;
    border-bottom: 2px solid grey;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: grey;
    }

    &:last-child {
        border-bottom: none;
    }
}

.header {
    &:hover {
        color: white;
        cursor: context-menu;
    }
}

.link {
    color: white;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}

#albumOptions {

    #AOptions {
        position: absolute;
        top: 20rem;
        left: 31rem;
    }
}
</style>