<template>
  <div class="shopping-cart">
    <table>
      <tbody></tbody>
      <div class="img">
        <tr v-if="membercart.value.albumDetail">
          <img :src="membercart.value.albumDetail.albumCoverPath" alt="" />
        </tr>
        <div class="add">
          <div class="info">
            <tr v-if="membercart.value.albumDetail">
              <td>
                <div>專輯名稱:{{ membercart.value.albumDetail.albumName }}</div>
                <br />
                <div>
                  類型:{{ membercart.value.albumDetail.albumGenreName }}
                </div>
                <br />
                <div>
                  演出者:{{ membercart.value.albumDetail.mainArtistName }}
                </div>
                <br />
                <div>
                  發表時間:{{
                    formatDate(membercart.value.albumDetail.released)
                  }}
                </div>
              </td>
            </tr>
          </div>
          <div class="btn">
            <input type="number" v-model="qty" min="1" step="1" />
            <button
              type="button"
              @click="
                addtoCartItem(membercart.value.albumDetail.id, qty),
                  alertFunction()
              "
              class="btn btn-light"
            >
              加入購物車
            </button>

            <button
              type="button"
              @click="addtoCartItem(membercart.value.albumDetail.id, qty)"
              class="btn btn-light"
            >
              <a href="#/cart" class="">直接購買</a>
            </button>
          </div>
        </div>
      </div>
    </table>

    <hr />
    <div class="introduce">
      <h2>專輯介紹</h2>
      <tr v-if="membercart.value.albumDetail">
        <td>{{ membercart.value.albumDetail.description }}</td>
      </tr>
    </div>
    <hr />

    <div class="songs">
      <h2>專輯歌曲</h2>
      <tr v-if="membercart.value.albumDetail">
        <li
          v-for="(song, index) in membercart.value.albumDetail.songs"
          :key="index"
        >
          {{ song.songName }}
        </li>
      </tr>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, computed, onMounted } from "vue";
import http from "@/plugins/http";

export default {
  setup() {
    const membercart = reactive({ value: [] });
    var url = "";
    var lastSlashIndex = 0;
    var number = "";

    function alertFunction() {
      alert("已成功加入購物車！");
    }

    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    const addtoCartItem = (productId, qty) => {
      fetch(`https://localhost:7043/Carts/AddItem/${productId}/${qty}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accepted: "text/plain",
        },

        credentials: "include",
      })
        .then((res) => res.text())
        .then((data) => {
          console.log(data);
        });
    };

    onMounted((id) => {
      url = window.location.href;
      lastSlashIndex = url.lastIndexOf("/");
      number = url.substring(lastSlashIndex + 1);

      fetch(`https://localhost:7043/Products/${number}/Detail`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          membercart.value = data;

          console.log("this", membercart.value.albumDetail);
        });
    });
    return {
      alertFunction,
      formatDate,
      membercart,
      number,
      addtoCartItem,
    };
  },
  // updated() {
  //   fetch(`https://localhost:7043/Products/${this.number}/Detail`, {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       this.membercart.value = data;
  //       console.log(this.membercart.value);
  //       console.log("this", membercart.value.albumDetail);
  //     });
  // },
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
