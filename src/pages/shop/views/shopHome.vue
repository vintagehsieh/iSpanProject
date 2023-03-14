<template>
  <div class="container">
    <ul class="CleanList">
      <button class="li" @click="popularProducts()">發燒音樂</button>

      <button class="li" @click="getGenreName(genreName[0])">
        華語流行音樂
      </button>
      <button class="li" @click="getGenreName(genreName[1])">
        西洋流行音樂
      </button>
      <button class="li" @click="getGenreName(genreName[2])">
        韓語流行音樂
      </button>
      <button class="li" @click="getGenreName(genreName[3])">
        日語流行音樂
      </button>
    </ul>
    <div class="page">
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
      <div id="pageCarousell">
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
          <swiper-slide
            ><router-link to="/productItem/1">
              <img
                src="https://localhost:44373/Uploads/Covers/a34e5d0ba87b4801a54f119f77165616.jpg" /></router-link></swiper-slide
          ><swiper-slide
            ><img
              src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
          ><swiper-slide
            ><img
              src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
          ><swiper-slide
            ><img
              src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
          ><swiper-slide
            ><img
              src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide
          ><swiper-slide
            ><img
              src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide
          ><swiper-slide
            ><img
              src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide
          ><swiper-slide
            ><img
              src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide
          ><swiper-slide
            ><img src="https://swiperjs.com/demos/images/nature-9.jpg"
          /></swiper-slide>
        </swiper>
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
    </div>

    <div id="products">
      <div v-if="products.value != undefined">
        <Card v-for="(item, index) in products.value" :key="index">
          <template #picture>
            <div>
              <img :src="item.albumInfo.albumCoverPath" alt="" />
            </div>
          </template>
          <template #name>
            <div>
              <p>{{ item.productName }}</p>
            </div>
          </template>
          <template #price>
            <div>
              <p>{{ item.productPrice }}</p>
            </div>
          </template>
          <template #categoryName>
            <div>
              <p>{{ item.categoryName }}</p>
            </div>
          </template>
          <template #id>
            <div>
              <p>{{ item.id }}</p>
              <router-link :to="'/productItem/' + item.id">購物車</router-link>
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

<style lang="scss" scoped>
.li {
  width: 100%;
  height: 50px;
  padding: 1rem;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  border-bottom: 2px dashed grey;
  background-color: #99caf1;
  a {
    text-decoration: none;
    color: rgb(37, 95, 171);
  }

  &:hover {
    background-color: rgb(37, 95, 171);

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
