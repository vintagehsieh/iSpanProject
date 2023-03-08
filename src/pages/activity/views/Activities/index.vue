<script>
import { ref, reactive, onMounted, computed, watchEffect, nextTick } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import emitter from "@/mitt";

export default {
  setup() {
    const activities = reactive({ data: [] });
    const router = useRouter();
    const more = ref("");
    const isOpen = ref(false);

    const goToActivities = (id) => {
      router.push(`/activities/${id}`);
    };

    const openNewTab = (id) => {
      const routeData = router.resolve({ path: `/activities/${id}` });
      window.open(routeData.href, "_blank");
    };

    const truncatedText = (index) => {
      const text = activities.data[index].description;
      if (text.length > 200) {
        return `${text.substring(
          0,
          200
        )}... \n <div class="more" style="display:inline-block; float:right;"><a href="#">( 繼續閱讀 )</a><div>`;
      }
      return text;
    };

    onMounted(() => {
      axios
        .get("http://localhost:3000/activities")
        .then((res) => {
          activities.data = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      // nextTick(() => {
      //   more.value.style.textAlign = "right";
      // });
      emitter.on("isOpenMitt", (value) => {
        isOpen.value = value.value;
      });
    });

    return {
      activities,
      more,
      isOpen,
      truncatedText,
      goToActivities,
      openNewTab,
    };
  },
};
</script>
<template>
  <div id="activities">
    <router-link
      :to="`/activities/${item.id}`"
      :class="['card', { open: isOpen }]"
      v-for="(item, index) in activities.data"
      :key="item.id"
      @click.left="goToActivities(item.id)"
      @click.middle="openNewTab(item.id)"
    >
      <div class="content">
        <div class="title">
          <h1 class="name">{{ item.name }}</h1>
          <p class="time">
            開始時間：{{ item.startTime }} <br />
            結束時間：{{ item.endTime }}
          </p>
        </div>
        <img :src="item.img" alt="" />
        <div class="desc" v-html="truncatedText(index)"></div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
#activities {
  display: flex;
  flex-direction: column;
  background-color: black;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
}
a.card {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 66vw;
  height: auto;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.2);
  margin-bottom: 20px;
  opacity: 0.7;
  transition: opacity 0.2s;
  background-color: rgb(231, 231, 231);
  &:hover {
    opacity: 1;
  }
  &.open {
    width: 60vw;
  }
  .content {
    margin: 25px;
    > .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 5px;

      > .name {
        font-size: 24px;
      }
      > .time {
        font-size: 14px;
      }
    }
    > img {
      border-radius: 25px;
      width: 100%;
      padding: 15px 0;
    }
    > .desc {
      padding: 0 5px;
      line-height: 2.5rem;
      text-align: justify;
    }
  }
}
</style>
