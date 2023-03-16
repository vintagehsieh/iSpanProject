<script>
import axios from "axios";
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const options = reactive([]);

    const membercart = reactive({ value: [] });
    const addcart = reactive("");

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
        .then((data) => {});
    };

    const setCoupon = (e) => {
      // console.log("this", e.target.value-1);
      const coupon = [
        options.value[e.target.value - 1].couponText,
        options.value[e.target.value - 1].discounts,
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
      fetch("https://localhost:7043/Carts/CartItem", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          membercart.value = data;
          console.log("this", membercart.value);
        });
      fetch("https://localhost:7043/Carts/CartCoupon", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          options.value = data;
        });
    });

    const cartTotal = computed(() => {
      return membercart.value.reduce(
        (total, item) => total + item.productPrice * item.qty,
        0
      );
    });

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
      console.log(itemid);
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
    <table>
      <thead>
        <tr>
          <th>照片</th>
          <th>商品</th>
          <th>價格</th>
          <th>數量</th>
          <th>總價</th>
          <th>刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in membercart.value" :key="index">
          <img :src="item.albumCoverPath" alt="" />
          <td>{{ item.productName }}</td>
          <td>{{ item.productPrice }}</td>
          <td>
            <button
              @click="decreaseItemQuantity(item, item.productId)"
              :disabled="item.qty <= 1"
            >
              -
            </button>
            {{ item.qty }}
            <button
              class="btn"
              @click="increaseItemQuantity(item, item.productId)"
            >
              +
            </button>
          </td>
          <td>{{ item.productPrice * item.qty }}</td>
          <td>
            <button class="removeButton" @click="removeItem(index, item.id)">
              <font-awesome-icon
                icon="fa-solid fa-trash"
                style="color: black; font-size: 25px"
              />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="total">Total: {{ cartTotal }}</p>
    <hr />

    <div class="couponContainer">
      <div class="selectGroup">
        <h3>優惠券</h3>
        <label for="select-option" class="custom-label">請選擇一個優惠券</label>
        <select
          id="select-option"
          v-model="options"
          class="custom-select"
          @change="setCoupon"
        >
          <option value="" disabled>請選擇一個選項</option>
          <option
            v-for="(option, index) in options.value"
            :key="option.id"
            :value="option.id"
          >
            {{ option.couponText }}
          </option>
        </select>
      </div>
      <button class="checkout">
        <a href="#/checkout"
          >前往結帳<span><i class="fa-solid fa-arrow-right"></i></span
        ></a>
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
  max-width: 100%;
  margin: 0 auto;
  margin-top: 7rem;
  h1 {
    font-size: 3.5rem;
    letter-spacing: 1rem;
    color: white;
  }
  table {
    width: 1000px;
    border-collapse: collapse;
    margin-top: 3rem;
    thead {
      tr {
        th {
          padding: 10px;
          text-align: center;
          border-bottom: 1px solid #ddd;
          background-color: #f6b342;
          color: black;
          font-size: 1.2rem;
        }
      }
    }
    tbody {
      tr {
        img {
          height: 100px;
          width: 100px;
        }
        td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
          button {
            border: none;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            margin: 0 5px;
            &:disabled {
              background-color: #ccc;
              cursor: not-allowed;
            }
          }
          .removeButton {
            background-color: #fff;
          }
        }
      }
    }
  }
  .total {
    color: white;
    font-size: 2rem;
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
