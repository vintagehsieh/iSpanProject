<script>
export default {};
</script>

<template>
    <div class="currentMusic">
        <div class="songInfo">
            <div class="picture">
                <img src="../assets/logo.png" alt="">
            </div>
            <div class="names">
                <p class="songName">Song Name</p>
                <p class="artistName">Artist Name</p>
            </div>
            <div class="liked">
                <button>heart</button>
            </div>
        </div>
    </div>
    <div class="player-controls">
        <div class="player-controls_buttons">
            <div class="player-controls_left">
                <button id="shuffle"></button>
                <button id="previous"></button>
            </div>
            <button id="play"></button>
            <div class="player-contaols_right">
                <button id="next"></button>
                <button id="repeat"></button>
            </div>
        </div>
        <div class="playback-bar">
            <div id="currentTime"></div>
            <div id="timeBar"></div>
            <div id="totalTime"></div>
        </div>
    </div>
    <div class="options">
        <div id="lyric"></div>
        <div id="queue"></div>
        <div id="volumn"></div>
        <div id="full-screen"></div>
    </div>
</template>

<style lang="scss">
.currentMusic {
    width: 100%;
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
                font-size: 1rem;
                margin-bottom: 1ch;
            }

            >.artistName {
                font-size: 3px;
                color: lightgrey;
            }
        }
    }
}
</style>