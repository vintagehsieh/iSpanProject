<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const routeArr = ["", "activitySecond", "activities"];
    const idx = ref(0);
    watch(
      () => route.path,
      () => {
        routeArr.forEach((item, index) => {
          const rp = route.path.substr(1).split("/")[0];
          if (rp === item) {
            idx.value = index;
          }
        });
      }
    );
    return { idx };
  },
};
</script>
<template>
  <nav class="navbar">
    <router-link to="/" :class="{ active: idx === 0 }"
      >ActivityHome</router-link
    >
    |
    <router-link to="/activitySecond" :class="{ active: idx === 1 }"
      >ActivitySecond</router-link
    >
    |
    <router-link to="/activities" :class="{ active: idx === 2 }"
      >Activities</router-link
    >
  </nav>
  <div class="view">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
}
#activity {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #2c3e50;
  color: white;
  height: 50px;
  line-height: 50px;
  a {
    font-weight: bold;
    color: white;
    &.active {
      color: #42b983;
    }
  }
}
.view {
  height: 100vh;
}
</style>
