<template>
  <label>請輸入新密碼</label>
  <input type="text" />
  <label>確認新密碼</label>
  <input type="text" />
  <button>送出</button>
</template>

<script>
export default {
  setup() {
    onMounted(() => {
      var url = window.location.href;
      var lastSlashIndex = url.lastIndexOf("/");
      url = url.slice(0, lastSlashIndex);
      lastSlashIndex = url.lastIndexOf("/");
      const memberId = url.substring(lastSlashIndex + 1);
      fetch(
        `https://localhost:7043/Members/ResetPassword?email=${memberId}&confirmCode=${confirmCode}`,
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