<template>
  <div>驗證完成</div>
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

<style>
</style>