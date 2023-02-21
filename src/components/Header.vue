<script>
export default {};
</script>
<template>
  <header>
    <nav>
      <!-- logo -->
      <div id="logo"></div>
      <!-- Direct -->
      <div id="pages">
        <a href="music.html" id="musicPage">音樂播放</a>
        <a href="shop.html" id="shopPage">音樂商城</a>
        <a href="activity.html" id="actPage">音樂活動</a>
      </div>
      <!-- membership -->
      <div id="login">
        <div id="avatar"></div>
        <a href="">會員登入</a>
        <!-- 引入font-awesome -->
        <!-- <font-awesome-icon icon="fa-solid fa-caret-down" /> -->
      </div>
    </nav>
  </header>
</template>
<style lang="scss" scoped>
header {
  background-color: #1f2124;
  width: 100%;
  height: 100px;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  > #logo {
    margin-left: 10rem;
    width: 200px;
    height: 60px;
    background-color: white;
  }
  > #pages {
    display: flex;
    color: white;
    > a {
      text-decoration: none;
      color: white;
      padding-right: 6rem;
    }
  }
  > #login {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-right: 10rem;
    > #avatar {
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: white;
    }
    > a {
      text-decoration: none;
      color: white;
      padding-left: 1rem;
    }
  }
}
font-awesome-icon {
  color: white;
}
</style>
