<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();

        const username = computed(() => {
            return store.getters.getUserID;
        });

        onMounted(() => {
            store.dispatch("updateUserID");
        });

        return { username };
    },
};
</script>
<template>
    <div class="content">
        <div class="navbar">
            <p>
                嗨，<span
                    ><a href="member.html" style="color: #f6b352">{{
                        username
                    }}</a></span
                ><br />
                今天想買什麼?
            </p>
            <div class="logo">
                <img
                    src="@/assets/music-note-icon-song-melody-tune-flat-symbol-free-vector.webp"
                    alt=""
                />
            </div>
            <div class="link">
                <router-link to="/">
                    <span class="icon"><i class="fa-solid fa-home"></i></span>
                    <h3>商品首頁</h3>
                </router-link>
                <router-link to="/cart">
                    <span class="icon"
                        ><i class="fa-solid fa-shopping-cart"></i
                    ></span>
                    <h3>購物車</h3>
                </router-link>
            </div>
        </div>
        <div class="view">
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>
a {
    text-decoration: none;
}
.content {
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
    .navbar {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        background: linear-gradient(
            180deg,
            rgba(60, 61, 62, 1) 0%,
            rgba(59, 55, 49, 1) 100%
        );
        min-width: 300px;
        height: 100%;
        padding-top: 6rem;
        color: white;
        padding-inline: 2rem;
        p {
            color: white;
            font-size: 1.25rem;
            margin-bottom: 1.75rem;
            letter-spacing: 2px;
            text-align: center;
            span {
                margin-top: 1rem;
            }
        }
        .logo {
            position: relative;
            width: 175px;
            height: 175px;
            overflow: hidden;
            border-radius: 50%;
            img {
                position: absolute;
                width: 100%;
                height: 100%;
                scale: 1.2;
                object-fit: cover;
            }
        }
        .link {
            margin-top: 4rem;
            margin-left: -10px;
            a {
                display: flex;
                align-items: center;
                text-decoration: none;
                color: white;
                margin-bottom: 2.5rem;
                font-size: 1rem;
                text-align: justify;
                &:hover {
                    color: #f6b352;
                }
                span {
                }
                h3 {
                    padding-left: 1rem;
                }
            }
        }
    }
    .view {
        flex: 1;
        .router-link {
            a {
                .icon {
                }
                h3 {
                }
            }
        }
    }
}
</style>
