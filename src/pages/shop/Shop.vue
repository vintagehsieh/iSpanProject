<script>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import axios from "axios";
import ShopHeader from "@/pages/shop/components/ShopHeader";
import ShopSide from "@/pages/shop/components/ShopSide";

export default {
    components: {
        ShopHeader,
        ShopSide,
    },
    setup() {
        const isLogin = ref(false);
        onMounted(() => {
            const isLoginLocalStorage = localStorage.getItem("isLogin");
            if (isLoginLocalStorage) {
                isLogin.value = true;
            } else {
                isLogin.value = false;
            }
        });
        const handLogout = () => {
            // 把isLogin改回false
            isLogin.value = false;

            // 清除cookie和localstorage
            Cookies.remove("UserID");
            localStorage.clear();

            deleteCookie();
            setTimeout(() => {
                redirect();
            }, 1000);
        };

        const redirect = () => {
            window.history.pushState({}, "", "/");
            window.location.reload();
        };

        const deleteCookie = () => {
            axios
                .post(
                    "https://localhost:7043/Members/MemberLogOut",
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                    { withCredentials: true }
                )
                .then((res) => {})
                .catch((err) => {});
        };
        return { isLogin, handLogout };
    },
};
</script>
<template>
    <div class="container">
        <div class="headContainer">
            <ShopHeader :isLogin="isLogin" :handLogout="handLogout" />
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
    // -webkit-box-sizing: border-box;
    // -moz-box-sizing: border-box;
    //box-sizing: border-box;
    // 改字體
    font-family: "微軟正黑體", "Heiti TC", "sans-serif";
    list-style: none;
}

img {
    display: block;
}

html,
body {
    width: 100%;
    height: 100%;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(246, 179, 82, 1) 100%
    );
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
        background-color: #1f2124;
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
            display: flex;
            justify-content: start;
            align-items: start;
            width: 100%;
            height: auto;
            padding-left: 3rem;
        }
    }
}
</style>
