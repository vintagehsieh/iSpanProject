<template>
  <div class="container">
    <ul class="CleanList">
      <button @click="AllProducts()">全部</button>
      <button class="li" @click="popularProducts()">發燒音樂</button>

      <button class="li" @click="getProductsByGenreName(genreName[0])">
        華語流行音樂
      </button>
      <button class="li" @click="getProductsByGenreName(genreName[1])">
        西洋流行音樂
      </button>
      <button class="li" @click="getProductsByGenreName(genreName[2])">
        韓語流行音樂
      </button>
      <button class="li" @click="getProductsByGenreName(genreName[3])">
        日語流行音樂
      </button>
    </ul>
    <div class="page">
      <div id="pageHeader">
        <div id="search">
          <input type="text" id="value" />
          <button @click="getSearch()" class="searchbutton">
            <font-awesome-icon
              icon="fa-solid fa-magnifying-glass"
              style="font-size: 25px; color: grey"
            />
          </button>
        </div>
      </div>
      <div id="pageCarousell" v-if="products.value">
        <swiper
          :effect="'coverflow'"
          :grabCursor="true"
          :centeredSlides="true"
          :slidesPerView="'auto'"
          :coverflowEffect="{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }"
          :pagination="true"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide v-for="swiperproduct in popular.value">
            <router-link :to="'/productItem/' + swiperproduct.id">
              <img :src="swiperproduct.albumInfo.albumCoverPath" />
            </router-link>
          </swiper-slide>
        </swiper>
        <label for="select-option" class="custom-label">搜尋方式：</label>
        <select
          id="select-option"
          v-model="options"
          class="custom-select"
          @change="showvalue"
        >
          <option>全部</option>
          <option>歌手</option>
          <option>專輯</option>
        </select>
      </div>
    </div>

    <div id="products">
      <div v-if="products.value != undefined">
        <Card v-for="(item, index) in products.value" :key="index">
          <template #picture>
            <div>
              <router-link :to="'/productItem/' + item.id">
                <img
                  :src="item.albumInfo.albumCoverPath"
                  alt=""
                  class="picture"
                />
              </router-link>
            </div>
          </template>
          <template #name>
            <div>
              <router-link :to="'/productItem/' + item.id">
                <p>{{ item.albumInfo.albumName }}</p>
              </router-link>
            </div>
          </template>
          <template #price>
            <div>
              <router-link :to="'/productItem/' + item.id">
                <p>{{ item.productPrice }}</p>
              </router-link>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const products = reactive({ value: [] });
    const popular = reactive({ value: [] });
    const searchProducts = reactive({ value: [] });

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

    const popularProducts = () => {
      fetch(`https://localhost:7043/Products/Popular`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          popular.value = data;

          console.log(popular.value);
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
          console.log("this", products.value[0].albumInfo.albumCoverPath);
        });
    });

    function AllProducts() {
      return products.value;
    }

    return {
      genreName,
      products,
      popular,
      AllProducts,
      getSearch,
      getProductsByGenreName,
      popularProducts,
      modules: [EffectCoverflow, Pagination],
    };
  },
};
</script>

<style lang="scss" scoped>
.picture {
  height: 100%;
  width: 100%;
}

.searchbutton {
  background-color: #fff;
}
.li {
  width: 100%;
  height: 50px;
  padding: 1rem;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  border-bottom: 2px dashed grey;
  background-color: #363534;
  a {
    text-decoration: none;
    color: rgb(37, 95, 171);
  }

  &:hover {
    background-color: rgb(49, 58, 71);

    a {
      color: white;
    }
  }
}

.container {
  display: flex;
  flex-wrap: wrap;
  min-height: 200vh;

  #side {
    width: 15rem;
    height: 10rem;
  }

  .page {
    width: 60em;
    margin-bottom: 2rem;

    #pageHeader {
      width: 100%;
      height: 5rem;
      display: flex;

      #search {
        width: 16rem;
        height: 3rem;
        padding: 0 1rem;
        border: 2px solid #1b2e85;
        border-radius: 50px;
        margin-left: auto;
        margin-right: 8rem;
        padding-left: 20px;
        display: flex;
        align-items: center;

        input {
          font-size: 25px;
          width: 12rem;
          border: none;

          &:focus {
            outline: none;
          }
        }
      }
    }

    #pageCarousell {
      margin-bottom: 1rem;
      display: flex;
      justify-content: center;

      #carousell {
        width: 50rem;
        height: 30rem;
        border-radius: 1rem;
        background-color: #7388e0;
      }
    }
  }

  #products {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 1000px;
  }
}

.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.swiper-slide img {
  display: block;
  width: 100%;
}
</style>
