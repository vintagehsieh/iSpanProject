<script>
import { reactive } from "vue";
// import required modules
import { EffectCoverflow, Pagination } from "swiper";
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
    props: {
        popular: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        const popular = reactive({ value: [] });

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

        return {
            modules: [EffectCoverflow, Pagination],
            popular,
            props,
            popularProducts,
        };
    },
};
</script>
<template>
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
        <swiper-slide v-for="swiperproduct in props.popular.value">
            <router-link :to="'/productItem/' + swiperproduct.id">
                <img :src="swiperproduct.albumInfo.albumCoverPath" />
            </router-link>
        </swiper-slide>
    </swiper>
</template>

<style lang="scss" scoped>
a {
    color: white;
    text-align: center;
}
.swiper {
    width: 100%;
    padding-top: 40px;
    padding-bottom: 40px;
    border-radius: 8px;
}

.swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
    img {
        display: block;
        width: 100%;
    }
}
</style>
