<script>
import ShopHeader from "@/pages/shop/components/ShopHeader";
import ShopSide from "@/pages/shop/components/ShopSide";

export default {
  components: {
    ShopHeader,
    ShopSide,
  },
};
</script>
<template>
  <div class="container">
    <div class="headContainer">
      <ShopHeader />
    </div>
    <div class="sideContainer">
      <ShopSide />
    </div>
    <!-- <router-link to="/productItem">商品</router-link>
    <router-link to="/cart">購物車</router-link>
    <router-link to="/checkout">結帳</router-link> -->
  </div>
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

img {
  display: block;
}

html,
body {
  width: 100%;
  height: 100%;
}

#shop {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: hsl(210, 29%, 24%);

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .headContainer {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1;
    }
    .sideContainer {
      position: sticky;
      left: 0;
      top: 20px;
      height: 100%;
      width: 100%;
    }
    .view {
      flex: 1;
      overflow-y: scroll;
      background-color: white;
      display: flex;
      justify-content: start;
      align-items: start;
      margin-top: -8rem;
      margin-left: 3rem;
    }
  }
}
</style>
