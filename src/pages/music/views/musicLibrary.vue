<script>
export default {
    data() {
        return {
            sortType: "playlist",
            sortByOptions: [
                {
                    name: "recentlyAdded",
                    value: "最近新增"
                },
                {
                    name: "Alphabetically",
                    value: "依字母排序"
                }
            ],
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
            artistsAndCreators: [
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
            sortByOpen: false,
            selectedSortBy: {},
        }
    },
    methods: {
        changeSortType(value) {
            this.sortType = value;
        },
        toggleSortByOpen() {
            this.sortByOpen = !this.sortByOpen;
        },
        changeSortOption(option) {
            this.selectedSortBy = option;
            this.toggleSortByOpen();
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
                <h2>藝人與創作者</h2>
            </div>
            <div class="innerContent">
                <Card v-for="playlist in playlists" :key="playlist.id" class="playlistCard">
                    <template #picture>
                        <img src="" alt="">
                    </template>
                    <template #name>
                        <span>{{ playlist.name }}</span>
                    </template>
                    <template #desc>
                        <div>擁有者:{{ playlist.owner }}</div>
                    </template>
                </Card>
            </div>
        </div>
        <div class="content" v-else-if="sortType == 'artistAndCreator'">
            <div class="header">
                <h2>藝人與創作者</h2>
            </div>
            <div class="innerContent">
                <Card v-for="creator in artistsAndCreators" :key="creator.id">
                    <template #picture>
                        <img src="" alt="">
                    </template>
                    <template #name>
                        <span>{{ creator.name }}</span>
                    </template>
                </Card>
            </div>
        </div>
        <div class="content" v-else>
            <div class="header">
                <h2>專輯</h2>
            </div>
            <div class="innerContent">
                <Card v-for="album in albums" :key="album.id">
                    <template #picture>
                        <img src="" alt="">
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

        >#sortBy {
            width: 7rem;
            height: 2rem;
            cursor: context-menu;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: auto;
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
</style>