<script>
export default {};
</script>
<template>
  <nav id="header">
    <div id="logo">
      <a href="index.html">
        <img src="@/assets/logo.png" alt="" />
      </a>
    </div>
    <div id="links">
      <a href="music.html" class="pageLink">音樂</a>
      <a href="activity.html" class="pageLink">活動</a>
    </div>
    <div id="user">
      <font-awesome-icon icon="fa-regular fa-circle-user" class="icon" />
      <span>會員登入</span>
    </div>
  </nav>
  <router-view id="page" />
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

#header {
  width: 100%;
  height: 8rem;
  background-color: #2c7dd8;
  display: flex;
  align-items: center;

  #logo {
    display: flex;
    width: 200px;
    height: 70px;
    overflow: hidden;
    margin-left: 4rem;
    margin-bottom: 2rem;

    a img {
      display: flex;
      width: max(10vw, 200px);
      scale: 2;
    }
  }

  #links {
    width: 16rem;
    margin-left: 45rem;
    display: flex;
    justify-content: space-around;

    .pageLink {
      color: white;
      width: 5rem;
      font-size: 30px;
      text-decoration: none;
    }
  }

  #user {
    margin-left: 5rem;
    color: white;
    font-size: 25px;

    .icon {
      margin-right: 5px;
    }
  }
}

#page {
  padding: 2rem 8rem;
}
</style>
