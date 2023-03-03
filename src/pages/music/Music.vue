<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import MusicBtn from "@/pages/music/components/MusicBtn.vue";
// import MusicSide from "@/pages/music/components/MusicSide.vue";

export default {
  components: {
    MusicBtn,
    // MusicSide,
  },
  props: {},
  setup() {
    const store = useStore();

    onMounted(() => {});

    return {};
  },
};
</script>
<template>
  <MusicBtn />
  <div class="content">
    <h1>HIHI</h1>
  </div>
  <MusicSide />
</template>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  background-image: url("https://source.unsplash.com/WLUHO9A_xik/1600x900");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
