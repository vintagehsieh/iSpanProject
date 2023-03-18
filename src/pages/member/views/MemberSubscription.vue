<script>
import { onMounted, ref } from "vue";
export default {
  setup() {
    const subscribe = ref([]);
    const subscribeDes = ref([]);
    const isModal = ref(false);

    onMounted(() => {
      fetch("https://localhost:7043/Members/SubscriptionRecord", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
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
      return `${year} 年 ${month} 月 ${day} 日`;
    };
    const subscribePlan = async () => {
      await fetch("https://localhost:7043/Members/SubscriptionPlan", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          subscribeDes.value = data;
          console.log(subscribeDes.value);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    subscribePlan();

    return {
      subscribe,
      subscribeDes,
      formatDate,
      subscribePlan,
      isModal,
    };
  },
};
</script>
<template>
  <div class="m-subscribePlan" v-if="subscribe.length !== 0">
    <table>
      <thead>
        <tr>
          <th>會員暱稱</th>
          <th>訂閱人數</th>
          <th>訂閱方案</th>
          <th>訂閱價格</th>
          <th>訂閱時間</th>
          <th>到期時間</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(plan, index) in subscribe" :key="index">
          <td>{{ plan.memberNickName }}</td>
          <td>{{ plan.numberOfUsers }}</td>
          <td>{{ plan.planName }}</td>
          <td>{{ plan.price }}</td>
          <td>{{ formatDate(plan.subscribedTime) }}</td>
          <td>{{ formatDate(plan.subscribedExpireTime) }}</td>
          <td>
            <i class="fa-solid fa-clipboard-list list" @click="subscribeDetail()"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="m-subscribePlan" v-else>
    <table>
      <thead>
        <tr>
          <th>訂閱方案</th>
          <th>價格</th>
          <th>帳戶</th>
          <th>描述</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(subscribePlan, index) in subscribeDes" :key="index">
          <td>{{ subscribePlan.planName }}</td>
          <td>{{ subscribePlan.price }}</td>
          <td>{{ subscribePlan.numberOfUsers }}</td>
          <td style="white-space: pre-line;">{{ subscribePlan.description }}</td>
          <td><i class="fa-solid fa-store"></i></td>
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
