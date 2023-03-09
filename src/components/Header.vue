<script>
export default {};
</script>
<template>
  <header>
    <nav>
      <!-- logo -->
      <div id="logo">
        <a href="index.html"><img src="@/assets/logo.png" /></a>
      </div>
      <!-- Direct -->
      <div id="pages">
        <a href="music.html" id="musicPage">音樂播放</a>
        <a href="shop.html" id="shopPage">音樂商城</a>
        <a href="activity.html" id="actPage">音樂活動</a>
      </div>
      <!-- membership -->
      <div id="login">
        <div id="avatar"></div>
        <a href="login.html" id="memberPage">會員登入</a>
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
    display: flex;
    margin-left: 10rem;
    width: 200px;
    height: 60px;
    overflow: hidden;

    > a img {
      display: flex;
      width: max(10vw, 200px);
      margin-top: -1rem;
      scale: 2;
    }
  }

  > #pages {
    display: flex;
    color: white;

    > :nth-child(1) {
      margin-left: 2rem;
    }

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
      // 縮小不要變形
      display: flex;
      min-width: 30px;
      min-height: 30px;
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
