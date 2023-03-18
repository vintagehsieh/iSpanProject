<script>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import axios from "axios";

export default {
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
                .then((res) => { })
                .catch((err) => { });
        };
        return { isLogin, handLogout };
    },
};
</script>
<template>
    <header>
        <nav>
            <!-- logo -->
            <div id="logo">
                <a href="index.html"><img src="@/assets/logo.png" /></a>
            </div>
            <div class="block"></div>
            <!-- Direct -->
            <div id="pages">
                <a href="music.html" id="musicPage">音樂播放</a>
                <a href="shop.html" id="shopPage">音樂商城</a>
                <a href="activity.html" id="actPage">音樂活動</a>
                <a href="member.html" id="actPage">會員</a>
            </div>
            <!-- membership -->
            <div class="loginSection">
                <!-- <div v-if="props.isLogin" class="avatar"></div> -->
                <!-- <div class="member" v-if="props.isLogin">
                                                <a href="member.html">{{ memberAccount }}</a>
                                            </div> -->
                <button @click="handLogout" class="logout">
                    登出
                </button>
                <!-- 引入font-awesome -->
                <!-- <font-awesome-icon icon="fa-solid fa-caret-down" /> -->
            </div>
        </nav>
    </header>
</template>
<style lang="scss" scoped>
header {
    background-color: #1f2124;
    width: 100%;
    height: 100px;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;

    >#logo {
        display: flex;
        margin-left: 5rem;
        width: 200px;
        height: 60px;
        overflow: hidden;
        z-index: 2;

        >a img {
            display: flex;
            width: max(10vw, 200px);
            margin-top: -1rem;
            scale: 2;
        }
    }

    .block {
        display: block;
        min-width: 364.2px; //23.75vw;
        height: 100px;
        background-color: rgba(60, 61, 62, 1);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }

    >#pages {
        display: flex;
        color: white;

        > :nth-child(1) {
            margin-left: 2rem;
        }

        >a {
            text-decoration: none;
            color: white;
            padding-right: 6rem;
        }
    }

    >.loginSection {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 10rem;

        >.avatar {
            // 縮小不要變形
            display: flex;
            min-width: 30px;
            min-height: 30px;
            border-radius: 50%;
            background-color: white;
        }

        >.member {
            color: white;
            margin: 0 1rem;
            padding: 0 1rem;

            a {
                font-size: 1.25rem;
                text-decoration: none;
                color: orange;
            }
        }

        >a {
            text-decoration: none;
            color: white;
            padding-left: 1rem;
        }

        >.logout {
            width: 60px;
            height: 35px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;

            &:hover {
                box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2),
                    0 6px 20px 0 rgba(255, 255, 255, 0.19);
            }
        }
    }
}

font-awesome-icon {
    color: white;
}
</style>
