<template>
  <h1>驗證完成</h1>
</template>

<script>
import { onMounted } from "vue";
export default {
  setup() {
    onMounted(() => {
      var url = window.location.href;
      var lastSlashIndex = url.lastIndexOf("/");
      const confirmCode = url.substring(lastSlashIndex + 1);
      url = url.slice(0, lastSlashIndex);
      lastSlashIndex = url.lastIndexOf("/");
      const memberId = url.substring(lastSlashIndex + 1);
      fetch(
        `https://localhost:7043/Members/ActivateRegister?memberid=${memberId}&confirmCode=${confirmCode}`,
        {
          method: "GET",
        }
      );
    });
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: black;
  position: absolute;
  top: 40%;
  left: 50%;
  font-size: 40px;
}
</style>
