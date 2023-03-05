<script>
import { ref } from 'vue'

export default {
  setup() {
    const mainPageContent = ref({
      popularSongs: {
        headerName: "熱門歌曲",
        items: []
      },
      popularAlbums: {
        headerName: "熱門專輯",
        items: []
      },
      popularPlaylists: {
        headerName: "精選播放清單",
        items: []
      },
      popularArtists: {
        headerName: "推薦藝人",
        items: []
      },
      popularCreators: {
        headerName: "最受歡迎創作者",
        items: []
      }
    });

    async function loadData() {
      const responseSongs = await fetch('https://localhost:7043/Songs/Popular');
      const dataSongs = await responseSongs.json();
      mainPageContent.value.popularSongs.items = dataSongs;

      fetch('https://localhost:7043/Albums/Recommended')
        .then(response => response.json())
        .then(data => {
          mainPageContent.value.popularAlbums.items = data
        })
        .catch(error => console.error(error))

      fetch('https://localhost:7043/Playlists/Recommended')
        .then(response => response.json())
        .then(data => {
          mainPageContent.popularPlaylists = data
        })
        .catch(error => console.error(error))

      fetch('https://localhost:7043/Artists/Recommended')
        .then(response => response.json())
        .then(data => {
          mainPageContent.value.popularArtists.items = data
        })
        .catch(error => console.error(error))

      fetch('https://localhost:7043/Creators/Recommended')
        .then(response => response.json())
        .then(data => {
          mainPageContent.value.popularCreators.items = data
        })
        .catch(error => console.error(error))
    }

    loadData();

    return { mainPageContent }
  },
  data() {
    return {
      showAll: "顯示所有內容"
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="announcement"></div>
    <div class="content" v-for="content in mainPageContent">
      <div class="contentHeader" id="popSongHeader">
        <span class="headerName">{{ content.headerName }}</span>
        <span class="showAll">{{ showAll }}</span>
      </div>
      <div id="popSongs">
        <Card v-for="item in content.items" :key="item.name" class="card">
          <template #picture>
            <img src="../../../assets/logo.png" alt="">
          </template>
          <template #name>
            <h3>{{ item.name }}</h3>
          </template>
          <template #desc>
            <p>{{ item.desc }}</p>
          </template>
        </Card>
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

  >.content {
    >.contentHeader {
      margin: 0 3rem;
      font-size: 20px;
      color: white;
      cursor: context-menu;
      display: flex;
      justify-content: space-between;
      align-items: center;


      >.headerName {}

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

    >#popSongs {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      >.card {
        margin: 1rem;
      }
    }
  }
}
</style>
