<script>
import Queue from './MusicQueue.vue';

export default {
    data() {
        return {
            playStatus: false,
            showQueue: false,
            currentTime: 0,
            musicInterval: '',
            volume: 50,
            song: {
                id: 1,
                name: "Song Name",
                artist: "Artist Name",
                isLiked: false,
                duration: 188,
            },
            music: 'https://localhost:44373/Uploads/Songs/6f405bb8b632440280ad3f2ab9817ce0.mp3',
            musicPlayer: new Audio(),
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
        toggleLiked() {
            this.musicPlayer.src = this.music;
            this.musicPlayer.volume = 0.5;
            this.song.isLiked = !this.song.isLiked;
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
            this.musicPlayer.volume = val / 100;
        },
        formatTime(seconds) {
            // Compute the number of minutes and remaining seconds
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);

            // Pad the seconds with a leading zero if needed
            const paddedSeconds = remainingSeconds.toString().padStart(2, '0');

            // Combine the minutes and seconds into a string
            return `${minutes}:${paddedSeconds}`;
        },
        checkSong() {
            return Object.keys(this.song).length != 0
        },
        trackCurrentTime() {
            let timeBar = document.querySelector('#time-bar');

            const min = timeBar.min;
            const max = timeBar.max;
            const val = timeBar.value;

            timeBar.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'

            this.currentTime = this.musicPlayer.currentTime;
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="currentMusic">
            <div class="songInfo" v-if="checkSong()">
                <div class="picture">
                    <img src="@/assets/logo.png" alt="">
                </div>
                <div class="names">
                    <p class="songName">{{ song.name }}</p>
                    <p class="artistName">{{ song.artist }}</p>
                </div>
                <div class="liked">
                    <font-awesome-icon v-if="song.isLiked" icon="fa-solid fa-heart" style="color: white; font-size: 20px"
                        @click="toggleLiked" />
                    <font-awesome-icon v-else icon="fa-regular fa-heart" style="color: white; font-size: 20px"
                        @click="toggleLiked" />
                </div>
            </div>
        </div>
        <div class="player-controls">
            <div id="player-controls_buttons">
                <div class="player-controls_left">
                    <font-awesome-icon id="shuffle" class="playerBtn" icon="fa-solid fa-shuffle" />
                    <font-awesome-icon id="previous" class="playerBtn" icon="fa-solid fa-backward-step" />
                </div>
                <div class="player-controls_center">
                    <font-awesome-icon id="play" icon="fa-solid fa-play" v-if="playStatus == false" @click="togglePlay" />
                    <font-awesome-icon id="pause" icon="fa-solid fa-pause" v-else @click="togglePlay" />
                </div>
                <div class="player-controls_right">
                    <font-awesome-icon id="next" class="playerBtn" icon="fa-solid fa-forward-step" />
                    <font-awesome-icon id="repeat" class="playerBtn" icon="fa-solid fa-repeat" />
                </div>
            </div>
            <div class="playback-bar">
                <div id="currentTime">{{ formatTime(currentTime) }}</div>
                <div id="timeBar">
                    <input type="range" min="0" step="1" :max="musicPlayer.duration" v-model="currentTime" id="time-bar"
                        @input="changeCurrentTime" />
                </div>
                <div id="totalTime">{{ formatTime(musicPlayer.duration) }}</div>
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
                    <input type="range" min="0" step="1" max="100" v-model="volume" id="volume-range"
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
#musicPlayer {
    display: none;
}

.container {
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
        background-size: 50% 100%;
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

.playerBtn {
    color: grey;
    font-size: 25px;

    &:hover {
        color: white;
    }
}
</style>