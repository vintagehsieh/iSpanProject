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
    },
    checkSearchValue() {
      return this.searchValue.trim().length != 0
    },
    handleLinkClick(item) {
      // Modify the shareData before navigating to the next page
      this.sharedData.category.name = item.genreName;
      this.sharedData.category.id = item.id;
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
        <RouterLink v-for="item in SongGenres" :key="item.id" to="/categorySearch" @click="handleLinkClick(item)">
          <Card class="card">
            <template #name>
              <p>{{ item.genreName }}</p>
            </template>
          </Card>
        </RouterLink>
      </div>
      <div id="searchResult" v-else>
        <div class="header" id="songHeader" v-if="searchSongs != undefined && searchSongs.length != 0">歌曲</div>
        <div id="Songs">
          <RouterLink to="/album" v-for="song in searchSongs" :key="song.id" @click="setAlbum(song.albumId)">
            <Song class="song">
              <template #order>
                <font-awesome-icon class="btn" id="play" icon="fa-solid fa-play" @click="togglePlay" />
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
        <div id="artistHeader" class="header" v-if="searchArtists != undefined && searchArtists.length != 0">藝人</div>
        <div id="Artists">
          <RouterLink to="/artist" v-for="artist in searchArtists" :keys="artist.id" @click="setArtist(artist.id)">
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
        <div id="creatorHeader" class="header" v-if="searchCreators != undefined && searchCreators.length != 0">創作者</div>
        <div id="Creators">
          <RouterLink to="/creator" v-for="creator in searchCreators" :keys="creator.id" @click="setCreator(creator.id)">
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
        <div id="albumHeader" class="header" v-if="searchAlbums != undefined && searchAlbums.length != 0">專輯</div>
        <div id="Albums">
          <RouterLink to="/album" v-for="album in searchAlbums" :keys="album.id" @click="setAlbum(album.id)">
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
        <div id="playlistHeader" class="header" v-if="searchPlaylists != undefined && searchPlaylists.length != 0">播放清單
        </div>
        <div id="Playlists">
          <RouterLink to="/playlist" v-for="playlist in searchPlaylists" :keys="playlist.id"
            @click="setPlaylist(playlist.id)">
            <Card>
              <template #picture>
                <img :src=playlist.playlistCoverPath alt="">
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
  background-color: #1F2124;

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
