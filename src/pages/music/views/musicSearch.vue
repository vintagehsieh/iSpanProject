<script>
import { computed } from "vue";
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    store.dispatch('loadData');
    const SongGenres = computed(() => {
      return store.getters.getSongGenre;
    });

    return { SongGenres };
  },
  data() {
    return {
      searchValue: "",
      searchSongs: [],
      searchPlaylists: [],
      searchAlbums: [],
      searchArtists: [],
      searchCreators: [],
      sortType: "all",
    }
  },
  methods: {
    debounce(func, delay) {
      let timeoutId;
      return function (...args) {
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(context, args), delay);
      }
    },
    chooseSort(event) {
      const divs = document.querySelectorAll('.sort-unit');

      divs.forEach(div => {
        // Remove the active class from all divs
        div.classList.remove('active');
      });
      event.target.classList.add('active');
      this.sortType = event.target.id;
    },
    checkSearchValue() {
      return this.searchValue.trim().length != 0
    },
    async search() {
      if (this.searchValue == "") return;
      this.searchAlbums = [];
      this.searchArtists = [];
      this.searchCreators = [];
      this.searchPlaylists = [];
      this.searchSongs = [];
      await fetch(`https://localhost:7043/Songs/${this.searchValue}`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include', })
        .then(response => response.json())
        .then(data => { this.searchSongs = data; })
        .catch(error => console.error(error))

      await fetch(`https://localhost:7043/Artists/${this.searchValue}`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include', })
        .then(response => response.json())
        .then(data => { this.searchArtists = data; })
        .catch(error => console.error(error))

      await fetch(`https://localhost:7043/Creators/${this.searchValue}`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include', })
        .then(response => response.json())
        .then(data => {
          this.searchCreators = data;
        })
        .catch(error => console.error(error))

      await fetch(`https://localhost:7043/Albums/Search/${this.searchValue}`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include', })
        .then(response => response.json())
        .then(data => {
          this.searchAlbums = data;
        })
        .catch(error => console.error(error))

      await fetch(`https://localhost:7043/Playlists/Search/${this.searchValue}`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include', })
        .then(response => response.json())
        .then(data => {
          this.searchPlaylists = data;
        })
        .catch(error => console.error(error))
    },
    formatTime(seconds) {
      // Compute the number of minutes and remaining seconds
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      // Pad the seconds with a leading zero if needed
      const paddedSeconds = remainingSeconds.toString().padStart(2, '0');

      // Combine the minutes and seconds into a string
      return `${minutes}:${paddedSeconds}`;
    },
    setAlbum(albumId) {
      this.$store.dispatch('setAlbum', albumId);
    },
    setPlaylist(playlistId) {
      this.$store.dispatch('setPlaylist', playlistId);
    },
    setArtist(artistId) {
      this.$store.dispatch('setArtist', artistId);
    },
    setCreator(creatorId) {
      this.$store.dispatch('setCreator', creatorId);
    },
    async setGenre(category) {
      await this.$store.dispatch('setGenre', category);
      await this.$store.dispatch('loadGenreSongData');
    },
    sliceSearch(type, items) {
      if (this.sortType == type)
        return items.slice(0, 10);

      return items.slice(0, 5);
    },
  }
};
</script>
<template>
  <div class="container">
    <div id="searchGroup">
      <div id="search">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" style="font-size: 20px; margin-right: 8px;" />
        <input type="text" placeholder="想聽什麼?" v-model="searchValue" @keyup="search" />
      </div>
      <div id="sort" v-if="checkSearchValue()">
        <div class="sort-unit active" id="all" @click="chooseSort">所有</div>
        <div class="sort-unit" id="song" @click="chooseSort">歌曲</div>
        <div class="sort-unit" id="playlist" @click="chooseSort">播放清單</div>
        <div class="sort-unit" id="artistAndCreator" @click="chooseSort">藝人/創作者</div>
        <div class="sort-unit" id="album" @click="chooseSort">專輯</div>
      </div>
      <div id="sort" v-else></div>
    </div>
    <div class="row">
      <div id="categories" v-if="checkSearchValue() == false">
        <RouterLink v-for="item in SongGenres" :key="item.id" to="/categorySearch" @click="setGenre(item)">
          <Card class="card">
            <template #picture>
              <img src="https://localhost:44373/Uploads/Covers/colorful-dots.jpg" alt="">
            </template>
            <template #name>
              <p style="font-size: 20px">{{ item.genreName }}</p>
            </template>
          </Card>
        </RouterLink>
      </div>
      <div id="searchResult" v-else>
        <div class="header" id="songHeader"
          v-if="searchSongs != undefined && searchSongs.length != 0 && (sortType == 'song' || sortType == 'all')">歌曲</div>
        <div id="Songs" v-if="sortType == 'song' || sortType == 'all'">
          <RouterLink class="song" to="/album" v-for="(song, i) in sliceSearch('song', searchSongs)" :key="song.id"
            @click="setAlbum(song.albumId)">
            <Song class="song">
              <template #order>
                {{ i + 1 }}
              </template>
              <template #name>
                <div class="songInfo">
                  <div class="songPicture">
                    <img :src=song.songCoverPath alt="" class="img">
                  </div>
                  <div class="desc">
                    <div class="songName">{{ song.songName }}</div>
                    <RouterLink to="/artist" v-for="artist in song.artistlist" class="link artistName"
                      @click="setArtist(artist.artistId)">
                      <div>{{ artist.artistName }}</div>
                    </RouterLink>
                    <RouterLink to="/artist" v-for="creator in song.creatorlist" class="link artistName"
                      @click="setCreator(creator.creatorId)">
                      <div>{{ creator.creatorName }}</div>
                    </RouterLink>
                  </div>
                </div>
              </template>
            </Song>
          </RouterLink>
        </div>
        <div id="artistHeader" class="header"
          v-if="searchArtists != undefined && searchArtists.length != 0 && (sortType == 'artistAndCreator' || sortType == 'all')">
          藝人
        </div>
        <div class="items" id="Artists" v-if="sortType == 'artistAndCreator' || sortType == 'all'">
          <RouterLink to="/artist" v-for="artist in sliceSearch('artist', searchArtists)" :keys="artist.id"
            @click="setArtist(artist.id)">
            <Card>
              <template #picture>
                <img :src=artist.artistPicPath alt="">
              </template>
              <template #name>
                <div>{{ artist.artistName }}</div>
              </template>
            </Card>
          </RouterLink>
        </div>
        <div id="creatorHeader" class="header"
          v-if="searchCreators != undefined && searchCreators.length != 0 && (sortType == 'artistAndCreator' || sortType == 'all')">
          創作者</div>
        <div class="items" id="Creators" v-if="sortType == 'artistAndCreator' || sortType == 'all'">
          <RouterLink to="/creator" v-for="creator in sliceSearch('creator', searchCreators)" :keys="creator.id"
            @click="setCreator(creator.id)">
            <Card>
              <template #picture>
                <img :src=creator.creatorPicPath alt="">
              </template>
              <template #name>
                <div>{{ creator.creatorName }}</div>
              </template>
            </Card>
          </RouterLink>
        </div>
        <div id="albumHeader" class="header"
          v-if="searchAlbums != undefined && searchAlbums.length != 0 && (sortType == 'album' || sortType == 'all')">專輯
        </div>
        <div class="items" id="Albums" v-if="sortType == 'album' || sortType == 'all'">
          <RouterLink to="/album" v-for="album in sliceSearch('album', searchAlbums)" :keys="album.id"
            @click="setAlbum(album.id)">
            <Card>
              <template #picture>
                <img :src=album.albumCoverPath alt="">
              </template>
              <template #name>
                <div>{{ album.albumName }}</div>
              </template>
              <template #desc>
                <div v-if="album.mainArtistName != ''">{{ album.mainArtistName }}</div>
                <div v-else>{{ album.mainCreatorName }}</div>
              </template>
            </Card>
          </RouterLink>
        </div>
        <div id="playlistHeader" class="header"
          v-if="searchPlaylists != undefined && searchPlaylists.length != 0 && (sortType == 'playlist' || sortType == 'all')">
          播放清單
        </div>
        <div class="items" id="Playlists" v-if="sortType == 'playlist' || sortType == 'all'">
          <RouterLink to="/playlist" v-for="playlist in sliceSearch('playlist', searchPlaylists)" :keys="playlist.id"
            @click="setPlaylist(playlist.id)">
            <Card>
              <template #picture>
                <img src="@/assets/music-note-icon-song-melody-tune-flat-symbol-free-vector.webp" alt=""
                  v-if='playlist.playlistCoverPath.length == 0'>
                <img :src=playlist.playlistCoverPath alt="" v-else>
              </template>
              <template #name>
                <span>{{ playlist.listName }}</span>
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
  width: 100%;
  min-height: 100vh;
  height: auto;
  padding: 6rem 3rem;
  background: linear-gradient(#0b20ff 0%, #202020 20%, #202020 100%);

  >#searchGroup {
    >#search {
      width: 15rem;
      height: 35px;
      padding: 0 1rem;
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

    >#sort {
      height: 1rem;
      margin-top: 1rem;
      display: flex;

      >.sort-unit {
        margin-right: 5px;
        padding: 0 10px;
        height: 2rem;
        color: white;
        background-color: #2c2c2c;
        border-radius: 30px;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          background-color: #383A3F;
        }

        &.active {
          background-color: #F68527;
        }
      }
    }
  }

  >.row {

    >#categories {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    #searchResult {}
  }
}

.header {
  margin-top: 1rem;
  color: white;
  font-size: 2rem;
}

#Songs {

  .song {
    color: #fff;
    height: 4rem;
    border-radius: 5px;
    background-color: #333333;
    cursor: pointer;

    &:hover {
      background-color: #505050;
    }
  }
}

.items {
  display: flex;
  flex-wrap: wrap;
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

.link {
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
