<script>
import { ref } from 'vue'

export default {
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

    async function loadData() {
      const responseSongs = await fetch('https://localhost:7043/Songs/Popular');
      const songs = await responseSongs.json();
      popularSongs.value.items = songs;

      const responseAlbums = await fetch('https://localhost:7043/Albums/Recommended');
      const albums = await responseAlbums.json();
      popularAlbums.value.items = albums;

      // const responsePlaylists = await fetch('https://localhost:7043/Playlists/Recommended');
      // const playlists = await responsePlaylists.json();
      // popularPlaylists.items = playlists;

      const responseArtists = await fetch('https://localhost:7043/Artists/Recommended');
      const artists = await responseArtists.json();
      popularArtists.value.items = artists;

      // const responseCreators = await fetch('https://localhost:7043/Creators/Recommended');
      // const creators = await responseCreators.json();
      // popularCreators.items = creators;
    }

    loadData();

    return { popularSongs, popularAlbums, popularPlaylists, popularArtists, popularCreators };
  },
  data() {
    return {
      showAll: "顯示所有內容"
    }
  },
  methods: {
    handleLinkClick(id) {
      // Modify the shareData before navigating to the next page
      this.setAlbum(id);
    },
    printSongs() {
      console.log(this.popularSongs.items[0].artistlist)
    },
    async setAlbum(id) {
      this.$store.dispatch('setAlbum', id);
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="announcement"></div>
    <div class="populars">
      <div class="box" id="popularSongs">
        <div class="contentHeader" id="popSongHeader">
          <span class="headerName">{{ popularSongs.headerName }}</span>
          <span class="showAll" @click="printSongs()">{{ showAll }}</span>
        </div>
        <div class="content">
          <RouterLink v-for="song in popularSongs.items" :key="song.id" to="/MusicAlbum"
            @click="handleLinkClick(song.albumId)">
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
          <RouterLink v-for="album in popularAlbums.items" :key="album.id" to="/MusicAlbum"
            @click="handleLinkClick(album.id)">
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
      <div class="box" id="popularArtists">
        <div class="contentHeader" id="popArtistHeader">
          <span class="headerName">{{ popularArtists.headerName }}</span>
          <span class="showAll">{{ showAll }}</span>
        </div>
        <div class="content">
          <RouterLink v-for="artist in popularArtists.items" :key="artist.id" to="/MusicPerformerTemplate">
            <Card>
              <template #picture>
                <img :src=artist.artistCoverPath alt="">
              </template>
              <template #name>
                <h3>{{ artist.artistName }}</h3>
              </template>
              <template #desc>
                <!-- <p>{{ artist.mainArtistName[0] }}</p> -->
              </template>
            </Card>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 6rem 3rem;

  >.announcement {
    width: 80%;
    height: 15rem;
    background-color: #F6B352;
    margin: 0 auto 2rem auto;
    border-radius: 20px;
  }

  >.populars {
    >.box {
      >.contentHeader {
        margin: 0 3rem;
        font-size: 20px;
        color: white;
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
          cursor: pointer;

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
</style>
