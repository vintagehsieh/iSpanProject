<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


export default {
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>
<template>
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
  </div>
</template>

<style></style>
