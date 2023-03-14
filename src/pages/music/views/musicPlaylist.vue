<script>
import { computed, watchEffect } from "vue";
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const playlist = computed(() => {
            return store.getters.getPlaylist;
        });
        const currentSong = computed(() => {
            return store.getters.getCurrentSong;
        })

        return { playlist, currentSong };
    },
    data() {
        return {
            isPlaying: false,
            optionIsOpen: false,
            searchValue: "",
            searchSongs: [],
            modalOpen: false,
            previewSrc: '',
        }
    },
    methods: {
        async togglePlay() {
            // this.isPlaying = !this.isPlaying;
            await fetch(`https://localhost:7043/Queues/${this.playlist.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Value": "Playlist"
                }),
                credentials: 'include',
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error))

            this.$store.dispatch("fetchQueueDataAsync");
        },
        togglePlalistLiked() {
            this.playlist.isLiked = !this.playlist.isLiked;
            if (this.playlist.isLiked == true) {
                fetch(`https://localhost:7043/Members/LikedPlaylists/${this.playlist.id}`, {
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
                fetch(`https://localhost:7043/Members/LikedPlaylists/${this.playlist.id}`, {
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
            this.playlist.metadata[i].song.isLiked = !this.playlist.metadata[i].song.isLiked;
            if (this.playlist.metadata[i].song.isLiked == true) {
                fetch(`https://localhost:7043/Members/LikedSongs/${this.playlist.metadata[i].song.id}`, {
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
                fetch(`https://localhost:7043/Members/LikedSongs/${this.playlist.metadata[i].song.id}`, {
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

            if (this.playlist.metadata[i].song.id == this.currentSong.id) {
                this.currentSong.isLiked = this.playlist.metadata[i].song.isLiked;
            }
        },
        toggleOption() {
            this.optionIsOpen = !this.optionIsOpen;
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
            const day = date.splice(7, 2);
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
        },
        async addToQueue() {
            await fetch(`https://localhost:7043/Queues/Playlists/${this.playlist.id}`, {
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
        changePrivacySetting() {
            this.playlist.isPublic = !this.playlist.isPublic;
            fetch(`https://localhost:7043/Playlists/${this.playlist.id}/PrivacySetting`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
                .then(response => response.json())
        },
        async deletePlaylist() {
            try {
                await fetch(`https://localhost:7043/Playlists/${this.playlist.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });
                // Do something else here, like showing a success message
                // before navigating to the next page.
                this.$router.push('/');
            } catch (error) {
                console.error(error);
            }

            this.$router.go(-1);
        },
        toggleSongOption(i) {
            if (this.playlist.metadata[i].optionIsOpen == undefined) {
                this.playlist.metadata[i].optionIsOpen = false;
            }
            this.playlist.metadata[i].optionIsOpen = !this.playlist.metadata[i].optionIsOpen;
        },
        setAlbum(albumId) {
            this.$store.dispatch('setAlbum', albumId);
        },
        setArtist(artistId) {
            this.$store.dispatch('setArtist', artistId);
        },
        setCreator(creatorId) {
            this.$store.dispatch('setCreator', creatorId);
        },
        async searchSong() {
            if (this.searchValue.trim().length == 0) return;
            await fetch(`https://localhost:7043/Songs/${this.searchValue}`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include', })
                .then(response => response.json())
                .then(data => this.searchSongs = data)
                .catch(error => console.error(error))
        },
        async addSongToPlaylist(songId) {
            await fetch(`https://localhost:7043/Playlists/${this.playlist.id}/Songs/${songId}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'value': true
                    }),
                    credentials: 'include',
                })
                .then(response => response.text())
                .then(data => console.log(data))
                .catch(error => console.error(error))

            this.$store.dispatch('setPlaylist', this.playlist.id);
        },
        async removeFromPlaylist(displayOrder) {
            await fetch(`https://localhost:7043/Playlists/${this.playlist.id}/Songs/${displayOrder}`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                })
                .then(response => response.text())
                .then(data => console.log(data))
                .catch(error => console.error(error))

            this.$store.dispatch('setPlaylist', this.playlist.id);
        },
        showModal() {
            this.modalOpen = true;
            this.optionIsOpen = false;
            this.previewSrc = this.playlist.playlistCoverPath
        },
        hideModal() {
            this.modalOpen = false;
        },
        async updatePlaylist() {
            console.log("hello")
            var form = document.querySelector('#form');
            const formData = new FormData(form);

            await fetch(`https://localhost:7043/Playlists/${this.playlist.id}/Detail`, {
                method: 'PUT',
                headers: {
                    // 'Content-Type': 'multipart/form-data'
                    'Accept': '*/*'
                },
                body: formData,
                credentials: 'include',
            })
                .then(response => response.text())
                .then(data => console.log(data))
                .catch(error => console.error(error))

            this.$store.dispatch('setPlaylist', this.playlist.id)
        },
        setPic(e) {
            const file = e.target.files[0];
            const objectURL = URL.createObjectURL(file);
            const preview = document.querySelector('#preview');
            preview.setAttribute('src', objectURL);
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
                <div id="type">
                    <span v-if="playlist.isPublic">公開的</span>
                    <span v-else>私人的</span>
                    播放清單
                </div>
                <div id="playlistName">
                    {{ playlist.listName }}
                </div>
                <div id="infoDetail">
                    <div id="ownerInfo">
                        <div class="picture" id="ownerPic">
                            <img :src=playlist.memberPicPath alt="">
                        </div>
                        <div id="ownerName">{{ playlist.memberName }}</div>
                    </div>
                    <span id="likes"> {{ playlist.totalLikes }} 人喜歡</span>
                    <span id="totalSongs">{{ Object.keys(this.playlist.metadata).length }}首歌</span>
                    <span id="totaltime">{{ getPlaylistTotalTime() }}</span>
                </div>
            </div>
        </div>
        <div id="btns">
            <button id="playlistPlayPause">
                <font-awesome-icon class="btn" id="play" icon="fa-solid fa-play" @click="togglePlay" />
                <!-- <font-awesome-icon class="btn" id="pause" icon="fa-solid fa-pause" v-else @click="togglePlay" /> -->
            </button>
            <button id="playlistLiked" v-if="playlist.isOwner == false">
                <font-awesome-icon v-if="playlist.isLiked" class="btn" icon="fa-solid fa-heart" @click="togglePlalistLiked"
                    style="color: #F6B352" />
                <font-awesome-icon v-else class="btn" icon="fa-regular fa-heart" @click="togglePlalistLiked" />
            </button>
            <button id="playlistOptions">
                <font-awesome-icon class="btn" icon="fa-solid fa-ellipsis" @click="toggleOption" />
                <div id="POptions">
                    <Options v-if="optionIsOpen">
                        <template #first>
                            <div class="option" @click="addToQueue()">加入佇列</div>
                        </template>
                        <template #second v-if="playlist.isOwner">
                            <div class="option" @click="showModal">編輯清單</div>
                        </template>
                        <template #third v-if="playlist.isOwner">
                            <div class="option link" @click="deletePlaylist">
                                刪除清單
                            </div>
                        </template>
                        <template #forth v-if="playlist.isOwner">
                            <div class="option" v-if="playlist.isPublic == false" @click="changePrivacySetting">設為公開</div>
                            <div class="option" v-else @click="changePrivacySetting">設為私人</div>
                        </template>
                        <template #fifth v-if="playlist.isOwner == false">
                            <div class="option" v-if="playlist.isPublic" @click="togglePlalistLiked">加入音樂庫</div>
                            <div class="option" v-else @click="togglePlalistLiked">從音樂庫移除</div>
                        </template>
                        <template #sixth>
                        </template>
                    </Options>
                </div>
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
                                <RouterLink to="/artist" class="artistName" v-for="artist in metadata.song.artists"
                                    @click="setArtist(artist.artistId)">
                                    {{ artist.artistName }}
                                </RouterLink>
                                <RouterLink to="/creator" class="creatorName" v-for="creator in metadata.song.creators"
                                    @click="setCreator(creator.creatorId)">{{
                                        creator.creatorName
                                    }}</RouterLink>
                            </div>
                        </div>
                    </template>
                    <template #album>
                        <RouterLink to="/album" class="albumName" @click="setAlbum(metadata.song.albumId)">
                            {{ metadata.song.albumName }}
                        </RouterLink>
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
                        <div v-if="metadata.isHover">
                            <font-awesome-icon class="btn" icon="fa-solid fa-ellipsis" @click="toggleSongOption(i)" />
                        </div>
                        <div class="songOptionParent" v-if="metadata.optionIsOpen">
                            <div class="SongOptions">
                                <Options>
                                    <template #first>
                                        <div class="option" @click="addSongToQueue(metadata.song.id)">加入佇列</div>
                                    </template>
                                    <template #second>
                                        <div class="option" @click="addToQueue()">前往專輯</div>
                                    </template>
                                    <template #third>
                                        <div class="option" @click="addToQueue()">顯示提供者</div>
                                    </template>
                                    <template #forth>
                                        <div class="option" @click="removeFromPlaylist(metadata.displayOrder)">從播放清單中移除
                                        </div>
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
        </div>
        <div class="content">
            <div id="searchHeader">
                <span>為你的播放清單新增內容</span>
            </div>
            <div id="search">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" style="font-size: 20px; margin-right: 6px;" />
                <input type="text" @input="searchSong" v-model="searchValue" placeholder="輸入歌曲名稱">
            </div>
            <div id="searchSongs">
                <Song v-for="(song, index) in searchSongs" :key="song.id" class="songContent">
                    <template #name>
                        <div class="songInfo">
                            <div class="songPicture">
                                <img :src=song.songCoverPath alt="" class="img">
                            </div>
                            <div class="desc">
                                <div class="songName">{{ song.songName }}</div>
                                <RouterLink to="/artist" class="artistName" v-for="artist in song.artistlist"
                                    @click="setArtist(artist.artistId)">
                                    {{ artist.artistName }}
                                </RouterLink>
                                <RouterLink to="/creator" class="creatorName" v-for="creator in song.creatorlist"
                                    @click="setCreator(creator.creatorId)">{{
                                        creator.creatorName
                                    }}</RouterLink>
                            </div>
                        </div>
                    </template>
                    <template #time>
                        <div class="plus" @click="addSongToPlaylist(song.id)">
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </div>
                    </template>
                </Song>
            </div>
        </div>
    </div>
    <div class="modal-container" v-if="modalOpen">
        <div class="modal">
            <div>
                <span style="font-size: 2rem; font-weight:bold">編輯播放清單</span>
                <font-awesome-icon icon="fa-solid fa-xmark" style="font-size: 2rem; margin-left: 24rem"
                    @click="hideModal" />
            </div>
            <form class="form" id="form" enctype="multipart/form-data">
                <div class="pic">
                    <input type="file" id="imageUpload" name="PlaylistCover" style="display: none" @change="setPic">
                    <label for="imageUpload">
                        <img :src=playlist.playlistCoverPath alt=""
                            v-if="playlist.playlistCoverPath != 'https://localhost:44373/Uploads/Covers/'" id="preview">
                        <img src="@/assets/music-note-icon-song-melody-tune-flat-symbol-free-vector.webp" alt=""
                            id="preview" v-else>
                    </label>
                </div>
                <div class="name">
                    <div>
                        <input type="text" :value="playlist.listName" name="ListName">
                    </div>
                    <div id="about">
                        <textarea rows="7" cols="40" placeholder="關於" name="Description" />
                    </div>
                    <div id="submit">
                        <button type="button" @click="updatePlaylist(), hideModal()">完成</button>
                    </div>
                </div>
            </form>
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
        margin-bottom: 2rem;

        >#contentHeader {
            width: 100%;
            height: 3rem;
            margin-bottom: 1rem;
            color: rgb(152, 152, 152);
            border-bottom: 1px solid rgb(152, 152, 152);
        }

        >#contentBody,
        #searchSongs {
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

                        >.artistName {
                            color: white;
                            text-decoration: none;

                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                }

                .albumName {
                    color: white;
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }


        #searchHeader {
            font-size: 20px;
            color: #fff;
            margin-bottom: 1rem;
            margin-left: 3rem;
        }

        #search {
            padding: 0 10px;
            width: 16rem;
            height: 2rem;
            border-radius: 50px;
            display: flex;
            align-items: center;
            background-color: #fff;
            margin-left: 2rem;
            margin-bottom: 1rem;

            input {
                width: 13rem;
                font-size: 18px;
                border: none;

                &:focus {
                    outline: none;
                }
            }
        }
    }
}

#playlistOptions {

    #POptions {
        position: absolute;
        top: 20rem;
        left: 31rem;
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

.btn {
    float: left;
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

.link {
    text-decoration: none;
    cursor: context-menu;
}

.header {
    &:hover {
        color: white;
        cursor: context-menu;
    }
}

.plus {
    font-size: 20px;

    &:hover {
        color: #f68718;
        cursor: pointer;
    }
}

.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.3);
}

.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    color: rgb(0, 0, 0);
    padding: 20px;

    .form {
        margin-top: 1rem;
        display: flex;

        .pic {
            width: 15rem;
            height: 15rem;
            margin-right: 1rem;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .name {

            input {
                font-size: 2rem;
                border: none;
            }

            #about {
                height: 10rem;
                border-radius: 10px;
                border: 1px solid black;
                margin-bottom: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;

                textarea {
                    font-size: 16px;
                    border: none;
                    resize: none;

                    &:focus {
                        outline: none;
                    }
                }
            }

            #submit {
                display: flex;
                justify-content: center;
                align-items: center;

                button {
                    width: 3rem;
                    height: 2rem;
                    border: none;
                    border-radius: 5px;

                    &:hover {
                        color: #fff;
                        background-color: #f68718;
                    }
                }
            }
        }
    }
}
</style>