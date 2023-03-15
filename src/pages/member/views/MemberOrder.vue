<script>
import { onMounted, ref } from "vue";
export default {
  setup() {
    const subscribe = ref([]);
    onMounted(() => {
      fetch("https://localhost:7043/Members/Orders", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          subscribe.value = data;
          console.log(subscribe.value);
        })
        .catch((error) => {
          console.error(error);
        });
    });

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const formatPaid = (paid) => {
      if (paid) {
        return `付款完成`;
      } else {
        return `尚未付款`;
      }
    };
    return { subscribe, formatDate, formatPaid };
  },
};
</script>
<template>
  <div class="m-subscribePlan" v-if="subscribe.length !== 0">
    <table>
      <thead>
        <tr>
          <th>名稱</th>
          <th>付款狀態</th>
          <th>價格</th>
          <th>數量</th>
          <th>訂單建立日期</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(plan, index) in subscribe" :key="index">
          <td>{{ plan.productName }}</td>
          <td>{{ formatPaid(plan.paid) }}</td>
          <td>{{ plan.price }}</td>
          <td>{{ plan.qty }}</td>
          <td>{{ formatDate(plan.created) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.m-subscribePlan {
  width: 100%;

  table {
    width: 1000px;
    border-collapse: collapse;
    thead {
      background-color: #707070;
      tr {
        font-size: 1.25rem;
        &:nth-child(odd) {
          background-color: #f7f7f7;
        }
        th {
          width: 20px;
          height: 50px;
        }
      }
    }
    tbody {
      tr {
        &:hover {
          background-color: #ebebeb;
        }
        td {
          border: 1px solid #ddd;
          padding: 0.5rem;
          text-align: center;
        }
      }
    }
  }
}
</style>
