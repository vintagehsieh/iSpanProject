
<template>
  <!-- {{ prop.ID + ":" + typeof (prop.ID) }} -->
  <div>
    <a-form :model="album" layout="vertical" autocomplete="off">
      <div class="row">
        <div class="col-lg-6 col-12">
          <a-form-item label="專輯名稱" name="專輯名稱">
            <a-input v-model:value="album.AlbumName" />
          </a-form-item>
          <a-form-item label="上傳專輯封面" name="上傳專輯封面">
            <a-input id="CoverImage" type="file" accept="image/png, image/jpeg"
              @change="handleUploadCoverImage($event)" />
          </a-form-item>
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
            <span class="ms-auto">{{ album.SongList.length + ' / ' + SongList.length }}</span>
          </div>
          <div class="overflow-auto vstack gap-2 invisible-scrollbar mt-2" style="height:200px">
            <div v-for="song in SongList" :key="song.Id" class="hstack gap-3 p-1 rounded " @click="selectsong(song.Id)"
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
    <a-button type="primary" @click="addalbum" class="w-100" :loading="submit_load">Submit</a-button>
  </div>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import 'ant-design-vue/dist/antd.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import axios from "axios";
import { faCropSimple } from '@fortawesome/free-solid-svg-icons';
const prop = defineProps({
  ID: {
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

const handleUploadCoverImage = (event) => {
  const file = event.target.files[0];
  if (!file.type.startsWith('image/')) {
    alert('只能上傳圖片檔案')
    document.getElementById('CoverImage').value = null;
  } else {
    album.value.Cover = event.target.files[0];
  }

}



onMounted(() => {
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
const addalbum = () => {
  submit_load.value = true;
  if (!album.value.Cover) {
   alert("請上傳專輯封面");
   submit_load.value = false;
   return;
  }
  if(!album.value.SongList || album.value.SongList.length===0){
    alert("請至少選擇一首歌曲加入此專輯");
   submit_load.value = false;
   return;
  }
  console.log(album.value.SongList)
  let formData = new FormData();

  formData.append('creatorId', Number(prop.ID));

  Object.keys(album.value).forEach((x) => {
    if (x === 'Released') {
      formData.append(x, new dayjs(album.value[x]).format('YYYY/MM/DD'));
    }  else {
      formData.append(x, album.value[x]);
    }

  });

  axios.post(`https://localhost:7043/Creators/${prop.ID}/albums`, formData, {
    withCredentials: true,
  })
    .then((res) => {
      alert(res.data);
      emit('close');
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