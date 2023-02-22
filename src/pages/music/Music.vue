<script>
import SideBar from '@/components/SideBar.vue';

export default {
  components: {
    SideBar
  }
};
</script>
<template>
  <main>
    <SideBar>
      <template #main>
        <router-link to="/" class="routerLink">
          <h3>首頁</h3>
        </router-link>
      </template>
      <template #search>
        <router-link to="/search" class="routerLink">
          <h3>搜尋</h3>
        </router-link>
      </template>
      <template #library>
        <router-link to="/search" class="routerLink">
          <h3>音樂庫</h3>
        </router-link>
      </template>
    </SideBar>
    <router-view class="routerView" />
  </main>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  // 改字體
  font-family: "Microsoft JhengHei", "Heiti TC", "sans-serif";
  list-style: none;
}

main {
  display: flex;
}

.routerLink {
  width: 100%;
  height: 40px;
  display: flex;
  color: lightgray;
  text-decoration: none;

  >h3 {
    margin: auto;
  }
}

.routerLink:hover {
  cursor: pointer;
  color: white;
  text-decoration: none;
}

.routerView {
  margin-left: 18rem;
}
</style>
