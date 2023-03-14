
<template>
  <div>

    <a-form :model="album" layout="vertical" autocomplete="off">
      <div class="row">
        <div class="col-lg-6 col-12">
          <a-form-item label="專輯名稱" name="專輯名稱">
            <a-input v-model:value="album.AlbumName" />
          </a-form-item>
          <!-- <a-form-item label="上傳專輯封面" name="上傳專輯封面">
            <a-input id="CoverImage" type="file" accept="image/png, image/jpeg"
              @change="handleUploadCoverImage($event)" />
          </a-form-item> -->
          <a-form-item label="專輯種類" name="專輯種類">
            <a-select v-model:value="album.AlbumTypeId" :options="albumtypeList"></a-select>
          </a-form-item>
          <a-form-item label="專輯風格" name="專輯風格">
            <a-select v-model:value="album.AlbumGenreId" :options="albumgenreList"></a-select>
          </a-form-item>
          <a-form-item label="發行時間" name="發行時間">
            <a-date-picker format="YYYY/MM/DD" v-model:value="album.Released" class="w-100" />
          </a-form-item>
        </div>
        <div class="col-lg-6 col-12">
          <a-form-item label="專輯描述" name="專輯描述">
            <a-textarea v-model:value="album.Description" :auto-size="{ minRows: 5, maxRows: 5 }" />
          </a-form-item>
          <div class="hstack">
            <span>收錄歌曲</span>
            <span class="ms-auto">{{ album.SongList.length + ' / ' + prop.SongList.length }}</span>
          </div>
          <div class="overflow-auto vstack gap-2 invisible-scrollbar mt-2" style="height:200px">
            <div v-for="song in prop.SongList" :key="song.Id" class="hstack gap-3 p-1 rounded " @click="selectsong(song.Id)"
              :style="album.SongList.includes(song.Id) ? 'background-color:#0dcaf00f' : ''">
              <div>
                <div class="fs-7 fw-bold">{{ song.SongName }}</div>
                <div class="fs-7 text-secondary">{{ song.SongWriter }}</div>
              </div>
              <div class="ms-auto">
                <span v-if="album.SongList.includes(song.Id)" class="bi-check-square"></span>
                <span v-else class="bi-square"></span>

              </div>

            </div>
          </div>
        </div>
      </div>
    </a-form>
    <div class="hstack gap-1 justify-content-center">
      <a-button type="default" @click="emit('close')" class="w-25" :loading="submit_load">Close</a-button>
      <a-popconfirm title="確定要儲存變更嗎" ok-text="確定" cancel-text="取消" @confirm="editalbum">
        <a-button type="primary" class="w-25" :loading="submit_load">Save Change</a-button>
      </a-popconfirm>

    </div>

  </div>
</template>
<script setup>
import { computed, ref, reactive, onMounted, defineProps, defineEmits } from 'vue';
import 'ant-design-vue/dist/antd.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import Cookies from "js-cookie";

import axios from "axios";
const editmode = ref(false);
const prop = defineProps({
  Album: {
    type: Object,
    required: true,
  },
  CreateID: {
    type: Number,
    required: true,
  },
  SongList: {
    type: Array,
    required: true,
  }

});
const emit = defineEmits(['close']);

const album = ref({

AlbumName: "test",
AlbumTypeId: null,
AlbumGenreId: null,
Released: new dayjs(),
Description: "test",
Cover: null,
SongList: [],
});

onMounted(() => {
  album.value = prop.Album;
  album.value.Released = dayjs(album.value.Released);
})

const UserID = ref(null);
onMounted(() => {
  const id = Cookies.get("UserID");
  if (id) { UserID.value = id; }
  getAlbumGenreList();
  getAlbumTypeList();
})
const albumgenreList = ref([]);
const getAlbumGenreList = () => {
  axios.get(`https://localhost:7043/Songs/SongGenres`, {
    withCredentials: true
  })
    .then((res) => {
      albumgenreList.value = res.data.map((x) => { return { label: x.genreName, value: x.id } });
      if (albumgenreList.value && albumgenreList.value.length > 0) {
        album.value.AlbumGenreId = albumgenreList.value[0].value;
      }
    })
    .catch((err) => {
      console.log(err.response.data.errors);
    }).finally(() => {
    });
}
const albumtypeList = ref([]);
const getAlbumTypeList = async () => {
  await axios.get(`https://localhost:7043/Albums/AlbumTypes`, {
    withCredentials: true,
  })
    .then((res) => {

      albumtypeList.value = res.data.map(x => { return { label: x.typeName, value: x.id } });
      if (albumtypeList.value && albumtypeList.value.length > 0) {
        album.value.AlbumTypeId = albumtypeList.value[0].value;
      }
    })
    .catch((err) => {
      console.log(err.response.data.errors);
    });
};

const submit_load = ref(false);
const editalbum = () => {
  submit_load.value = true;
  // let formData = new FormData();
  // formData.append('creatorId', prop.CreateID);
  // formData.append('songId', song.value.id);

  // Object.keys(song.value).forEach((x) => {
  //   formData.append(x, song.value[x]);
  // });

  const senddata = {
    id: album.value.Id,
    AlbumName: album.value.AlbumName,
    AlbumTypeId: album.value.AlbumTypeId,
    AlbumGenreId: album.value.AlbumGenreId,
    Description: album.value.Description,
    SongList: album.value.SongList,
    Released: dayjs(album.value.Released).toDate(),
  }


  console.log(senddata);
  // song.value.Released = dayjs(song.Released).format('YYYY/MM/DD');
   axios.put(`https://localhost:7043/Creators/${prop.CreateID}/albums/${album.value.Id}`, senddata, {
    withCredentials: true,
  })
    .then((res) => {
      alert(res.data);
    //  emit('close');
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      submit_load.value = false;
    });
}

const selectsong = (id) => {
  let index = album.value.SongList.findIndex(x => x === id);
  if (index !== -1) {
    album.value.SongList.splice(index, 1);
  } else {
    album.value.SongList.push(id);
  }
}

</script>
<style>
.invisible-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>