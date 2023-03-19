<script>
import { ref, reactive, onMounted, computed, watchEffect } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import emitter from "@/mitt";
import { useStore } from "vuex";

export default {
  setup() {
    const activities = reactive({ data: [] });
    const router = useRouter();
    const store = useStore();
    const isOpen = ref(false);

    const searchResults = computed(() => {
      return store.getters.getSearchResults;
    });

    const displayActivities = computed(() => {
      if (searchResults.value.length > 0) {
        return store.getters.getSearchResults;
      } else {
        return activities.data;
      }
    });

    const goToActivities = (id) => {
      router.push(`/activities/single/${id}`);
    };

    const openNewTab = (id) => {
      const routeData = router.resolve({
        path: `/activities/single/${id}`,
      });
      window.open(routeData.href, "_blank");
    };

    const truncatedText = (index) => {
      const text = activities.data[index].activityInfo;
      if (text.length > 200) {
        return `${text.substring(
          0,
          200
        )}... \n <div class="more" style="display:inline-block; float:right;text-decoration:none;"><a href="#" style="display:inline-block; float:right;text-decoration:none;color: #f68657;">( 繼續閱讀 )</a><div>`;
      }
      return text;
    };

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
        .get("https://localhost:7043/Activities", {
          withCredentials: true,
        })
        .then((res) => {
          activities.data = res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      emitter.on("isOpenMitt", (value) => {
        isOpen.value = value.value;
      });

      emitter.on("searchInputChange", (searchWord) => {
        store.dispatch("searchActivities", {
          ActivityName: searchWord,
          ActivityLocation: searchWord,
          ActivityTypeName: searchWord,
        });
      });
    });

    return {
      activities,
      isOpen,
      truncatedText,
      goToActivities,
      openNewTab,
      formatDate,
      displayActivities,
    };
  },
};
</script>

<template>
  <div id="activities">
    <router-link
      :to="`/activities/single/${item.id}`"
      :class="['card', { open: isOpen }]"
      v-for="(item, index) in displayActivities"
      :key="item.id"
      @click.left="goToActivities(item.id)"
      @click.middle="openNewTab(item.id)"
    >
      <div class="content">
        <div class="title">
          <h1 class="name">{{ item.activityName }}</h1>
          <p class="time">
            開始時間：{{ formatDate(item.activityStartTime) }}
            <br />
            結束時間：{{ formatDate(item.activityEndTime) }}
          </p>
        </div>
        <img :src="item.activityImagePath" alt="" />
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
  margin-top: 6rem;
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
  color: black;
  text-decoration: none;
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
        font-weight: 700;
      }
      > .time {
        font-size: 14px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.5);
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
      .more {
        color: #f68657;
        &:hover {
          color: #f68657;
        }
      }
    }
  }
}
</style>
