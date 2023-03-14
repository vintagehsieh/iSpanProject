<script>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
export default {
  setup() {
    const username = ref("");

    onMounted(() => {
      username.value = Cookies.get("loginInfo");
    });

    return { username };
  },
};
</script>
<template>
  <div class="content">
    <div class="navbar">
      <p>
        嗨，<span style="color: orange">{{ username }}</span
        ><br />
        今天想買什麼?
      </p>
      <div class="logo">
        <img src="@/assets/ae86bc6c9055369fd5ebd8d884a587ae.jpg" alt="" />
      </div>
      <div class="link">
        <router-link to="/">
          <span class="icon"><i class="fa-solid fa-user"></i></span>
          <h3>首頁</h3>
        </router-link>
        <router-link to="/shopSearch">
          <span class="icon"><i class="fa-solid fa-user"></i></span>
          <h3>搜尋</h3>
        </router-link>
        <router-link to="/cart">
          <span class="icon"><i class="fa-solid fa-user"></i></span>
          <h3>購物車</h3>
        </router-link>
      </div>
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  .navbar {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background-color: black;
    min-width: 20vw;
    height: 100%;
    padding-top: 6rem;
    color: white;
    padding-inline: 2rem;
    p {
      color: white;
      font-size: 1.5rem;
      margin-bottom: 1.75rem;
      letter-spacing: 4px;
      text-align: center;
    }
    .logo {
      position: relative;
      width: 175px;
      height: 175px;
      overflow: hidden;
      border-radius: 50%;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        scale: 1.2;
        object-fit: cover;
      }
    }
    .link {
      margin-top: 4rem;
      margin-left: -10px;
      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: white;
        margin-bottom: 2.5rem;
        font-size: 1.25rem;
        text-align: justify;
        &:hover {
          color: orange;
        }
        span {
        }
        h3 {
          padding-left: 1rem;
        }
      }
    }
  }
  .view {
    flex: 1;
    .router-link {
      a {
        .icon {
        }
        h3 {
        }
      }
    }
  }
}
</style>
