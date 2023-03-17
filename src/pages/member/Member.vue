<script>
import MemberSide from "@/pages/member/components/MemberSide";
import MemberHeader from "@/pages/member/components/MemberHeader.vue";
import Cookies from "js-cookie";
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
    components: {
        MemberSide,
        MemberHeader,
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
        <!-- header -->
        <div class="headContainer">
            <MemberHeader :isLogin="isLogin" :handLogout="handLogout" />
        </div>
        <!-- side -->
        <div class="sideContainer">
            <MemberSide />
        </div>
        <!-- router-view -->
        <!-- <div class="view"></div> -->
    </div>
</template>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    // 改字體
    font-family: "Microsoft JhengHei", "Heiti TC", "sans-serif";
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

#member {
    width: 100%;
    height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: hsl(210, 29%, 24%);

    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-color: #1f2124;

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
        }
        .view {
            flex: 1;
            overflow-y: scroll;
            background-color: white;
            display: flex;
            justify-content: start;
            align-items: start;
            padding-top: 7rem;
            padding-left: 9rem;
        }
    }
}
</style>
