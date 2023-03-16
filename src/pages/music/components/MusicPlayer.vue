<script>
import Queue from './MusicQueue.vue';
import { useStore } from 'vuex';
import { computed, watchEffect, ref } from 'vue';

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

        const forceMode = computed(() => {
            return store.getters.getForcePlayMode;
        })

        var playStatus = ref(false);
        var currentTime = ref(0);

        watchEffect(() => {
            if (currentSong.value != undefined && currentSong.value.songPath != musicPlayer.src) {
                musicPlayer.src = currentSong.value?.songPath ?? "";

                // musicPlayer.play();
                // console.log(musicPlayer.duration)
                // musicPlayer.currentTime = queue.currentSongTime;

                if (playStatus == true || store.state.music.main.forcePlayMode == true) {
                    musicPlayer.play();
                    playStatus = true;
                    store.dispatch('setForcePlayMode', false);
                } else {
                    currentTime = 0;
                }
            }
        })

        return { currentSong, musicPlayer, queue, playlist, forceMode, playStatus, currentTime };
    },
    mounted() {
        this.musicPlayer.onended = this.nextSong;
    },
    created() {
        // listen for fullscreen change events
        document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    },
    beforeDestroy() {
        // remove event listeners
        document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    },
    data() {
        return {
            showQueue: false,
            musicInterval: '',
            volume: 50,
            oldVolume: 0,
            isFullscreen: false,
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
    },
    components: {
        Queue,
    },
    computed: {
        cssProps() {
            return {
                '--background-img': `url(${this.currentSong.songCoverPath})`,
            }
        }
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
        toggleFullScreen() {
            this.isFullscreen = !this.isFullscreen;

            if (this.isFullscreen) {
                // enter fullscreen mode
                this.$refs.myElement.requestFullscreen();
            } else {
                // exit fullscreen mode
                document.exitFullscreen();
            }
        },
        handleFullscreenChange() {
            if (!document.fullscreenElement) {
                // if the user exits fullscreen mode
                this.isFullscreen = false;
            }
        },
    }
};
</script>

<template>
    <transition name="fullscreen-transition">
        <div :class="{ 'fullscreen': isFullscreen, 'contriner': !isFullscreen }" id="fullscreen-div" ref="myElement">
            <div class="currentMusic">
                <div class="songInfo" v-if="this.currentSong != undefined">
                    <div class="picture">
                        <img :src=currentSong.songCoverPath alt="">
                    </div>
                    <div class="names">
                        <RouterLink to="/album" @click="setAlbum" class="link">
                            <div class="songName">{{ currentSong.songName }}</div>
                        </RouterLink>
                        <RouterLink to="/artist" v-for="artist in currentSong.artists" @click="setArtist(artist.artistId)"
                            class="link">
                            <span class="artistName">{{ artist.artistName }}</span>
                        </RouterLink>
                        <RouterLink to="/creator" v-for="creator in currentSong.creators"
                            @click="setCreator(creator.creatorId)" class="link creatorName">
                            <span>{{ creator.creatorName }}</span>
                        </RouterLink>
                    </div>
                    <div class="liked">
                        <font-awesome-icon v-if="currentSong.isLiked" icon="fa-solid fa-heart" @click="toggleSongLiked" />
                        <font-awesome-icon v-else icon="fa-regular fa-heart" @click="toggleSongLiked" />
                    </div>
                </div>
            </div>
            <div class="player-controls">
                <div id="player-controls_buttons">
                    <div class="player-controls_left">
                        <font-awesome-icon id="shuffle" class="playerBtn" icon="fa-solid fa-shuffle"
                            @click="toggleShuffle" />
                        <font-awesome-icon id="previous" class="playerBtn" icon="fa-solid fa-backward-step"
                            @click="previousSong" />
                    </div>
                    <div class="player-controls_center">
                        <font-awesome-icon id="play" icon="fa-solid fa-play" v-if="playStatus == false"
                            @click="togglePlay" />
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
                        style="color:white; font-size: 20px;" @click="toggleFullScreen" />
                </div>
            </div>
            <Queue id="queue" v-if="showQueue" />
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.fullscreen {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background: linear-gradient(#F6B352 0%, #000000 100%);

    /* set your preferred color */
    /* add any other styles you want */
    >.currentMusic {
        width: 33%;
        height: 100%;
        padding: 1rem;
        display: flex;
        align-items: center;
        position: relative;

        >.songInfo {
            height: 100%;
            align-items: center;
            display: flex;
            position: relative;

            >.picture {
                width: 400px;
                height: auto;
                margin-right: 1rem;
                top: 15rem;
                left: 7rem;
                align-items: center;
                position: absolute;

                >img {
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                }
            }

            >.names {
                width: 18rem;
                height: 3rem;
                color: white;
                margin-right: 1rem;
                top: 3rem;
                left: 3rem;
                align-items: center;
                position: absolute;
                font-size: 36px;
            }

            >.liked {
                position: relative;
                color: white;
                font-size: 30px;
                top: 20rem;
                left: 5rem;
            }
        }
    }

    >.player-controls {
        width: 70%;
        height: 100%;
        top: 40rem;
        position: relative;

        >#player-controls_buttons {
            width: 100%;
            height: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            >.player-controls_left {
                width: 45%;
                height: 5rem;
                display: flex;
                position: relative;
                align-items: center;
                position: relative;

                >#shuffle {
                    position: absolute;
                    right: 7rem;
                    font-size: 25px;
                }

                >#previous {
                    position: absolute;
                    right: 3rem;
                }
            }

            >.player-controls_center {
                width: 10%;
                height: 5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;

                >#play {
                    font-size: 40px;
                    color: white;
                    position: relative;

                    &:hover {
                        font-size: 45px;
                    }
                }

                >#pause {
                    font-size: 40px;
                    color: white;
                    position: relative;
                }
            }

            >.player-controls_right {
                width: 45%;
                height: 100%;
                position: relative;
                display: flex;
                align-items: center;
                position: relative;


                >#next {
                    left: 3rem;
                    position: relative;
                }

                >#repeat {
                    left: 7rem;
                    font-size: 25px;
                    position: relative;
                }
            }
        }

        >.playback-bar {
            width: 100%;
            display: flex;
            justify-content: center;
            position: absolute;


            >#currentTime {
                margin-right: 1rem;
                color: #fff;
                position: relative;
            }

            >#timeBar {
                display: flex;
                align-items: center;
                margin-right: 1rem;
                width: 1000px;
                position: relative;
            }

            >#totalTime {
                color: #fff;
                position: relative;
            }
        }
    }

    >.options {
        width: 33%;
        display: flex;
        padding-left: 8rem;
        align-items: center;
        position: relative;

        >#queueBtn {
            display: none;
        }

        >#volume {
            width: 10rem;
            margin: 1rem;
            display: flex;
            align-items: center;
            position: relative;
            top: 20rem;

            >#volume-icon {
                width: 2rem;
            }

            >#volume-slider {
                width: 8rem;
            }
        }

        >#full-screen {
            width: 2rem;
            position: relative;
            top: 20rem;
            left: 2rem;
        }
    }

    >#queue {
        position: fixed;
        right: 0;
        bottom: 12vh;
        display: none;
    }
}

.fullscreen-transition-enter-active,
.fullscreen-transition-leave-active {
    transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
}

.fullscreen-transition-enter,
.fullscreen-transition-leave-to {
    opacity: 0;
    transform: scale(1.05);
}

.contriner {
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

                .link {
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

            .liked {
                color: white;
                font-size: 20px;
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