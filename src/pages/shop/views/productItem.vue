<template>
  <div class="shopping-cart">
    <table>
      <tbody></tbody>
      <div class="img">
        <img :src="productItem.albumDetail.albumCoverPath" alt="" />
        <div class="add">
          <div class="info">專輯資料</div>
          <div class="btn">
            <button type="button" @click="getMemberId" class="btn btn-light">
              加入購物車
            </button>
            <button type="button" @click="getCartInfo" class="btn btn-light">
              直接購買
            </button>
          </div>
        </div>
      </div>
    </table>

    <hr />
    <div class="introduce">
      <h2>專輯介紹</h2>
    </div>
    <hr />

    <div class="songs">
      <h2>專輯歌曲</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, computed, onMounted } from "vue";
import http from "@/plugins/http";

export default {
  setup() {
    let productItem = reactive({});
    fetch("https://localhost:7043/Products/4/Detail", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        productItem = data;

        console.log("this", productItem);
      });

    onMounted(() => {});

    const CheckPath = () => {
      return productItem.albumDetail != undefined
        ? productItem.albumDetail.albumCoverPath
        : "";
    };

    return { productItem, CheckPath };
  },
};
</script>

<style lang="scss" scoped>
* {
  margin-left: 100px;
}
.img {
  display: flex;
  align-items: center;
  font-size: 154px;
  color: #b83e3e;
  height: auto;
  > .add {
    display: flex;
    flex-direction: column;
    > .info {
      font-size: 54px;
      height: 30%;
    }
    > .btn {
      height: 10%;
    }
  }
}

.introduce {
  height: 200px;
}
.songs {
  height: 200px;
}
</style>
