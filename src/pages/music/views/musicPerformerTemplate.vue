<script>
export default {};
</script>
<template>
    <div class="container">
        <div class="contentSpacing" id="playlistHeader">
            <div class="picture">
                <img src="@/assets/music-note-icon-song-melody-tune-flat-symbol-free-vector.webp" alt="">
            </div>
            <div id="Info">
                <div id="type">藝人</div>
                <div id="playlistName">{{ playlist.name }}</div>
                <div id="infoDetail">
                    <span id="likes">喜歡人數 {{ playlist.totalLikes }}</span>
                </div>
            </div>
        </div>
        <div id="btns">
            <button id="playPause">
                <font-awesome-icon class="btn" id="play" icon="fa-solid fa-play" v-if="isPlaying == false"
                    @click="togglePlay" />
                <font-awesome-icon class="btn" id="pause" icon="fa-solid fa-pause" v-else @click="togglePlay" />
            </button>
            <button id="followed">
                {{ followedState }}
            </button>
            <button id="Options">
                <font-awesome-icon class="btn" icon="fa-solid fa-ellipsis" />
            </button>
        </div>
        <div class="content">
            <div id="popSongs">

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