<script>
import { reactive, computed, onMounted } from "vue";
import ShopCarousell from "../components/ShopCarousell";
// import required modules
import { EffectCoverflow, Pagination } from "swiper";
export default {
  components: {
    ShopCarousell,
  },
  setup() {
    const products = reactive({ value: [] });
    const popular = reactive({ value: [] });
    const search = reactive({ value: [] });

    const genreName = ["華語流行", "西洋流行", "韓語流行", "日語流行"];

    const getGenreName = (value) => {
      fetch(`https://localhost:7043/Products/SongGenre/${value}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          products.value = data;

          console.log("this", products.value);
        });
    };

    const getSearch = async () => {
      const searchword = document.querySelector("#value");
      const artist = document.querySelector("#select-option");

      fetch(
        `https://localhost:7043/Products/ProductSearch/${searchword.value}?Sort=${artist.value}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          products.value = data;

          console.log("this", products.value);
        });
    };

    const popularProducts = () => {
      fetch(`https://localhost:7043/Products/Popular`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          products.value = data;

          console.log("this", products.value);
        });
    };

    onMounted(() => {
      fetch("https://localhost:7043/Products/New", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          products.value = data;
          console.log("this", products.value);
        });
    });
    return {
      genreName,
      products,
      popular,
      getSearch,
      getGenreName,
      popularProducts,
      modules: [EffectCoverflow, Pagination],
    };
  },
};
</script>

<template>
  <div class="content">
    <div class="carouselContainer">
      <ShopCarousell />
    </div>

    <ul class="categorySearch">
      <button class="category" @click="popularProducts()">發燒音樂</button>

      <button class="category" @click="getGenreName(genreName[0])">
        華語流行音樂
      </button>
      <button class="category" @click="getGenreName(genreName[1])">
        西洋流行音樂
      </button>
      <button class="category" @click="getGenreName(genreName[2])">
        韓語流行音樂
      </button>
      <button class="category" @click="getGenreName(genreName[3])">
        日語流行音樂
      </button>
    </ul>

    <div v-if="products.value != undefined" class="productContainer">
      <router-link
        :to="'/productItem/' + item.id"
        v-for="(item, index) in products.value"
        :key="index"
        class="productItem"
      >
        <Card>
          <template #picture>
            <div class="cover">
              <img :src="item.albumInfo.albumCoverPath" alt="" />
            </div>
          </template>
          <template #price>
            <div class="productPrice">
              <p>$ {{ item.productPrice }}</p>
            </div>
          </template>
          <template #categoryName>
            <div class="categoryName">
              <p>{{ item.categoryName }}</p>
            </div>
          </template>
          <template #name>
            <div class="productName">
              <p>{{ item.productName }}</p>
            </div>
          </template>
        </Card></router-link
      >
    </div>

    <!-- <div class="page">
      <div id="pageHeader">
        <div id="search">
          <input type="text" id="value" />
          <button @click="getSearch()">
            <font-awesome-icon
              icon="fa-solid fa-magnifying-glass"
              style="font-size: 25px; color: grey"
            />
          </button>
        </div>
      </div>
      <div>
        <label for="select-option" class="custom-label">搜尋方式：</label>
        <select
          id="select-option"
          v-model="options"
          class="custom-select"
          @change="showvalue"
        >
          <option>歌手</option>
          <option>專輯</option>
        </select>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
// .li {
//   width: 100%;
//   height: 50px;
//   padding: 1rem;
//   font-size: 2rem;
//   font-weight: bold;
//   display: flex;
//   align-items: center;
//   border-bottom: 2px dashed grey;
//   background-color: #99caf1;
//   a {
//     text-decoration: none;
//     color: rgb(37, 95, 171);
//   }

//   &:hover {
//     background-color: rgb(37, 95, 171);

//     a {
//       color: white;
//     }
//   }
// }

a {
  text-decoration: none;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  // flex-wrap: wrap;
  margin-block: 8rem;

  .carouselContainer {
    width: 1000px;
    height: auto;
    overflow: hidden;
    background-color: rgba(246, 179, 82, 60);
    box-shadow: rgba(255 255 255 / 20%) 0 2px 10px;
    border-radius: 20px;
    padding: 1rem;
    padding-inline: 3rem;
  }
  .categorySearch {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .category {
      width: 120px;
      height: 50px;
      margin-inline: 1rem;
      border-radius: 8px;
      padding-inline: 0.5rem;
      font-size: 1rem;
      font-weight: 650;
      background-color: white;
      border: 2px solid black;
      &:hover {
        // box-shadow: rgba(255 255 255 / 10%) 0 2px 10px;
        border: none;
        background: black;
        color: white;
      }
    }
  }

  .productContainer {
    width: 1000px;
    display: flex;
    margin-block: 4rem;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.4 ease-in-out;
    .productItem {
      &:hover {
        scale: 1.1;
      }
      .categoryName {
        text-align: center;
        margin-right: 6.6rem;
        width: 3rem;
        height: 1.5rem;
        line-height: 1.5rem;
        font-weight: 600;
        color: white;
        background-color: #f6b352;
        border-radius: 3px;
      }
      .productName {
        color: white;
        font-size: 1.25rem;
        text-align: right;
        font-weight: 700;
      }
      .productPrice {
        width: 4rem;
        height: 2rem;
        background-color: rgba(0 0 0 / 40%);
        color: white;
        line-height: 2rem;
        position: absolute;
        top: 30px;
        border-radius: 0 4px 4px 0;
        p {
        }
      }
    }
  }
}
//   .page {
//     width: 60em;
//     margin-bottom: 2rem;
//     #pageHeader {
//       width: 100%;
//       height: 5rem;
//       display: flex;
//       #search {
//         width: 16rem;
//         height: 3rem;
//         padding: 0 1rem;
//         border: 2px solid #1b2e85;
//         border-radius: 50px;
//         margin-left: auto;
//         margin-right: 8rem;
//         padding-left: 20px;
//         display: flex;
//         align-items: center;
//         input {
//           font-size: 25px;
//           width: 12rem;
//           border: none;
//           &:focus {
//             outline: none;
//           }
//         }
//         button {
//         }
//       }
//     }
//     .custom-label {
//     }
//     .custom-select {
//     }
//   }
// }

// .container {
//   display: flex;
//   flex-wrap: wrap;
//   min-height: 200vh;

//   .page {
//     width: 60em;
//     margin-bottom: 2rem;

//     #pageHeader {
//       width: 100%;
//       height: 5rem;
//       display: flex;

//       #search {
//         width: 16rem;
//         height: 3rem;
//         padding: 0 1rem;
//         border: 2px solid #1b2e85;
//         border-radius: 50px;
//         margin-left: auto;
//         margin-right: 8rem;
//         padding-left: 20px;
//         display: flex;
//         align-items: center;

//         input {
//           font-size: 25px;
//           width: 12rem;
//           border: none;

//           &:focus {
//             outline: none;
//           }
//         }
//       }
//     }

//     #pageCarousell {
//       margin-bottom: 1rem;
//       display: flex;
//       justify-content: center;

//       #carousell {
//         width: 50rem;
//         height: 30rem;
//         border-radius: 1rem;
//         background-color: #7388e0;
//       }
//     }
//   }

#products {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
