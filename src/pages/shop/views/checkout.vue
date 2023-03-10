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
          <tr v-for="(item, index) in cartItems" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price * item.quantity }}</td>
            <td>{{ coupon }}</td>
          </tr>
        </tbody>
      </table>
      
      <hr>
      
      <div>
        <h3>優惠券</h3>
        <tr>
            <td>couponText</td>
            <td>-10</td>
        </tr>

        <h3>Total: {{ cartTotal-10 }}</h3>
      </div>

    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cartItems: [
          { name: "Product A", price: 10, quantity: 1 },
          { name: "Product B", price: 15, quantity: 2 },
          { name: "Product C", price: 20, quantity: 3 },
        ],
        selectedOption: '',
        options: [
          { value: 'option1', label: '選項 1' },
          { value: 'option2', label: '選項 2' },
          { value: 'option3', label: '選項 3' },
        ]
      };
    },
    computed: {
      cartTotal() {
        return this.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    },
    methods: {
      removeItem(index) {
        this.cartItems.splice(index, 1);
      },
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