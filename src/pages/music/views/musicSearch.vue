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
        .then(data => console.log(data))
        .catch(error => console.error(error))

      await fetch(`https://localhost:7043/Artists/${this.searchValue}`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include', })
        .then(response => response.json())
        .then(data => { this.searchArtists = data; })
        .catch(error => console.error(error))

      await fetch(`https://localhost:7043/Creators/${this.searchValue}`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include', })
        .then(response => response.json())
        .then(data => { this.searchCreators = data; })
        .catch(error => console.error(error))

      await fetch(`https://localhost:7043/Albums/Search/${this.searchValue}`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include', })
        .then(response => response.json())
        .then(data => { this.searchAlbums = data; })
        .catch(error => console.error(error))

      await fetch(`https://localhost:7043/Playlists/Search/${this.searchValue}`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: 'include', })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.searchPlaylists = data;
        })
        .catch(error => console.error(error))
    }
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
        <div id="Songs"></div>
        <div id="Artists">
          <Card v-for="artist in searchArtists" :keys="artist.id">
            <template #picture>
              <img :src=artist.artistPicPath alt="">
            </template>
          </Card>
        </div>
        <div id="Creators">
          <Card v-for="creator in searchCreators" :keys="creator.id">
            <template #picture>
              <img :src=creator.creatorPicPath alt="">
            </template>
          </Card>
        </div>
        <div id="Albums">
          <Card v-for="album in searchAlbums" :keys="album.id">
            <template #picture>
              <img :src=album.albumCoverPath alt="">
            </template>
          </Card>
        </div>
        <div id="Playlists">
          <Card v-for="playlist in searchPlaylists" :keys="playlist.id">
            <template #picture>
              <img :src=playlist.playlistCoverPath alt="">
            </template>
            <template #name>
              <span>{{ playlist.listName }}</span>
            </template>
          </Card>
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
  }
}
</style>
