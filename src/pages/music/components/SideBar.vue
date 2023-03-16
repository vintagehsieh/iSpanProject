<script>

export default {
  methods: {
    async createNewPlaylist() {

      await fetch("https://localhost:7043/Playlists/NewList", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //set playlist
          this.$store.dispatch("setPlaylist", data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<template>
  <aside>
    <div id="logo">
      <a href="index.html">
        <img src="@/assets/logo.png" alt="" />
      </a>
    </div>
    <div id="default">
      <router-link to="/" class="routerLink">
        <font-awesome-icon icon="fa-solid fa-house" />
        <h3>首頁</h3>
      </router-link>
      <router-link to="/search" class="routerLink">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        <h3>搜尋</h3>
      </router-link>
      <router-link to="/library" class="routerLink">
        <font-awesome-icon icon="fa-solid fa-music" />
        <h3>音樂庫</h3>
      </router-link>
      <RouterLink to="/playlist" class="routerLink" @click="createNewPlaylist()">
        <font-awesome-icon icon="fa-regular fa-square-plus" />
        <h3>新增播放清單</h3>
      </RouterLink>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 2rem;
  background-color: #272727;
  color: white;

  #logo {
    display: flex;
    width: 200px;
    height: 70px;
    overflow: hidden;
    margin-bottom: 2rem;

    >a img {
      display: flex;
      width: max(10vw, 200px);
      scale: 2;
    }
  }

  >#default {
    width: 80%;
    margin: auto;
  }
}
</style>