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

    onMounted(() => {
      axios
        .get(`http://localhost:3000/activities/${route.params.id}`)
        .then((res) => {
          actDetail.data = res.data;
          console.log(actDetail.data);
        })
        .catch((error) => {
          isError.value = true;
          //請後端做找不到的提示錯誤訊息：找不到此活動
          // actDetail.data["error_message"] = error.response.data.error_message;
          timer = setTimeout(() => {
            router.push({ path: "/activities" });
          }, 3000);
        });
    });

    onUnmounted(() => {
      clearTimeout(timer);
    });

    return { actDetail, isError };
  },
};
</script>
<template>
  <div id="actDetail">
    <div v-if="!isError">
      <h1 class="name">{{ actDetail.data.name }}</h1>
      <h4>
        開始時間：{{ actDetail.data.startTime }} 結束時間：{{
          actDetail.data.endTime
        }}
      </h4>
      <img :src="actDetail.data.img" alt="" />
      <div class="desc">
        <p>{{ actDetail.data.description }}</p>
      </div>
    </div>
    <h1 v-if="isError">找不到此活動{{ actDetail.data.error_message }}</h1>
  </div>
</template>

<style lang="scss" scoped>
#actDetail {
  width: 60vw;
  margin: 3rem 3rem;
  padding: 0 3rem;
}
</style>
