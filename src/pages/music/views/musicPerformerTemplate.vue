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
    }
}

.header {
    &:hover {
        color: white;
        cursor: context-menu;
    }
}
</style>