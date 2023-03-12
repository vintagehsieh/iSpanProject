<script>
import { onMounted, ref } from "vue";
export default {
  setup() {
    const subscribe = ref([]);
    const subscribeDes = ref([]);
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
    return { subscribe, subscribeDes, formatDate, subscribePlan };
  },
};
</script>
<template>
  <aside>
    <div id="logo">
      <a href="index.html">
        <img src="@/assets/3884851.png" alt="" />
      </a>
    </div>
    <div id="default">
      <a to="" class="routerLink">
        <i class="fa-solid fa-user"></i>
        <h3>個人資訊</h3>
      </a>
      <a to="" class="routerLink">
        <i class="fa-solid fa-list"></i>
        <h3>訂閱紀錄</h3>
      </a>
      <a to="" class="routerLink">
        <i class="fa-solid fa-cart-shopping"></i>
        <!-- <i class="fa-solid fa-poo"></i> -->
        <h3>訂單紀錄</h3>
      </a>
      <a to="" class="routerLink" @click="createNewPlaylist">
        <i class="fa-solid fa-calendar"></i>
        <h3>行事曆</h3>
      </a>
      <div></div>
    </div>
  </aside>
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
            <i
              class="fa-solid fa-clipboard-list list"
              @click="subscribeDetail()"
            ></i>
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="(subscribePlan, index) in subscribeDes" :key="index">
          <td>{{ subscribePlan.planName }}</td>
          <td>{{ subscribePlan.price }}</td>
          <td>{{ subscribePlan.numberOfUsers }}</td>
          <td>{{ subscribePlan.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  /* 	border: none; */
  font-family: "Helvetica Neue", "Helvetica", "Arial", "PingFangTC-Light",
    "STHeitiTC-Light", "Microsoft JhengHei", "微軟正黑體", sans-serif;
  list-style: none;
}
thead {
  background-color: #707070;
}
table {
  width: 1000px;
  border-collapse: collapse;

  /* 將奇數列設為灰色底色 */
  tr:nth-child(odd) {
    background-color: #f7f7f7;
  }

  /* 將滑鼠移到行上時顯示淺色底色 */
  tbody tr:hover {
    background-color: #ebebeb;
  }

  /* 儲存格樣式 */
  td {
    border: 1px solid #ddd;
    padding: 0.5rem;
    text-align: center;
  }
  th {
    width: 20px;
    height: 50px;
  }
}
.m-subscribePlan {
  width: 100%;
}
.list {
  color: #383a3f;
}
aside {
  width: 500px;
  height: 800px;
  margin: 50px;
  padding: 0 2rem;
  color: rgb(0, 0, 0);

  #logo {
    display: flex;
    width: 300px;
    height: 300px;
    overflow: hidden;
    margin-bottom: 2rem;

    > a img {
      display: flex;
      width: 100%;
      height: 100%;
    }
  }

  > #default {
    width: 80%;
    margin: auto;
    > a {
      padding: 1rem 0;
      text-decoration: none;
    }
  }
}
</style>