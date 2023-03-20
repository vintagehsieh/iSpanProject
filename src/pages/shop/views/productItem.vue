<script>
import { reactive, onMounted } from "vue";
import emitter from "@/mitt";
import { useStore } from "vuex"

export default {
    setup() {
        const products = reactive({ value: [] });
        const membercart = reactive({ value: [] });
        const cart = reactive({ value: "" });
        const store = useStore();
        var url = "";
        var lastSlashIndex = 0;
        var number = "";

        function alertFunction() {
            alert("已成功加入購物車！");
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            return `${year}-${month}-${day}`;
        }

        const addtoCartItem = async (productId, qty) => {
            await fetch(
                `https://localhost:7043/Carts/AddItem/${productId}/${qty}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accepted: "text/plain",
                    },

                    credentials: "include",
                }
            )
                .then((res) => res.text())
                .then((data) => {
                    cart.value = data;
                });

            store.dispatch('setMembercart')
        };

        onMounted(() => {
            url = window.location.href;
            lastSlashIndex = url.lastIndexOf("/");
            number = url.substring(lastSlashIndex + 1);

            fetch(`https://localhost:7043/Products/${number}/Detail`, {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => {
                    membercart.value = data;
                });
        });

        const formatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'NTD',
            maximumSignificantDigits: 4
            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });

        return {
            alertFunction,
            formatDate,
            membercart,
            number,
            products,
            addtoCartItem,
            formatter
        };
    },
};
</script>

<template>
    <div class="itemContainer" v-if="membercart.value.albumDetail && products.value">
        <div class="albumInfo">
            <div class="left">
                <div class="albumCover">
                    <img :src="membercart.value.albumDetail.albumCoverPath" alt="" />
                </div>
            </div>
            <div class="right">
                <div class="albumGenre">
                    {{ membercart.value.albumDetail.albumGenreName }}
                </div>
                <div class="albumName">
                    {{ membercart.value.albumDetail.albumName }}
                </div>
                <div class="artist-released">
                    {{ membercart.value.albumDetail.mainArtistName }} .
                    {{ formatDate(membercart.value.albumDetail.released) }}
                </div>
                <div class="buySection">
                    <div class="albumPrice">
                        {{ formatter.format(membercart.value.productPrice) }}
                    </div>
                    <div class="btn">
                        <input type="number" v-model="qty" min="1" step="1" />
                        <button type="button" @click="
                            addtoCartItem(membercart.value.id, qty),
                            alertFunction()
                        " class="addCartBtn">
                            加入購物車
                        </button>

                        <router-link to="/cart" @click="addtoCartItem(membercart.value.id, qty)">
                            <button type="button" class="buyButton">
                                直接購買
                            </button></router-link>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div class="albumIntro">
            <div class="introTitle">專輯介紹</div>
            <div class="albumDescription">
                {{ membercart.value.albumDetail.description }}
            </div>
        </div>
        <hr />
        <div class="songs">
            <div class="songTitle">專輯歌曲</div>
            <div class="songName">
                <ul v-for="(song, index) in membercart.value.albumDetail.songs" :key="index">
                    <li>{{ index + 1 }}.&nbsp;&nbsp;{{ song.songName }}</li>
                </ul>
            </div>
        </div>
    </div>
    <div v-else>
        <h1>查無此商品資訊</h1>
    </div>
</template>

<style lang="scss" scoped>
a {
    text-decoration: none;
    color: white;
}

.itemContainer {
    width: 100%;
    height: auto;
    color: white;
    padding-inline: 8rem;
    margin-block: 5rem;
    margin-bottom: 10rem;
    display: flex;
    flex-direction: column;

    .albumInfo {
        display: flex;
        padding: 1rem;

        .left {
            .albumCover {
                border: 1px solid transparent;

                img {
                    width: 500px;
                    height: 500px;
                    object-fit: cover;
                    border-radius: 10px;
                }
            }
        }

        .right {
            display: flex;
            flex-direction: column;
            align-items: start;
            width: 100%;
            margin-top: 2rem;
            margin-left: 4rem;

            .albumGenre {
                background-color: #f6b352;
                opacity: 0.8;
                width: 90px;
                height: 30px;
                border-radius: 3px;
                line-height: 30px;
                color: black;
                font-weight: 600;
                margin-left: 5px;
            }

            .albumName {
                font-size: 3.5rem;
                text-align: left;
            }

            .artist-released {
                display: flex;
                justify-content: space-between;
                margin-top: 0.5rem;
                font-size: 1.1rem;
                letter-spacing: 2px;
                padding-left: 2px;
            }
        }

        .buySection {
            margin-top: 3rem;

            .albumPrice {
                font-size: 3rem;
                color: #f6b352;
                font-weight: 700;
                display: block;
                text-align: left;
            }

            .btn {
                margin-top: 3rem;
                margin-left: 7rem;
                text-align: right;

                input {
                    width: 100px;
                    height: 25px;
                    text-align: center;
                    font-size: 1.2rem;
                    background-color: #1f2124;
                    border: 1px solid white;
                    border-radius: 8px;
                    color: white;
                    padding: 1rem;

                    &:focus {
                        border: none;
                        font-size: 1.5rem;
                    }
                }

                .addCartBtn {
                    width: 130px;
                    font-size: 1.2rem;
                    background-color: #1f2124;
                    color: white;
                    border: none;
                    margin-inline: 1rem;
                    cursor: pointer;
                    border-radius: 8px;
                    border: 1px solid white;
                    padding: 1rem;

                    &:hover {
                        color: #1f2124;
                        background-color: white;
                        font-weight: 700;
                    }
                }

                .buyButton {
                    width: 130px;
                    font-size: 1.2rem;
                    background-color: #1f2124;
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: 8px;
                    border: 1px solid white;
                    padding: 1rem;

                    &:hover {
                        color: #1f2124;
                        background-color: white;
                        font-weight: 700;
                    }
                }
            }
        }
    }

    hr {
        margin-block: 4rem;
    }

    .albumIntro {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .introTitle {
            font-size: 3rem;
            margin-bottom: 3rem;
            background-color: #f68657;
            padding-inline: 3rem;
            width: 200px;
            height: 80px;
            line-height: 80px;
        }

        .albumDescription {
            font-size: 1.3rem;
            text-align: justify;
            padding-inline: 3rem;
            line-height: 2.5rem;
        }
    }

    .songs {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .songTitle {
            font-size: 3rem;
            margin-bottom: 3rem;
            background-color: #f68657;
            padding-inline: 3rem;
            width: 200px;
            height: 80px;
            line-height: 80px;
        }

        .songName {

            // display: flex;
            // align-items: start;
            // justify-content: start;
            ul {
                li {
                    text-align: left;
                    font-size: 1.2rem;
                    line-height: 2.5rem;
                }
            }
        }
    }
}
</style>
