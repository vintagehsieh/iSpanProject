<script>
import Queue from './MusicQueue.vue';
import { useStore } from 'vuex';
import { computed, watchEffect } from 'vue';

export default {
    setup() {
        const store = useStore();
        var musicPlayer = new Audio();

        store.dispatch('fetchQueueDataAsync');
        store.dispatch('fetchRecentlyPlayed');

        const currentSong = computed(() => {
            return store.getters.getCurrentSong;
        });

        const queue = computed(() => {
            return store.getters.getQueue;
        })

        const playlist = computed(() => {
            return store.getters.getPlaylist;
        })

        watchEffect(() => {
            musicPlayer.src = currentSong.value?.songPath ?? "";
        })

        return { currentSong, musicPlayer, queue, playlist };
    },
    mounted() {
        this.musicPlayer.onended = this.nextSong;
    },
    data() {
        return {
            playStatus: false,
            showQueue: false,
            currentTime: 0,
            musicInterval: '',
            volume: 50,
            oldVolume: 0,
        }
    },
    updated() {
        const shuffle = document.querySelector("#shuffle");
        if (this.queue.isShuffle) {
            shuffle.classList.add("active");
        } else {
            shuffle.classList.remove("active");
        }

        const repeat = document.querySelector("#repeat");

        if (this.queue.isRepeat) {
            repeat.classList.add("active");
        } else {
            repeat.classList.remove("active");
        }

        if (this.musicPlayer.src != "") {
            if (this.playStatus == true) {
                this.musicPlayer.play();
            } else {
                this.currentTime = 0;
            }
        }
    },
    props: ['font-awesome-icon'],
    components: {
        Queue,
    },
    methods: {
        toggleQueue() {
            this.showQueue = !this.showQueue;
        },
        toggleSongLiked() {
            this.currentSong.isLiked = !this.currentSong.isLiked
            if (this.currentSong.isLiked == true) {
                fetch(`https://localhost:7043/Members/LikedSongs/${this.currentSong.id}`, {
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
                fetch(`https://localhost:7043/Members/LikedSongs/${this.currentSong.id}`, {
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

            this.playlist.metadata.forEach(metadatum => {
                if (metadatum.song.id == this.currentSong.id) {
                    metadatum.song.isLiked = this.currentSong.isLiked;
                }
            })
        },
        togglePlay() {
            this.playStatus = !this.playStatus;
            if (this.playStatus == true) {
                this.musicPlayer.play();
                this.musicInterval = setInterval(() => {
                    this.trackCurrentTime();
                }, 500);
            } else {
                this.musicPlayer.pause();
                clearInterval(this.musicInterval);
            }
        },
        changeCurrentTime(e) {
            let target = e.target;

            const min = target.min;
            const max = target.max;
            const val = target.value;

            target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
            this.musicPlayer.currentTime = val;
        },
        changeVolume(e) {
            let target = e.target;

            const min = target.min;
            const max = target.max;
            const val = target.value;

            target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
            this.musicPlayer.volume = val;
        },
        formatTime(seconds) {
            if (isNaN(seconds)) {
                return '0:00';
            }
            // Compute the number of minutes and remaining seconds
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);

            // Pad the seconds with a leading zero if needed
            const paddedSeconds = remainingSeconds.toString().padStart(2, '0');

            // Combine the minutes and seconds into a string
            return `${minutes}:${paddedSeconds}`;
        },
        trackCurrentTime() {
            let timeBar = document.querySelector('#time-bar');

            const min = timeBar.min;
            const max = timeBar.max;
            const val = timeBar.value;

            timeBar.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'

            this.currentTime = this.musicPlayer.currentTime;
        },
        async nextSong() {
            await fetch(`https://localhost:7043/Queues/NextSong`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
                .then(response => response.text())
                .then(data => console.log(data))
                .catch(error => console.error(error))
            await this.$store.dispatch('fetchQueueDataAsync');
            this.reSetPlayer();
            this.$store.dispatch('fetchRecentlyPlayed')
        },
        async previousSong() {
            if (this.musicPlayer.currentTime > 5) {
                this.musicPlayer.currentTime = 0;
                return;
            }

            await fetch(`https://localhost:7043/Queues/PreviousSong`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
                .then(response => response.text())
                .then(data => console.log(data))
                .catch(error => console.error(error))
            await this.$store.dispatch('fetchQueueDataAsync');
            this.reSetPlayer();
            this.$store.dispatch('fetchRecentlyPlayed')
        },
        reSetPlayer() {
            if (this.playStatus) {
                this.playStatus = false;
                this.musicPlayer.play();
                this.playStatus = true;
            }
            this.currentTime = 0;
            console.log('reset')
        },
        async toggleShuffle() {
            this.queue.isShuffle = !this.queue.isShuffle;
            const shuffle = document.querySelector("#shuffle");

            if (this.queue.isShuffle) {
                shuffle.classList.add("active");
            } else {
                shuffle.classList.remove("active");
            }
            await fetch(`https://localhost:7043/Queues/ShuffleSetting`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
                .then(response => response.text())
                .then(data => console.log(data))
                .catch(error => console.error(error))
            await this.$store.dispatch('fetchQueueDataAsync');
        },
        async toggleRepeat() {
            this.queue.isRepeat = !this.queue.isRepeat;
            const repeat = document.querySelector("#repeat");

            if (this.queue.isRepeat) {
                repeat.classList.add("active");
            } else {
                repeat.classList.remove("active");
            }
            await fetch(`https://localhost:7043/Queues/RepeatSetting`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error))
            await this.$store.dispatch('fetchQueueDataAsync');
        },
        async setAlbum() {
            await this.$store.dispatch('setAlbum', this.currentSong.albumId);
        },
        async setArtist(artistId) {
            await this.$store.dispatch('setArtist', artistId);
        },
        async setCreator(creatorId) {
            await this.$store.dispatch('setCreator', creatorId);
        },
    }
};
</script>

<template>
    <div class="container">
        <div class="currentMusic">
            <div class="songInfo" v-if="this.currentSong != undefined">
                <div class="picture">
                    <img :src=currentSong.songCoverPath alt="">
                </div>
                <div class="names">
                    <RouterLink to="/album" @click="setAlbum" class="link">
                        <p class="songName">{{ currentSong.songName }}</p>
                    </RouterLink>
                    <RouterLink to="/artist" v-for="artist in currentSong.artists" @click="setArtist(artist.artistId)"
                        class="link artistName">
                        <span>{{ artist.artistName }}</span>
                    </RouterLink>
                    <RouterLink to="/creator" v-for="creator in currentSong.creators" @click="setCreator(creator.creatorId)"
                        class="link creatorName">
                        <span>{{ creator.creatorName }}</span>
                    </RouterLink>
                </div>
                <div class="liked">
                    <font-awesome-icon v-if="currentSong.isLiked" icon="fa-solid fa-heart"
                        style="color: white; font-size: 20px" @click="toggleSongLiked" />
                    <font-awesome-icon v-else icon="fa-regular fa-heart" style="color: white; font-size: 20px"
                        @click="toggleSongLiked" />
                </div>
            </div>
        </div>
        <div class="player-controls">
            <div id="player-controls_buttons">
                <div class="player-controls_left">
                    <font-awesome-icon id="shuffle" class="playerBtn" icon="fa-solid fa-shuffle" @click="toggleShuffle" />
                    <font-awesome-icon id="previous" class="playerBtn" icon="fa-solid fa-backward-step"
                        @click="previousSong" />
                </div>
                <div class="player-controls_center">
                    <font-awesome-icon id="play" icon="fa-solid fa-play" v-if="playStatus == false" @click="togglePlay" />
                    <font-awesome-icon id="pause" icon="fa-solid fa-pause" v-else @click="togglePlay" />
                </div>
                <div class="player-controls_right">
                    <font-awesome-icon id="next" class="playerBtn" icon="fa-solid fa-forward-step" @click="nextSong" />
                    <font-awesome-icon id="repeat" class="playerBtn" icon="fa-solid fa-repeat" @click="toggleRepeat" />
                </div>
            </div>
            <div class="playback-bar">
                <div id="currentTime">{{ formatTime(currentTime) }}</div>
                <div id="timeBar">
                    <input type="range" min="0" step="1" :max="musicPlayer.duration" v-model="currentTime" id="time-bar"
                        @input="changeCurrentTime" />
                </div>
                <div id="totalTime">{{ formatTime(currentSong != undefined ? currentSong.duration : 0) }}
                </div>
            </div>
        </div>
        <div class="options">
            <div id="lyricBtn"></div>
            <div id="queueBtn">
                <font-awesome-icon :icon="['fas', 'bars']" style="color:white; font-size: 20px;" @click="toggleQueue" />
            </div>
            <div id="volume">
                <div id="volume-icon">
                    <font-awesome-icon icon="fa-solid fa-volume-xmark" v-if="volume == 0"
                        style="color:white; font-size: 20px;" />
                    <font-awesome-icon icon="fa-solid fa-volume-low" v-else-if="volume <= 50"
                        style="color:white; font-size: 20px;" />
                    <font-awesome-icon icon="fa-solid fa-volume-high" v-else style="color:white; font-size: 20px;" />
                </div>
                <div class="volume-slider">
                    <input type="range" min="0" step="0.01" max="1" v-model="musicPlayer.volume" id="volume-range"
                        @input="changeVolume" />
                </div>
            </div>
            <div id="full-screen">
                <font-awesome-icon icon="fa-solid fa-up-right-and-down-left-from-center"
                    style="color:white; font-size: 20px;" />
            </div>
        </div>
        <Queue id="queue" v-if="showQueue" />
    </div>
</template>

<style lang="scss" scoped>
.container {
    z-index: 10;
    width: 100%;
    display: flex;

    >.currentMusic {
        width: 33%;
        height: 100%;
        padding: 1rem;
        display: flex;
        align-items: center;

        >.songInfo {
            height: 100%;
            align-items: center;
            display: flex;

            >.picture {
                width: 60px;
                height: auto;
                margin-right: 1rem;
                align-items: center;

                >img {
                    width: 100%;
                    height: 100%;
                }
            }

            >.names {
                width: 8rem;
                height: 3rem;
                color: white;
                margin-right: 1rem;
                align-items: center;

                >.songName {
                    font-size: 16px;
                    margin-bottom: 1ch;
                }

                >.artistName {
                    font-size: 12px;
                    color: lightgrey;
                }
            }
        }
    }

    >.player-controls {
        width: 34%;
        height: 100%;

        >#player-controls_buttons {
            width: 100%;
            height: 60%;
            display: flex;
            justify-content: center;
            align-items: center;

            >.player-controls_left {
                width: 45%;
                height: 100%;
                display: flex;
                position: relative;
                align-items: center;

                >#shuffle {
                    position: absolute;
                    right: 4rem;
                    font-size: 20px;
                }

                >#previous {
                    position: absolute;
                    right: 2rem;
                }
            }

            >.player-controls_center {
                width: 10%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                >#play {
                    font-size: 30px;
                    color: white;
                    position: absolute;

                    &:hover {
                        font-size: 34px;
                    }
                }

                >#pause {
                    font-size: 30px;
                    color: white;
                    position: absolute;
                }
            }

            >.player-controls_right {
                width: 45%;
                height: 100%;
                position: relative;
                display: flex;
                align-items: center;


                >#next {
                    left: 2rem;
                    position: absolute;
                }

                >#repeat {
                    left: 4rem;
                    font-size: 20px;
                    position: absolute;


                }
            }
        }

        >.playback-bar {
            display: flex;
            justify-content: center;

            >#currentTime {
                margin-right: 1rem;
                color: #fff;
            }

            >#timeBar {
                display: flex;
                align-items: center;
                margin-right: 1rem;
                width: 1000px;
            }

            >#totalTime {
                color: #fff;
            }
        }
    }

    >.options {
        width: 33%;
        display: flex;
        padding-left: 8rem;
        align-items: center;

        >#lyricBtn {
            width: 2rem;
            margin: 1rem;
        }

        >#queueBtn {
            width: 2rem;
            margin: 1rem;

            &:hover {
                cursor: pointer;
            }
        }

        >#volume {
            width: 10rem;
            margin: 1rem;
            display: flex;

            >#volume-icon {
                width: 2rem;
            }

            >#volume-slider {
                width: 8rem;
            }
        }

        >#full-screen {
            width: 2rem;
        }
    }

    >#queue {
        position: fixed;
        right: 0;
        bottom: 12vh;
    }
}

input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 5px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 5px;
    background-image: linear-gradient(#ffffff, #ffffff);
    background-size: 0% 100%;
    background-repeat: no-repeat;

    &#volume-range {
        background-size: 100% 100%;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #fff;
        cursor: pointer;
    }

    &::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        box-shadow: none;
        border: none;
        background: transparent;
    }

    &:hover {
        background-image: linear-gradient(#F6B352, #F6B352);

        &::-webkit-slider-thumb {
            width: 15px;
            height: 15px;
        }
    }
}

.link {
    color: white;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}

.playerBtn {
    color: grey;
    font-size: 25px;

    &:hover {
        color: white;
    }
}

.active {
    color: #F6B352;
}
</style>