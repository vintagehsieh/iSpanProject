<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();

        store.dispatch('setAlbums');
        store.dispatch('setPlaylists');
        store.dispatch('setArtists');
        store.dispatch('setCreators');

        const albums = computed(() => {
            return store.getters.getAlbums;
        })
        const playlists = computed(() => {
            return store.getters.getPlaylists;
        })
        const artists = computed(() => {
            return store.getters.getArtists;
        })
        const creators = computed(() => {
            return store.getters.getCreators;
        })

        return { playlists, albums, artists, creators };
    },
    data() {
        return {
            sortType: "playlist",
            sortByOptions: [
                {
                    name: "RecentlyAdded",
                    value: "最近新增"
                },
                {
                    name: "Alphabetically",
                    value: "依字母排序"
                }
            ],
            sortByOpen: false,
            selectedSortBy: {},
            query: {
                IncludedLiked: true,
                Condition: "RecentlyAdded",
                Value: "",
            },
            searchValue: "",
        }
    },
    methods: {
        changeSortType(value) {
            this.sortType = value;
            this.storeDispatch();
        },
        toggleSortByOpen() {
            this.sortByOpen = !this.sortByOpen;
        },
        changeSortOption(option) {
            this.selectedSortBy = option;
            this.toggleSortByOpen();
            this.query["IncludedLiked"] = true;
            this.query["Condition"] = this.selectedSortBy.name;
            this.query["Value"] = this.searchValue;
            this.storeDispatch();
        },
        storeDispatch() {
            if (this.sortType == "playlist") {
                this.$store.dispatch('setPlaylists', this.query);
            } else if (this.sortType == "album") {
                this.$store.dispatch('setAlbums', this.query);
            } else {
                this.$store.dispatch('setArtists', this.query);
                this.$store.dispatch('setCreators', this.query);
            }
        },
        checkPath(playlist) {
            console.log(playlist.playlistCoverPath)
            return playlist.playlistCoverPath != '' ? playlist.playlistCoverPath : "https://localhost:44373/Uploads/Covers/note.png";
        },
        setPlaylist(playlistId) {

            this.$store.dispatch("setPlaylist", playlistId);
        },
        setAlbum(albumId) {
            this.$store.dispatch("setAlbum", albumId);
        },
        setArtist(artistId) {
            this.$store.dispatch("setArtist", artistId);
        },
        setCreator(creatorId) {
            this.$store.dispatch("setCreator", creatorId);
        }, search() {
            this.query["Value"] = this.searchValue;
            this.storeDispatch();
        }
    },
    created() {
        this.selectedSortBy = this.sortByOptions[0];
    }
};
</script>
<template>
    <div class="container">
        <div id="librarySort">
            <div class="box" id="playlist" @click="changeSortType('playlist')">播放清單</div>
            <div class="box" id="artistAndCreator" @click="changeSortType('artistAndCreator')">藝人與創作者</div>
            <div class="box" id="album" @click="changeSortType('album')">專輯</div>
            <div id="search">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" style="font-size: 20px; margin-right: 8px;" />
                <input type="text" placeholder="搜尋" v-model="searchValue" @keyup="search" />
            </div>
            <div id="sortBy">
                <div id="sortByBtn" @click="toggleSortByOpen()">
                    {{ selectedSortBy.value }}
                    <font-awesome-icon icon="fa-solid fa-caret-down" v-if="sortByOpen == false" />
                    <font-awesome-icon icon="fa-solid fa-caret-up" v-else />
                </div>
                <div id="sortByList" v-if="sortByOpen">
                    <div class="option" v-for="option in sortByOptions" @click="changeSortOption(option)">{{ option.value }}
                    </div>
                </div>
            </div>
        </div>
        <div class="content" v-if="sortType == 'playlist'">
            <div class="header">
                <h2>播放清單</h2>
            </div>
            <div class="innerContent">
                <RouterLink to="/playlist" v-for="playlist in playlists" :key="playlist.id"
                    @click="setPlaylist(playlist.id)">
                    <Card class="playlistCard">
                        <template #picture>
                            <img :src=checkPath(playlist) alt="">
                        </template>
                        <template #name>
                            <span>{{ playlist.listName }}</span>
                        </template>
                        <template #desc v-if='playlist.ownerName != ""'>
                            <div>擁有者:{{ playlist.ownerName }}</div>
                        </template>
                    </Card>
                </RouterLink>
            </div>
        </div>
        <div class="content" v-else-if="sortType == 'artistAndCreator'">
            <div class="header">
                <h2>藝人與創作者</h2>
            </div>
            <div class="innerContent">
                <RouterLink to="/creator" v-for="creator in creators" :key="creator.id" @click="setCreator(creator.id)">
                    <Card>
                        <template #picture>
                            <img :src=creator.creatorPicPath alt="">
                        </template>
                        <template #name>
                            <span>{{ creator.creatorName }}</span>
                        </template>
                    </Card>
                </RouterLink>
                <RouterLink to="/artist" v-for="artist in artists" :key="artist.id" @click="setArtist(artist.id)">
                    <Card>
                        <template #picture>
                            <img :src=artist.artistPicPath alt="">
                        </template>
                        <template #name>
                            <span>{{ artist.artistName }}</span>
                        </template>
                    </Card>
                </RouterLink>
            </div>
        </div>
        <div class="content" v-else>
            <div class="header">
                <h2>專輯</h2>
            </div>
            <div class="innerContent">
                <RouterLink to="/album" v-for="album in albums" :key="album.id" @click="setAlbum(album.id)">
                    <Card>
                        <template #picture>
                            <img :src=album.albumCoverPath alt="">
                        </template>
                        <template #name>
                            <span>{{ album.albumName }}</span>
                        </template>
                        <template #desc>
                            <div>{{ album.mainArtistName }}</div>
                        </template>
                    </Card>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.container {
    width: 100%;
    min-height: 42rem;
    height: auto;
    padding: 4rem 3rem 4rem 3rem;
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

        >#sortBy {
            width: 7rem;
            height: 2rem;
            cursor: context-menu;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 1rem;
            background-color: #6b6b6b;
            border-radius: 50px;
            position: relative;

            >#sortByBtn {}

            >#sortByList {
                width: 8rem;
                background-color: #6b6b6b;
                position: absolute;
                top: 36px;
                border-radius: 10px;

                >.option {
                    width: 8rem;
                    padding: 4px 1rem;
                    text-align: center;
                    border-radius: 10px;

                    &:hover {
                        background-color: #7d7d7d;
                    }
                }
            }
        }
    }

    >.content {
        padding-top: 2rem;
        color: white;
        flex-wrap: wrap;

        >.innerContent {
            display: flex;
            flex-wrap: wrap;

            >.artistCreatorBody {
                display: flex;
                flex-wrap: wrap;
            }
        }
    }
}

#search {
    width: 15rem;
    height: 35px;
    padding: 0 1rem;
    margin-left: auto;
    background-color: #fff;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    >input {
        font-size: large;
        border: none;

        &:focus {
            outline: none;
        }
    }
}
</style>