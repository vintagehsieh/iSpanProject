<script>
import { reactive, onMounted } from "vue";

export default {
  setup() {
    const products = reactive({ value: [] });
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

          console.log(membercart.value.albumDetail);
        });
    });
    return {
      alertFunction,
      formatDate,
      membercart,
      number,
      products,
      addtoCartItem,
    };
  },
};
</script>

<template>
  <div
    class="itemContainer"
    v-if="membercart.value.albumDetail && products.value"
  >
    <div class="albumInfo">
      <div class="left">
        <div class="albumCover">
          <img :src="membercart.value.albumDetail.albumCoverPath" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="albumGenre">
          {{ membercart.value.albumDetail.albumGenreName }}
        </div>
        <div class="albumName">
          {{ membercart.value.albumDetail.albumName }}
        </div>
        <div class="artist-released">
          {{ membercart.value.albumDetail.mainArtistName }} .
          {{ formatDate(membercart.value.albumDetail.released) }}
        </div>
        <div class="buySection">
          <div class="albumPrice">${{ membercart.value.productPrice }}</div>
          <div class="btn">
            <input type="number" v-model="qty" min="1" step="1" />
            <button
              type="button"
              @click="
                addtoCartItem(membercart.value.albumDetail.id, qty),
                  alertFunction()
              "
              class="addCartBtn"
            >
              <i class="fa-solid fa-plus"></i>
            </button>

            <button
              type="button"
              @click="addtoCartItem(membercart.value.albumDetail.id, qty)"
              class="buyBtn"
            >
              <a href="#/cart" class="">
                <i class="fa-solid fa-cart-plus"></i>
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="albumIntro">
      <h2>專輯介紹</h2>
      <div class="albumDescription">
        {{ membercart.value.albumDetail.description }}
      </div>
    </div>
    <hr />
    <div class="songs">
      <h2>專輯歌曲</h2>
      <ul
        v-for="(song, index) in membercart.value.albumDetail.songs"
        :key="index"
        class="songName"
      >
        <li>
          {{ song.songName }}
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <h1>查無此商品資訊</h1>
  </div>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.itemContainer {
  width: 100%;
  height: auto;
  color: white;
  padding-inline: 8rem;
  margin-block: 5rem;
  margin-bottom: 10rem;
  .albumInfo {
    display: flex;
    padding: 1rem;
    .left {
      margin-right: 4rem;
      .albumCover {
        width: 375px;
        height: 375px;
        border-radius: 8px;
        border: 1px solid white;
        img {
          object-fit: cover;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      align-items: start;
      width: 100%;
      margin-top: 4rem;
      .albumGenre {
        background-color: #f6b352;
        opacity: 0.7;
        width: 90px;
        height: 30px;
        border-radius: 3px;
        line-height: 30px;
        color: black;
        font-weight: 600;
      }
      .albumName {
        font-size: 5rem;
      }
      .artist-released {
        display: flex;
        justify-content: space-between;
        margin-top: 0.5rem;
        font-size: 1.1rem;
        letter-spacing: 2px;
        padding-left: 2px;
      }
    }
    .buySection {
      display: flex;
      margin-top: 3rem;
      justify-content: space-around;
      align-items: center;
      .albumPrice {
        font-size: 3rem;
      }
      .btn {
        margin-left: 5rem;
        input {
          width: 70px;
          height: 35px;
          text-align: center;
          font-size: 1.2rem;
          background-color: #1f2124;
          border: 1px solid white;
          border-radius: 3px;
          color: white;
          &:focus {
            border: none;
          }
        }
        .addCartBtn {
          font-size: 1.5rem;
          background-color: #1f2124;
          color: white;
          border: none;
          margin-inline: 1rem;
          cursor: pointer;
        }
        .buyBtn {
          font-size: 2rem;
          background-color: #1f2124;
          color: white;
          border: none;
          cursor: pointer;
        }
      }
    }
  }

  hr {
    margin-block: 4rem;
  }

  .albumIntro {
    h2 {
    }
    .albumDescription {
    }
  }

  .songs {
    h2 {
    }
    .songName {
      li {
      }
    }
  }
}
// * {
//   margin-left: 100px;
// }
// .img {
//   display: flex;
//   align-items: center;
//   font-size: 154px;
//   color: #b83e3e;
//   height: auto;
//   > .add {
//     display: flex;
//     flex-direction: column;
//     > .info {
//       font-size: 54px;
//       height: 30%;
//     }
//     > .btn {
//       height: 10%;
//     }
//   }
// }

// .introduce {
//   height: 200px;
// }
// .songs {
//   height: 200px;
// }
</style>
