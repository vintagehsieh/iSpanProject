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
        return Math.round(totalPriceWithDiscount);
      } else if (store.getters.getCoupon.discount[0] == "-") {
        const discountNumber = parseFloat(
          store.getters.getCoupon.discount.substring(1)
        );
        const totalPriceWithDiscount =
          membercart.value.reduce(
            (total, item) => total + item.productPrice * item.qty,
            0
          ) - discountNumber;
        return Math.round(totalPriceWithDiscount);
      } else {
        return Math.round(membercart.value.reduce(
          (total, item) => total + item.productPrice * item.qty,
          0
        ));
      }
    };

    const discountprice = () => {
      if (store.getters.getCoupon.discount[0] == "*") {
        const discountNumber = parseFloat(
          store.getters.getCoupon.discount.substring(1)
        );
        const totalPriceWithDiscount =
          Math.round(membercart.value.reduce(
            (total, item) => total + item.productPrice * item.qty,
            0
          ) * (1 - discountNumber));
        return totalPriceWithDiscount;
      } else if (store.getters.getCoupon.discount[0] == "-") {
        const discountNumber = parseFloat(
          store.getters.getCoupon.discount.substring(1)
        );
        return discountNumber;
      } else {
        return 0;
        ;
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
          $("#ECpay").html(returnObj);
          $("#payForm").submit();
        },
        error: function (err) {
          alert(err.status + " " + err.statusText + "\n" + err.responseText);
        },
      });
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

    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'NTD',
      maximumSignificantDigits: 4
      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return {
      discountprice,
      chekout,
      totalprice,
      deleteAllCartItem,
      coupon,
      membercart,
      cartTotal,
      formatter,
    };
  },
};
</script>

<template>
  <div class="checkoutContainer">
    <h1 class="title">結帳</h1>
    <div class="checkout">
      <div class="left">
        <table>
          <thead>
            <tr>
              <th>照片</th>
              <th>商品</th>
              <th>價格</th>
              <th>數量</th>
              <th>總價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in membercart.value" :key="index">
              <img :src="item.albumCoverPath" alt="" />
              <td>{{ item.productName }}</td>
              <td>{{ formatter.format(item.productPrice) }}</td>
              <td>{{ item.qty }}</td>
              <td>{{ formatter.format(item.productPrice * item.qty) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="right">
        <h4>訂單明細</h4>
        <hr />
        <div class="total">
          <div class="totalLabel">小計:</div>
          <div class="totalPrice">{{ formatter.format(cartTotal) }}</div>
        </div>
        <div class="couponContainer" v-if="coupon">
          <p class="couponTitle">折價:</p>
          <p class="couponText">- {{ formatter.format(discountprice()) }}</p>
        </div>
        <h3 class="finalPrice">{{ formatter.format(totalprice()) }}</h3>
        <hr />
        <button @click="chekout()" class="checkoutBtn">結帳</button>
      </div>
    </div>
    <div id="ECpay"></div>
  </div>
</template>

<style lang="scss" scoped>
.checkoutContainer {
  margin-top: 7rem;
  width: 100%;
  height: auto;
  justify-content: space-around;
  align-items: start;
  padding-inline: 2rem;
  display: flex;
  flex-direction: column;

  .title {
    color: white;
    font-size: 3.5rem;
    letter-spacing: 0.7rem;
    text-align: left;
    margin-left: 3.5rem;
  }

  .checkout {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 2rem;

    .left {
      table {
        border-collapse: collapse;
        width: 850px;

        thead {
          border: none;

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
            color: color;
            height: 9rem;
            background-color: white;
            font-weight: 700;
            font-size: 1.2rem;
            text-align: center;

            img {
              margin: 0.7rem auto;
              width: 120px;
              height: 120px;
            }

            td {}
          }
        }
      }
    }

    .right {
      margin-left: -2rem;
      margin-top: 1rem;
      height: auto;
      border: 1px solid white;
      width: 25rem;
      border-radius: 8px;
      box-shadow: rgba(255, 255, 255, 0.3) 0 3px 6px 0;

      h4 {
        color: white;
        font-size: 1.4rem;
        text-align: left;
        padding-block: 1.5rem;
        padding-inline: 1rem;
      }

      hr {
        margin-inline: 1rem;
      }

      .total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-size: 1.5rem;
        padding-inline: 1rem;
        padding-block: 1.5rem;
        color: rgba(255, 255, 255, 0.7);
        font-weight: normal;

        .totalLabel {}

        .totalPrice {}
      }

      .couponContainer {
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        padding-inline: 1rem;
        font-size: 1.5rem;
        color: rgba(255, 255, 255, 0.7);
        margin-top: -1rem;
        font-weight: normal;

        .couponTitle {
          font-size: 1.5rem;
          text-align: left;
        }

        .couponText {
          font-size: 1.5rem;
          margin-top: 0.75rem;
        }
      }

      .finalPrice {
        color: #f6b342;
        text-align: right;
        padding-inline: 1rem;
        margin-block: 1.5rem;
        font-size: 2.5rem;
      }

      .checkoutBtn {
        width: 360px;
        height: 50px;
        font-size: 1.5rem;
        line-height: 30px;
        margin-block: 2rem;
        background-color: #f6b342;
        cursor: pointer;
      }
    }
  }
}

// img {
//     height: 100px;
//     width: 100px;
// }

// table {
//     width: 100%;
//     border-collapse: collapse;
//     margin-top: 20px;
// }

// th,
// td {
//     padding: 10px;
//     text-align: left;
//     border-bottom: 1px solid #ddd;
// }

// th {
//     background-color: #f2f2f2;
// }

// button {
//     background-color: #4caf50;
//     color: white;
//     border: none;
//     padding: 10px;
//     border-radius: 5px;
//     cursor: pointer;
//     margin: 0 5px;
// }

// button:disabled {
//     background-color: #ccc;
//     cursor: not-allowed;
// }

// .custom-label {
//     color: #333;
//     font-size: 16px;
//     font-weight: bold;
//     text-transform: uppercase;
//     padding: 20px;
//     margin-bottom: 50px;
// }

// .custom-select {
//     padding: 8px;
//     font-size: 16px;
//     border: 2px solid #ccc;
//     border-radius: 4px;
// }
</style>
