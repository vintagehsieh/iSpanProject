<script>
import { ref } from 'vue'

export default {
  data() {
    return {
      isMain: true,
      showAllName: "",
      showAll: "顯示所有內容"
    }
  },
  async mounted() { // new lifecycle hook
    await this.fetchAllData();
  },
  setup() {
    const popularSongs = ref({
      headerName: "熱門歌曲",
      items: {}
    });
    const popularAlbums = ref({
      headerName: "熱門專輯",
      items: {}
    });
    const popularPlaylists = ref({
      headerName: "精選播放清單",
      items: {}
    });
    const popularArtists = ref({
      headerName: "推薦藝人",
      items: {}
    });
    const popularCreators = ref({
      headerName: "最受歡迎創作者",
      items: {}
    });

    async function fetchAllData() {
      await Promise.all([
        fetchSongDataAsync(),
        fetchAlbumDataAsync(),
        fetchPlaylistDataAsync(),
        fetchArtistDataAsync(),
        fetchCreatorDataAsync(),
      ]);
    }

    async function fetchSongDataAsync() {
      const responseSongs = await fetch('https://localhost:7043/Songs/Popular');
      const songs = await responseSongs.json();
      popularSongs.value.items = songs;
    }

    async function fetchAlbumDataAsync() {
      const responseAlbums = await fetch('https://localhost:7043/Albums/Recommended');
      const albums = await responseAlbums.json();
      popularAlbums.value.items = albums;
    }

    async function fetchPlaylistDataAsync() {
      const responsePlaylists = await fetch('https://localhost:7043/Playlists/Recommended');
      const playlists = await responsePlaylists.json();
      popularPlaylists.value.items = playlists;
    }

    async function fetchArtistDataAsync() {
      const responseArtists = await fetch('https://localhost:7043/Artists/Recommended');
      const artists = await responseArtists.json();
      popularArtists.value.items = artists;
    }

    async function fetchCreatorDataAsync() {
      const responseCreators = await fetch('https://localhost:7043/Creators/Recommended');
      const creators = await responseCreators.json();
      popularCreators.value.items = creators;
    }

    return {
      popularSongs,
      popularAlbums,
      popularPlaylists,
      popularArtists,
      popularCreators,
      fetchAllData,
    };
  },
  methods: {
    showAllPopSongs(popItems) {
      this.isMain = !this.isMain;
      this.showAllName = popItems.headerName;
    },
    returnMainPage() {
      this.isMain = !this.isMain;
    },
    setAlbum(albumId) {
      this.$store.dispatch('setAlbum', albumId);
    },
    setArtist(artistId) {
      this.$store.dispatch('setArtist', artistId);
    },
    setCreator(creatorId) {
      this.$store.dispatch('setCreator', creatorId);
    }
  }
};
</script>

