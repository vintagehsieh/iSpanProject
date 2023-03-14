<template>
  <div class="shopping-cart">
    <h1>結帳</h1>
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in membercart.value" :key="index">
          <td>{{ item.productName }}</td>
          <td>{{ item.productPrice }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.productPrice * item.qty }}</td>
        </tr>
      </tbody>
    </table>
    <p>Total: {{ cartTotal }}</p>
    <hr />

    <div>
      <h3>優惠券</h3>
      <tr>
        <td>{{ coupon.couponText }}</td>
      </tr>

      <h3>最後Total: {{ totalprice() }}</h3>
      <button @click="chekout()">結帳</button>
    </div>
    <div id="test"></div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const membercart = reactive({ value: [] });
    let productName = [];
    let Total = [];
    const coupon = computed(() => {
      console.log(store.getters.getCoupon);
      return store.getters.getCoupon;
    });

    const totalprice = () => {
      if (store.getters.getCoupon.discount[0] == "*") {
        const discountNumber = parseFloat(
          store.getters.getCoupon.discount.substring(1)
        );
        const totalPriceWithDiscount =
          membercart.value.reduce(
            (total, item) => total + item.productPrice * item.qty,
            0
          ) * discountNumber;
        return totalPriceWithDiscount;
      } else if (store.getters.getCoupon.discount[0] == "-") {
        const discountNumber = parseFloat(
          store.getters.getCoupon.discount.substring(1)
        );
        const totalPriceWithDiscount =
          membercart.value.reduce(
            (total, item) => total + item.productPrice * item.qty,
            0
          ) - discountNumber;
        return totalPriceWithDiscount;
      } else {
        return membercart.value.reduce(
          (total, item) => total + item.productPrice * item.qty,
          0
        );
      }
    };

    const deleteAllCartItem = () => {
      fetch(`https://localhost:7043/Carts/DeleteAllCart`, {
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

    console.log(membercart.value);
    const chekout = async () => {
      productName = membercart.value.map((x) => x.productName);
      Total = totalprice();
      console.log(productName);
      await deleteAllCartItem();
      $.ajax({
        url: `https://localhost:7043/EcPay?cartId=${membercart.value[0].cartId}&Total=${Total}&productName=${productName}`,
        method: "POST",
        dataType: "text",
        xhrFields: {
          withCredentials: true,
        },
        success: function (returnObj) {
          // console.log(returnObj);
          $("#test").html(returnObj);
          $("#payForm").submit();
        },
        error: function (err) {
          alert(err.status + " " + err.statusText + "\n" + err.responseText);
        },
      });

      return {
        chekout,
      };
    };

    onMounted(() => {
      fetchData();
    });

    async function fetchData() {
      try {
        const response = await fetch("https://localhost:7043/Carts/CartItem", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log("this", data);
        membercart.value = data;
      } catch (error) {
        console.error(error);
      }
    }

    const cartTotal = computed(() => {
      return membercart.value.reduce(
        (total, item) => total + item.productPrice * item.qty,
        0
      );
    });

    return {
      chekout,
      totalprice,
      deleteAllCartItem,
      coupon,
      membercart,
      cartTotal,
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
