<script>
import axios from "axios";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const actDetail = reactive({ data: {} });
    const isError = ref(false);
    let timer = null;

    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      const newDateString = `${year}年${month}月${day}日 ${hours}點${minutes}分`;
      return newDateString;
    }

    onMounted(() => {
      axios
        .get(`https://localhost:7043/Activities/single/${route.params.id}`)
        .then((res) => {
          actDetail.data = res.data;
        })
        .catch((error) => {
          isError.value = true;
          //請後端做找不到的提示錯誤訊息：找不到此活動
          // actDetail.data["error_message"] = error.response.data.error_message;
          timer = setTimeout(() => {
            router.push({ path: "/" });
          }, 3000);
        });
    });

    onUnmounted(() => {
      clearTimeout(timer);
    });

    async function addCalender() {
      alert("已經成功加入行事曆");
      const startDate = actDetail.data.activityStartTime;
      const attendDate = new Date(startDate).toISOString();
      const follow = reactive({
        activityId: route.params.id,
        attendDate: attendDate,
      });
      await axios
        .post(`https://localhost:7043/Activities/Follow`, follow, {
          withCredentials: true,
        })
        .then((res) => {
          alert("已加入行事曆");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return { actDetail, isError, formatDate, addCalender };
  },
};
</script>
<template>
  <div id="actDetail">
    <div v-if="!isError" class="singleAct">
      <button @click="addCalender">
        <li class="fa-solid fa-plus"></li>
      </button>
      <h1 class="name">{{ actDetail.data.activityName }}</h1>
      <h4 class="time">
        開始時間：{{ formatDate(actDetail.data.activityStartTime) }}<br />
        結束時間：{{ formatDate(actDetail.data.activityEndTime) }}
      </h4>
      <img :src="actDetail.data.activityImagePath" alt="" />
      <div class="desc">
        <p>{{ actDetail.data.activityInfo }}</p>
      </div>
    </div>
    <h1 v-if="isError" class="noAct">
      找不到此活動{{ actDetail.data.error_message }}
    </h1>
  </div>
</template>

<style lang="scss" scoped>
#actDetail {
  width: 60vw;
  margin: 3rem 3rem;
  padding: 0 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block: 6rem;
  margin-block-end: 10rem;

  .singleAct {
    border: 1px solid white;
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: rgba(255, 255, 255, 0.5) 0 2px 10px 0;
    position: relative;

    button {
      border: none;
      color: #f6b352;
      background-color: transparent;
      font-size: 3rem;
      position: absolute;
      left: -6rem;
      top: 2rem;
      cursor: pointer;
    }

    .name {
      color: black;
      font-size: 3rem;
    }

    .time {
      margin-block: 1.3rem;
      font-size: 1rem;
      line-height: 1.5rem;
      color: rgba(0, 0, 0, 0.5);
      font-weight: 650;
    }

    img {
      border: 1px solid black;
      width: 950px;
      height: 300px;
      margin-block: 0.5rem;
    }

    .desc {
      padding-inline: 2rem;
      margin-top: 1.3rem;
      font-size: 1.2rem;
      line-height: 2rem;
      text-align: justify;
    }
  }

  .noAct {
    color: white;
  }
}</style>