<template>
  <div class="container" v-show="isMain">
    <div class="announcement"></div>
    <div class="trans">
      <div class="populars">
        <div class="box" id="popularSongs">
          <div class="contentHeader" id="popSongHeader">
            <span class="headerName">{{ popularSongs.headerName }}</span>
            <span class="showAll" @click="showAllPopSongs(popularSongs)">{{ showAll }}</span>
          </div>
          <div class="content">
            <RouterLink v-for="song in popularSongs.items" :key="song.id" to="/MusicAlbum"
              @click="setAlbum(song.albumId)">
              <Card>
                <template #picture>
                  <img :src=song.songCoverPath alt="">
                </template>
                <template #name>
                  <h3>{{ song.songName }}</h3>
                </template>
                <template #desc>
                  <span v-for="artist in song.artistlist">{{ artist.artistName }}</span>
                </template>
              </Card>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="populars">
        <div class="box" id="popularAlbums">
          <div class="contentHeader" id="popAlbumHeader">
            <span class="headerName">{{ popularAlbums.headerName }}</span>
            <span class="showAll">{{ showAll }}</span>
          </div>
          <div class="content">
            <RouterLink v-for="album in popularAlbums.items" :key="album.id" to="/MusicAlbum" @click="setAlbum(album.id)">
              <Card>
                <template #picture>
                  <img :src=album.albumCoverPath alt="">
                </template>
                <template #name>
                  <h3>{{ album.albumName }}</h3>
                </template>
                <template #desc>
                  <p>{{ album.mainArtistName[0] }}</p>
                </template>
              </Card>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="populars">
        <div class="box" id="popularPlaylists">
          <div class="contentHeader" id="popPlaylistHeader">
            <span class="headerName">{{ popularPlaylists.headerName }}</span>
            <span class="showAll">{{ showAll }}</span>
          </div>
          <div class="content">
            <RouterLink v-for="playlist in popularPlaylists.items" :key="playlist.id" to="/MusicPlaylist"
              @click="setPlaylist(playlist.id)">
              <Card>
                <template #picture>
                  <img :src=playlist.playlistCoverPath alt="">
                </template>
                <template #name>
                  <h3>{{ playlist.playlistName }}</h3>
                </template>
                <template #desc>
                  <!-- <p>{{ playlist.mainArtistName[0] }}</p> -->
                </template>
              </Card>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="populars">
        <div class="box" id="popularArtists">
          <div class="contentHeader" id="popArtistHeader">
            <span class="headerName">{{ popularArtists.headerName }}</span>
            <span class="showAll">{{ showAll }}</span>
          </div>
          <div class="content">
            <RouterLink v-for="artist in popularArtists.items" :key="artist.id" to="/MusicPerformerTemplate"
              @click="setArtist(artist.id)">
              <Card>
                <template #picture>
                  <img :src=artist.artistCoverPath alt="">
                </template>
                <template #name>
                  <h3>{{ artist.artistName }}</h3>
                </template>
              </Card>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="populars">
        <div class="box" id="popularCreators">
          <div class="contentHeader" id="popCreatorHeader">
            <span class="headerName">{{ popularCreators.headerName }}</span>
            <span class="showAll">{{ showAll }}</span>
          </div>
          <div class="content">
            <RouterLink v-for="creator in popularCreators.items" :key="creator.id" to="/MusicPerformerTemplate"
              @click="setCreator(creator.id)">
              <Card>
                <template #picture>
                  <img :src=creator.creatorCoverPath alt="">
                </template>
                <template #name>
                  <h3>{{ creator.creatorName }}</h3>
                </template>
              </Card>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container" id="allPopular" v-show="!isMain">
    <div class="header">
      <div class="returnBtn">
        <font-awesome-icon icon="fa-solid fa-angle-left" style="margin-right: 5px" />
        <span class="return" @click="returnMainPage()">返回</span>
      </div>
      <div class="headerName">
        <span>{{ showAllName }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 5rem 3rem;
  min-height: 100vh;
  color: white;

  >.announcement {
    width: 80%;
    height: 15rem;
    background-color: #F6B352;
    margin: 0 auto 2rem auto;
    border-radius: 20px;
  }

  >.trans {
    >.populars {
      >.box {
        >.contentHeader {
          margin: 0 3rem;
          font-size: 20px;
          cursor: context-menu;
          display: flex;
          justify-content: space-between;
          align-items: center;

          >.showAll {
            right: 0;
            bottom: 0;
            font-size: 16px;
            padding: 5px 10px;
            border-radius: 5px;
            color: rgb(160, 160, 160);
            cursor: context-menu;

            &:hover {
              color: white;
              background-color: #383A3F;
            }
          }
        }

        >.content {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
      }
    }
  }

  >.header {
    >.returnBtn {
      width: 4rem;
      height: 2rem;
      border-radius: 5px;
      color: rgb(160, 160, 160);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: context-menu;

      &:hover {
        color: white;
        background-color: #383A3F;
      }
    }

    >.headerName {
      font-size: 40px;
    }
  }
}

.slide-left-leave-active,
.slide-left-enter-active {
  transition: all .8s ease;
}

.slide-left-enter-from {
  transform: translateX(-100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-leave-active,
.slide-right-enter-active {
  transition: all .8s ease;
}

.slide-right-enter-from {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
