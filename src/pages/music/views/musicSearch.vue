<script>
import Card from '@/pages/music/components/MusicCard.vue';
import { ref } from 'vue'

export default {
  setup() {
    let SongGenres = ref({});
    async function loadData() {
      const responseSongGenres = await fetch('https://localhost:7043/Songs/SongGenres');
      SongGenres.value = await responseSongGenres.json();
    }

    loadData();

    return { SongGenres };
  },
  inject: ['sharedData'],
  data() {
    return {
      // items: [
      //   {
      //     genreName: "esrnteisrnt",
      //     id: 0,
      //   }
      // ],
      searchValue: "",
    }
  },
  compotents: {
    Card,
  },
  methods: {
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
  }
};
</script>
<template>
  <div class="container">
    <div id="searchGroup">
      <div id="search">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" style="font-size: 20px; margin-right: 8px;" />
        <input type="text" placeholder="想聽什麼?" v-model="searchValue" />
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
          <Card>

          </Card>
        </div>
        <div id="Creators">
          <Card>

          </Card>
        </div>
        <div id="Albums">
          <Card>

          </Card>
        </div>
        <div id="Playlists">
          <Card>

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
