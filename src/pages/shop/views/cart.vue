<template>
  <div class="shopping-cart ">
    <h1>購物車</h1>
    <table>
      <thead>
        <tr>
          <th>picture</th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in membercart.value" :key="index">
          <img :src="item.albumCoverPath" alt="">
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
    <p>Total: {{ cartTotal }}</p>
    <hr />

    <div>
      <h3>優惠券</h3>
      <label for="select-option" class="custom-label">請選擇一個優惠券：</label>
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
      <button><a href="#/checkout" class="">前往結帳</a></button>
    </div>

    <hr />
    <h3>可會喜歡</h3>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, computed, onMounted } from "vue";
import http from "@/plugins/http";
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
          console.log("this",membercart);
        });
      fetch("https://localhost:7043/Carts/CartCoupon", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          options.value = data;

          console.log(options);
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

<style scoped>
img{
  height: 100px;
  width: 100px;
}

.shopping-cart {
  font-family: Arial, sans-serif;
  max-width: 2000px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
button a {
  text-decoration: none;
  color: white;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

button {
  /* background-color: #4caf50; */
  /* color: white; */
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.custom-label {
  color: #333;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 20px;
  margin-bottom: 50px;
}

.custom-select {
  padding: 8px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  height: 30px;
}

.removeButton {
  background-color: #fff;
}

.btn {
  background-color: #e65f11;
  height: 10px;
  width: 10px;
  line-height: 1px;
  
}
</style>
