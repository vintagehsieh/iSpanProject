<template>
  <div class="shopping-cart">
    <h1>購物車</h1>
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in membercart.value" :key="index">
          <td>{{ item.productName }}</td>
          <td>{{ item.productPrice }}</td>
          <td>
            <button
              @click="decreaseItemQuantity(item)"
              :disabled="item.qty <= 1"
            >
              -
            </button>
            {{ item.qty }}
            <button @click="increaseItemQuantity(item)">+</button>
          </td>
          <td>{{ item.productPrice * item.qty }}</td>
          <td><button @click="removeItem(index)">Remove</button></td>
        </tr>
      </tbody>
    </table>
    <p>Total: {{ cartTotal }}</p>
    <hr />

    <div>
      <h3>優惠券</h3>
      <label for="select-option" class="custom-label">請選擇一個優惠券：</label>
      <!-- <select class="custom-select">
          <option value="" disabled selected >請選擇一個選項</option>
        <select id="select-option" v-model="selectedOption" class="custom-select" @change="showvalue">
          <option v-for="option in options.value" :key="option.id" :value="option.id" @change="showvalue($event)" >{{ option.couponText }}</option>
          
        </select> -->
      <select
        id="select-option"
        v-model="options"
        class="custom-select"
        @change="showvalue"
      >
        <option value="" disabled>請選擇一個選項</option>
        <option
          v-for="option in options.value"
          :key="option.id"
          :value="option.id"
        >
          {{ option.couponText }}
        </option>
      </select>
    </div>

    <hr />
    <h3>可會喜歡</h3>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, computed, onMounted } from "vue";
import http from "@/plugins/http";

export default {
  setup() {
    const options = reactive([]);

    const membercart = reactive({ value: [] });
    const addcart = reactive("");

    const addCartItem = (itemId) => {
      fetch("https://localhost:7043/Carts/1/CartAdd/4", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qty: itemId, // 將 qty 的值更新為 10，可以根據實際需求修改
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          addcart.value = data.qty;
          console.log(addcart);
        });
    };

    onMounted(() => {
      fetch("https://localhost:7043/Carts/CartItem?memberId=12", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          membercart.value = data;

          console.log(membercart);
        });
      fetch("https://localhost:7043/Carts/CartCoupon", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          options.value = data;

          console.log(options);
        });
      // const select = document.querySelector(".selected-option");
      // const defaultOption = document.createElement("option");
      // defaultOption.value = "";
      // defaultOption.disabled = true;
      // defaultOption.selected = true;
      // defaultOption.textContent = "請選擇一個選項";
      // select.insertBefore(defaultOption, select.firstChild);
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

    const decreaseItemQuantity = (item) => {
      item.qty--;
    };

    const increaseItemQuantity = (item) => {
      item.qty++;
      addCartItem(item.id);
    };

    const removeItem = (index) => {
      cartItems.splice(index, 1);
    };

    return {
      options,
      membercart,
      cartTotal,
      decreaseItemQuantity,
      increaseItemQuantity,
      removeItem,
      showvalue,
      addCartItem,
    };
  },
};
</script>

<style>
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
  background-color: #4caf50;
  color: white;
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
}
</style>
