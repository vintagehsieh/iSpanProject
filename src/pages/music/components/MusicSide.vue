<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const isOpen = computed(() => {
      // return store.getters["musicSide/isOpen"];
    });
    const handClickMenu = () => {
      // store.dispatch("music/musicSide/handOpenState");
    };
    return { isOpen, handClickMenu };
  },
};
</script>
<template>
  <div :class="['menu', { open: isOpen }]">
    <a class="closeBtn" @click="handClickMenu">
      <i class="fas fa-times fa-3x"></i>
    </a>
    <ul class="nav">
      <li><a>1</a></li>
      <li><a>2</a></li>
      <li><a>3</a></li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 0;
  left: -350px;
  width: 350px;
  height: 100%;
  z-index: 20;
  background-color: #fff;
  transition: right 0.3s;

  &.open {
    left: 0px;
  }

  >a.closeBtn {
    cursor: pointer;
    position: absolute;
    left: 50px;
    top: 50px;
  }

  >ul.nav {
    position: absolute;
    width: 100%;
    height: 300px;
    top: 50%;
    margin-top: -150px;
    padding: 0;

    >li {
      display: block;
      width: 100%;
      height: 25%;

      >a {
        cursor: pointer;
        display: block;
        width: 100%;
        height: 100%;
        padding-left: 50px;
        line-height: 300%;
        font-size: 22px;
      }
    }
  }
}
</style>
