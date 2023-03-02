<script>
export default {
    data() {
        return {
            sortType: "playlist",
            playlists: [
                {
                    id: 1,
                    name: "yahaha",
                    owner: "Maru",
                },
                {
                    id: 2,
                    name: "yahaha",
                    owner: "Maru",
                },
                {
                    id: 3,
                    name: "yahaha",
                    owner: "Maru",
                },
                {
                    id: 4,
                    name: "yahaha",
                    owner: "Maru",
                },
                {
                    id: 5,
                    name: "yahaha",
                    owner: "Maru",
                },
                {
                    id: 6,
                    name: "yahaha",
                    owner: "Maru",
                },
                {
                    id: 7,
                    name: "yahaha",
                    owner: "Maru",
                },
            ],
            artists: [
                {
                    id: 1,
                    name: "artist",
                },
                {
                    id: 2,
                    name: "album",
                },
                {
                    id: 3,
                    name: "album",
                },
                {
                    id: 4,
                    name: "album",
                },
                {
                    id: 5,
                    name: "album",
                },
                {
                    id: 6,
                    name: "album",
                },
            ],
            creators: [
                {
                    id: 1,
                    name: "creator",
                },
                {
                    id: 2,
                    name: "creator",
                },
                {
                    id: 3,
                    name: "creator",
                },
                {
                    id: 4,
                    name: "creator",
                },
                {
                    id: 5,
                    name: "creator",
                },
                {
                    id: 6,
                    name: "creator",
                },
                {
                    id: 7,
                    name: "creator",
                },
            ],
            albums: [
                {
                    id: 1,
                    name: "album",
                    owner: "Ruma",
                },
                {
                    id: 2,
                    name: "album",
                    owner: "Ruma",
                },
                {
                    id: 3,
                    name: "album",
                    owner: "Ruma",
                },
                {
                    id: 4,
                    name: "album",
                    owner: "Ruma",
                },
                {
                    id: 5,
                    name: "album",
                    owner: "Ruma",
                },
                {
                    id: 6,
                    name: "album",
                    owner: "Ruma",
                },
                {
                    id: 7,
                    name: "album",
                    owner: "Ruma",
                },
            ],
        }
    },
    methods: {
        changeSortType(value) {
            this.sortType = value;
        }
    }
};
</script>
<template>
    <div class="container">
        <div id="librarySort">
            <div class="box" id="playlist" @click="changeSortType('playlist')">播放清單</div>
            <div class="box" id="artistAndCreator" @click="changeSortType('artistAndCreator')">藝人與創作者</div>
            <div class="box" id="album" @click="changeSortType('album')">專輯</div>
        </div>
        <div class="content" v-if="sortType == 'playlist'">
            <Card v-for="playlist in playlists" :key="playlist.id" class="playlistCard">
                <template #picture>
                    <img src="@/assets/music-note-icon-song-melody-tune-flat-symbol-free-vector.webp" alt="">
                </template>
                <template #name>
                    <span>{{ playlist.name }}</span>
                </template>
                <template #desc>
                    <div>擁有者:{{ playlist.owner }}</div>
                </template>
            </Card>
        </div>
        <div class="content" v-else-if="sortType == 'artistAndCreator'">
            <div class="creatorHeader">
                <h2>創作者</h2>
            </div>
            <div class="creatorContent">
                <Card v-for="creator in creators" :key="creator.id" class="creatorCard">
                    <template #picture>
                        <img src="@/assets/50402309-musician-icon.webp" alt="">
                    </template>
                    <template #name>
                        <span>{{ creator.name }}</span>
                    </template>
                </Card>
            </div>
            <div class="creatorHeader">
                <h2>藝人</h2>
            </div>
            <div class="artistContent">
                <Card v-for="artist in artists" :key="artist.id" class="artistCard">
                    <template #picture>
                        <img src="@/assets/50402309-musician-icon.webp" alt="">
                    </template>
                    <template #name>
                        <span>{{ artist.name }}</span>
                    </template>

                </Card>
            </div>
        </div>
        <div class="content" v-else>
            <Card v-for="album in albums" :key="album.id" class="albumCard">
                <template #picture>
                    <img src="@/assets/music-note-icon-song-melody-tune-flat-symbol-free-vector.webp" alt="">
                </template>
                <template #name>
                    <span>{{ album.name }}</span>
                </template>
                <template #desc>
                    <div>擁有者:{{ album.owner }}</div>
                </template>
            </Card>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container {
    width: 100%;
    height: auto;
    padding: 4rem 3rem;
    background-color: #1F2124;

    >#librarySort {
        display: flex;

        >.box {
            width: auto;
            height: 2rem;
            padding: 10px;
            color: rgb(228, 228, 228);
            // margin-right: 1rem;
            text-align: center;
            display: flex;
            align-items: center;
            border-radius: 5px;
            font-size: 1rem;

            >&:hover {
                color: white;
                background-color: rgb(70, 70, 70);
                cursor: pointer;
            }
        }
    }

    >.content {
        padding-top: 2rem;
        color: white;
        display: flex;
        flex-wrap: wrap;

        >.playlistCard {
            color: white;
        }

        >.creatorContent {
            display: flex;
            flex-wrap: wrap;
        }

        >.artistContent {
            flex-wrap: wrap;
            display: flex;
        }

        >.albumCard {
            color: white;
        }
    }
}
</style>