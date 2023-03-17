<script>
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        const options = reactive([]);

        const membercart = computed(() => {
            return store.getters.getMembercart;
        })

        const increaseCartItem = (id) => {
            fetch(`https://localhost:7043/Carts/increaseCart/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accepted: "text/plain",
                },

                credentials: "include",
            })
                .then((res) => res.text())
                .then((data) => { });
        };

        const setCoupon = (e) => {
            const coupon = [
                options.value[e.target.value].couponText,
                options.value[e.target.value].discounts,
            ];
            store.dispatch("setCoupon", coupon);
        };

        const decreaseCartItem = (id) => {
            fetch(`https://localhost:7043/Carts/decreaseCart/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accepted: "text/plain",
                },

                credentials: "include",
            })
                .then((res) => res.text())
                .then((data) => {
                    console.log(data);
                });
        };

        const deleteCartItem = (id) => {
            fetch(`https://localhost:7043/Carts/DeleteCart/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                });
        };

        onMounted(() => {
            store.dispatch('setMembercart')
            console.log(membercart);
            fetch("https://localhost:7043/Carts/CartCoupon", {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => {
                    options.value = data;
                });
        });

        function cartTotal() {
            if (typeof membercart.value === 'object' && Array.isArray(membercart.value)) {
                const total = membercart.value.reduce((acc, item) => acc + item.productPrice * item.qty, 0);
                console.log(total);
                return total;
            } else {
                console.error('membercart.value is not an array');
            }
        };

        const showvalue = (e) => {
            console.log(e.target.value);
        };

        const decreaseItemQuantity = (item, productId) => {
            item.qty--;
            const id = productId;
            decreaseCartItem(id);
        };

        const increaseItemQuantity = (item, productId) => {
            item.qty++;
            const id = productId;
            increaseCartItem(id);
        };

        const removeItem = (index, itemid) => {
            const id = itemid;
            membercart.value.splice(index, 1);

            deleteCartItem(id);
        };

        return {
            options,
            membercart,
            cartTotal,
            setCoupon,
            decreaseItemQuantity,
            increaseItemQuantity,
            removeItem,
            showvalue,
            increaseCartItem,
            decreaseCartItem,
            deleteCartItem,
        };
    },
};
</script>

<template>
    <div class="shopping-cart">
        <h1>購物車</h1>
        <div class="cartTitle">
            <span class="pic">照片</span>
            <span class="product">商品名稱</span>
            <span class="price">價格</span>
            <span class="qty">數量</span>
            <span class="tPrice">總價</span>
            <!-- <span class="dele">刪除</span> -->
        </div>
        <div class="productsContainer" v-for="(item, index) in membercart" :key="index">
            <div class="topContainer">
                <div class="proInfo">
                    <div class="proPic">
                        <img class="productCover" :src="item.albumCoverPath" alt="" />
                    </div>
                    <div class="proName">{{ item.productName }}</div>
                    <div class="proPrice">{{ item.productPrice }}</div>
                    <div class="proQty">
                        <button class="deItem" @click="decreaseItemQuantity(item, item.productId)"
                            :disabled="item.qty <= 1">
                            -
                        </button>
                        {{ item.qty }}
                        <button class="inItem" @click="increaseItemQuantity(item, item.productId)">
                            +
                        </button>
                    </div>
                    <div class="tPrice">{{ item.productPrice * item.qty }}</div>
                </div>
            </div>
            <div class="bottomContainer">
                <button class="removeButton" @click="removeItem(index, item.id)">
                    <span class="trash"><i class="fa-solid fa-trash"></i></span>刪除
                </button>
            </div>
        </div>

        <p class="total" v-if="cartTotal != 0">NTD$ {{ cartTotal() }}</p>
        <p class="totalEmpty" v-else>目前購物車尚無物品</p>
        <hr />

        <div class="couponContainer">
            <div class="selectGroup">
                <h3>優惠券</h3>
                <label for="select-option" class="custom-label">請選擇一個優惠券</label>
                <select id="select-option" v-model="options" class="custom-select" @change="setCoupon">
                    <option value="" disabled>請選擇一個選項</option>
                    <option v-for="(option, index) in options.value" :key="option.id" :value="index">
                        {{ option.couponText }}
                    </option>
                </select>
            </div>
            <button class="checkout">
                <a href="#/checkout">前往結帳<span><i class="fa-solid fa-arrow-right"></i></span></a>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
a {
    text-decoration: none;
}

.shopping-cart {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    margin-block: 7rem;
    margin-bottom: 10rem;

    h1 {
        font-size: 3.5rem;
        letter-spacing: 1rem;
        color: white;
        text-align: left;
    }

    .cartTitle {
        padding: 10px 15px;
        background-color: #f68657;
        font-size: 1.1rem;
        display: flex;
        margin-top: 20px;
        font-weight: 700;
        color: white;

        .pic {
            flex: 8 1 0%;
        }

        .product {
            flex: 6 1 0%;
            text-align: left;
        }

        .price {
            flex: 6 1 0%;
        }

        .qty {
            flex: 6 1 0%;
        }

        .tPrice {
            flex: 4 1 0%;
        }
    }

    .productsContainer {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: auto;
        margin-block: 3rem;

        &:hover {
            background-color: #f68657;
            color: white;
        }

        .topContainer {
            padding: 2rem;
            font-size: 1.2rem;
            background-color: #fff;
            color: black;
            height: auto;
            padding-bottom: 2rem;

            .proInfo {
                display: flex;
                align-items: center;
                // padding-top: 1rem;
                font-size: 1.3rem;
                font-weight: 700;

                .proPic {
                    flex: 8;
                    padding-left: 6rem;

                    img {
                        width: 100px;
                        height: 100px;
                        object-fit: contain;
                    }
                }

                .proName {
                    flex: 4;
                    margin-left: -12rem;
                    text-align: left;
                }

                .proPrice {
                    flex: 4;
                    margin-left: 5rem;
                }

                .proQty {
                    flex: 4;
                    margin-left: 3rem;

                    .deItem {
                        cursor: pointer;
                        width: 25px;
                        height: 25px;
                        font-size: 1.2rem;
                        margin-right: 0.5rem;
                        line-height: 25px;
                        border: none;
                        background-color: #f68657;

                        &:disabled {
                            background-color: #959292;
                        }
                    }

                    .inItem {
                        cursor: pointer;
                        width: 25px;
                        height: 25px;
                        font-size: 1.2rem;
                        font-weight: 700;
                        margin-left: 0.5rem;
                        line-height: 25px;

                        border: none;
                        background-color: #f68657;
                    }
                }

                .tPrice {
                    flex: 4;
                    margin-right: -2rem;
                }
            }
        }

        .bottomContainer {
            background-color: white;
            border-top: 1px solid rgba(0, 0, 0, 0.5);
            color: #1f2124;
            display: flex;
            align-items: center;
            justify-content: end;
            padding-right: 4rem;
            padding-block: 1rem;

            .removeButton {
                color: black;
                font-size: 1.2rem;
                background-color: white;
                border: none;
                font-weight: 700;

                &:hover {
                    color: #f68657;
                }
            }
        }
    }

    .total {
        color: #f68657;
        font-size: 3rem;
        text-align: right;
        margin-block-start: 2rem;
    }

    .totalEmpty {
        color: white;
        font-size: 2rem;
        text-align: center;
        margin-block-start: 3rem;
    }

    hr {
        margin-block: 3rem;
        border: rgba(255, 255, 255, 0.8) solid 1.5px;
    }

    .couponContainer {
        margin-block-start: 1rem;
        margin-block-end: 2rem;
        height: auto;
        width: 100%;
        padding-block: 2rem;
        align-self: start;
        display: flex;
        justify-content: space-between;

        .selectGroup {
            border: 1px white solid;
            border-radius: 8px;
            align-self: start;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-top: 0.5rem;
            width: 50%;
            padding: 2rem;

            h3 {
                color: white;
                font-size: 2rem;
                text-align: left;
                padding-left: 2rem;
            }

            .custom-label {
                color: white;
                font-size: 1.2rem;
                font-weight: bold;
                padding-block: 1rem;
                align-self: start;
                padding-left: 2rem;
            }

            .custom-select {
                display: inline-block;
                width: 200px;
                height: 35px;
                background-color: #1f2124;
                color: white;
                font-size: 1rem;
                border: 1px solid #ccc;
                border-radius: 8px;
                align-self: start;
                margin-left: 2rem;
                color: white;

                option {
                    color: white;
                }
            }
        }

        .checkout {
            width: 180px;
            height: 60px;
            font-size: 1.5rem;
            background-color: #1f2124;
            align-self: end;
            margin-top: 1rem;
            border: 1px solid white;
            border-radius: 8px;
            line-height: 60px;
            font-weight: 700;

            &:hover {
                background-color: white;

                a {
                    color: #1f2124;
                }
            }

            a {
                color: white;

                span {
                    padding-left: 1rem;
                }
            }
        }
    }
}
</style>
