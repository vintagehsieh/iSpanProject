
<template>
  <div>
    <a-form :model="song" name="basic" layout="vertical" autocomplete="off">
      <div class="row">
        <div class="col-lg-6 col-12">
          <a-form-item label="歌名" name="歌名">
            <a-input v-model:value="song.SongName" />
          </a-form-item>
          <a-form-item label="專輯名稱" name="專輯名稱">
            <a-select v-model:value="song.AlbumId" :options="albums"></a-select>
          </a-form-item>
          <a-form-item label="風格" name="風格">
            <a-select v-model:value="song.GenreId" :options="genreList"></a-select>
          </a-form-item>
            <a-form-item label="是否為純音樂" name="是否為純音樂">
            <a-radio-group v-model:value="song.IsInstrumental">
              <a-radio :value="true">是</a-radio>
              <a-radio :value="false">否</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="語言" name="語言">
            <a-input v-model:value="song.Language" />
          </a-form-item>
          <a-form-item label="是否有敏感字詞" name="是否有敏感字詞">
            <a-radio-group v-model:value="song.IsExplicit">
              <a-radio :value="true">是</a-radio>
              <a-radio :value="false">否</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="發布時間" name="發布時間">
            <a-date-picker format="YYYY/MM/DD" v-model:value="song.Released" class="w-100" />
          </a-form-item>
          <a-form-item label="上架狀態" name="上架狀態">
            <a-switch v-model:checked="song.Status" checked-children="上架" un-checked-children="下架" />
          </a-form-item>
        </div>
        <div class="col-lg-6 col-12">
          <a-form-item label="作詞/作曲" name="作詞/作曲">
            <a-input v-model:value="song.SongWriter" />
          </a-form-item>
          <a-form-item label="歌詞" name="歌詞">
            <a-textarea v-model:value="song.Lyric" :auto-size="{ minRows: 25, maxRows: 25 }" />
          </a-form-item>
        </div>
      </div>
    </a-form>
    <div class="hstack gap-1 justify-content-center">
      <a-button type="default" @click="emit('close')" class="w-25" :loading="submit_load">Close</a-button>
      <a-popconfirm title="確定要儲存變更嗎" ok-text="確定" cancel-text="取消" @confirm="editsong">
        <a-button type="primary" class="w-25" :loading="submit_load">Save Change</a-button>
      </a-popconfirm>
    </div>
  </div>
</template>
<script setup>
import {  ref, onMounted, defineProps, defineEmits } from 'vue';
import 'ant-design-vue/dist/antd.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import Cookies from "js-cookie";

import axios from "axios";
const editmode = ref(false);
const prop = defineProps({
  Song: {
    type: Object,
    required: true,
  },
  CreateID: {
    type: Number,
    required: true,
  }
});
const emit = defineEmits(['close']);

onMounted(() => {
  song.value = prop.Song;
  song.value.Released = dayjs(song.value.Released);
})

const song = ref({

  SongName: "test",
  GenreId: "",
  GenreName: 1,
  Duration: 0,
  IsInstrumental: 1,
  Language: "test",
  IsExplicit: 1,
  Released: "",
  SongWriter: "",
  Lyric: "test",
  //SongCoverPath: "",
  //SongPath: "",
  Status: true,
  //AlbumId : "",
  AlbumId: null,
  Song: null,
  Cover: null,

});

const UserID = ref(null);
const genreList = ref([]);
onMounted(() => {
  const id = Cookies.get("UserID");
  if (id) { UserID.value = id; }
  getGenreList();
  getAlbums();
})
const getGenreList = () => {
  axios.get(`https://localhost:7043/Songs/SongGenres`, {
    withCredentials: true
  })
    .then((res) => {
      genreList.value = res.data.map((x) => { return { label: x.genreName, value: x.id } });
    })
    .catch((err) => {
      console.log(err.response.data.errors);
    }).finally(() => {
    });
}
const albums = ref([]);
const getAlbums = async () => {
  await axios.get(`https://localhost:7043/Creators/${prop.CreateID}/albums`, {
    withCredentials: true,
  })
    .then((res) => {
      console.log('getAlbums', res.data);
      albums.value = res.data.map(x => { return { label: x.AlbumName, value: x.Id } });
    })
    .catch((err) => {
      console.log(err.response.data.errors);
    });
};
const submit_load = ref(false);
const editsong = () => {
  submit_load.value = true;

  const senddata = {
    id: song.value.Id,
    SongName: song.value.SongName,
    GenreId: song.value.GenreId,
    Duration: song.value.Duration,
    IsInstrumental: song.value.IsInstrumental,
    Language: song.value.Language,
    IsExplicit: song.value.IsExplicit,
    Released: dayjs(song.value.Released).toDate(),
    SongWriter: song.value.SongWriter,
    Lyric: song.value.Lyric,
    Status: song.value.Status,
    AlbumId: song.value.AlbumId
  }
   axios.put(`https://localhost:7043/Creators/${prop.CreateID}/songs/${song.value.Id}`, senddata, {
    withCredentials: true,
  })
    .then((res) => {
      alert(res.data);
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      submit_load.value = false;
    });
}


</script>
<style></style>