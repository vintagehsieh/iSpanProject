<script>
import { reactive, computed, onMounted } from "vue";
import emitter from "@/mitt";
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
    const returnP = reactive({ value: [] });

    const genreName = ["華語流行", "西洋流行", "韓語流行", "日語流行"];

    const getProductsByGenreName = (value) => {
      fetch(`https://localhost:7043/Products/SongGenre/${value}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          products.value = data;

          console.log(products.value);
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

          console.log(products.value);
        });
    };
    const returnpProducts = () => {
      fetch(`https://localhost:7043/Products/NEW`, {
        method: "GET",
        credentials: "include",
      })
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
          popular.value = data;

          console.log("this", popular.value);
        });
    };

    const emitPopularProducts = () => {
      emitter.emit("emitPopularProducts", popular);
    };

    onMounted(() => {
      fetch("https://localhost:7043/Products/New", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          products.value = data;
          console.log("this", products.value[0].albumInfo.albumCoverPath);
        });
      popularProducts();
      if (products != undefined) {
        emitPopularProducts();
      }
    });

    function AllProducts() {
      return products.value;
    }

    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'NTD',
      maximumSignificantDigits: 4
      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return {
      returnP,
      genreName,
      products,
      popular,
      returnpProducts,
      AllProducts,
      getSearch,
      getProductsByGenreName,
      popularProducts,
      emitPopularProducts,
      modules: [EffectCoverflow, Pagination],
      formatter,
    };
  },
};
</script>

<template>
  <div class="content">
    <div class="carouselContainer">
      <ShopCarousell :popular="popular" />
    </div>

    <ul class="categorySearch">
      <button class="category" @click="returnpProducts()">發燒音樂</button>
      <button class="category" @click="getProductsByGenreName(genreName[0])">
        華語流行音樂
      </button>
      <button class="category" @click="getProductsByGenreName(genreName[1])">
        西洋流行音樂
      </button>
      <button class="category" @click="getProductsByGenreName(genreName[2])">
        韓語流行音樂
      </button>
      <button class="category" @click="getProductsByGenreName(genreName[3])">
        日語流行音樂
      </button>
    </ul>
    <div class="searchContainer">
      <div class="searchInput">
        <input type="text" id="value" />
        <button @click="getSearch()">
          <span><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></span>
        </button>
      </div>
      <div class="searchOption">
        <label for="select-option" class="custom-label">搜尋方式</label>
        <select id="select-option" v-model="options" class="custom-select" @change="showvalue">
          <option>歌手</option>
          <option>專輯</option>
        </select>
      </div>
    </div>

    <div v-if="products.value != undefined" class="productContainer">
      <router-link :to="'/productItem/' + item.id" v-for="(item, index) in products.value" :key="index"
        class="productItem">
        <Card>
          <template #picture>
            <div class="cover">
              <img :src="item.albumInfo ? item.albumInfo.albumCoverPath : ''" alt="" />
            </div>
          </template>
          <template #price>
            <div class="productPrice">
              <p>{{ formatter.format(item.productPrice) }}</p>
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
        </Card>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  margin-block: 8rem;

  .searchContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block: 3rem;
    width: 100%;
    height: 100%;

    .searchInput {
      display: flex;
      align-items: center;
      justify-content: start;

      input {
        width: 300px;
        height: 50px;
        border-radius: 8px 0 0 8px;
        border: white 1px solid;
        border-right: none;
        background-color: #1f2124;
        padding-left: 1rem;
        color: white;
        font-size: 1rem;

        &:focus {
          outline: none;
          background-color: #1f2124;
        }
      }

      button {
        height: 52px;
        width: 60px;
        border: none;
        border-radius: 0 8px 8px 0;
        background-color: #1f2124;
        border: white 1px solid;
        border-left: none;

        span {
          font-size: 25px;
          color: white;
        }
      }
    }

    .searchOption {
      margin-left: 4rem;

      .custom-label {
        color: white;
        font-size: 1.2rem;
      }

      .custom-select {
        width: 130px;
        height: 45px;
        border: 1px solid white;
        border-radius: 8px;
        margin-left: 1.5rem;
        padding-left: 0.5rem;
        font-size: 1.2rem;
        background-color: #1f2124;
        color: white;

        option {
          font-size: 1.2rem;
          margin-block: 1.2rem;
        }
      }
    }
  }

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
    margin-top: 5rem;
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
        border: none;
        background: black;
        color: white;
      }
    }
  }

  .productContainer {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    margin-block: 3rem;
    align-items: center;
    justify-content: center;

    .productItem {
      transition: all 0.4 ease-in-out;
      position: relative;
      display: flex;
      flex-wrap: nowrap;

      &:hover {
        scale: 1.1;
      }

      .cover {
        img {
          width: 14rem;
          height: 14rem;
          object-fit: contain;
        }
      }
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
      font-size: 1rem;
      text-align: right;
      font-weight: 700;
      padding-top: 1rem;
    }

    .productPrice {
      width: 5rem;
      height: 2rem;
      background-color: rgba(0 0 0 / 40%);
      color: white;
      line-height: 2rem;
      position: absolute;
      top: 30px;
      border-radius: 0 4px 4px 0;
      transition: all 0.4 ease-in-out;
      z-index: 2;

      &:hover {
        scale: 1.1;
      }
    }
  }
}
</style>
