
<template>
  <div>
    <a-form :model="song" name="basic" layout="vertical" autocomplete="off">
      <div class="row">
        <div class="col-lg-6 col-12">
          <a-form-item label="歌名" name="歌名">
            <a-input v-model:value="song.SongName" />
          </a-form-item>
          <a-form-item label="專輯名稱" name="專輯名稱">
            <a-select
              v-model:value="song.AlbumId"
              :options="prop.AlbumList"
            ></a-select>
          </a-form-item>
          <a-form-item label="風格" name="風格">
            <a-select
              v-model:value="song.GenreId"
              :options="genreList"
            ></a-select>
          </a-form-item>
          <a-form-item label="上傳歌曲封面" name="上傳歌曲封面">
            <a-input
              id="CoverImage"
              type="file"
              accept="image/png, image/jpeg"
              @change="handleUploadCoverImage($event)"
            />
          </a-form-item>
          <a-form-item label="上傳歌曲檔案" name="上傳歌曲檔案">
            <a-input
              id="UploadSong"
              type="file"
              accept=".mp3, .wav, .ogg"
              @change="handleUploadSong($event)"
            />
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
            <a-date-picker
              format="YYYY/MM/DD"
              v-model:value="song.Released"
              class="w-100"
            />
          </a-form-item>
          <a-form-item label="上架狀態" name="上架狀態">
            <a-switch
              v-model:checked="song.Status"
              checked-children="上架"
              un-checked-children="下架"
            />
          </a-form-item>
        </div>
        <div class="col-lg-6 col-12">
          <a-form-item label="作詞/作曲" name="作詞/作曲">
            <a-input v-model:value="song.SongWriter" />
          </a-form-item>
          <a-form-item label="歌詞" name="歌詞">
            <a-textarea
              v-model:value="song.Lyric"
              :auto-size="{ minRows: 32, maxRows: 32 }"
            />
          </a-form-item>
        </div>
      </div>
    </a-form>
    <a-button
      type="primary"
      @click="addsong"
      class="w-100"
      :loading="submit_load"
      >Submit</a-button
    >
  </div>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import "ant-design-vue/dist/antd.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

import axios from "axios";
const prop = defineProps({
  ID: {
    type: Number,
    required: true,
  },
  AlbumList: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["close"]);

const song = ref({
  SongName: "",
  GenreId: null,
  //GenreName: 1,
  Duration: 0,
  IsInstrumental: false,
  Language: "",
  IsExplicit: false,
  Released: new dayjs(),
  SongWriter: "",
  Lyric: "",
  //SongCoverPath: "",
  //SongPath: "",
  Status: false,
  AlbumId: "",
  // AlbumId: null,
  SongList: null,
  Cover: null,
});

const handleUploadCoverImage = (event) => {
  const file = event.target.files[0];
  if (!file.type.startsWith("image/")) {
    alert("只能上傳圖片檔案");
    document.getElementById("CoverImage").value = null;
  } else {
    song.value.Cover = event.target.files[0];
  }
};
const handleUploadSong = (event) => {
  const file = event.target.files[0];
  if (!file.type.startsWith("audio/")) {
    alert("只能上傳音樂檔案");
    document.getElementById("UploadSong").value = null;
  } else {
    song.value.Song = event.target.files[0];
  }
  console.log(song.value.Song);
};

const genreList = ref([]);
onMounted(() => {
  getGenreList();
  // getAlbums();
});
const getGenreList = () => {
  axios
    .get(`https://localhost:7043/Songs/SongGenres`, {
      withCredentials: true,
    })
    .then((res) => {
      genreList.value = res.data.map((x) => {
        return { label: x.genreName, value: x.id };
      });
      if (genreList.value && genreList.value.length > 0) {
        song.value.GenreId = genreList.value[0].value;
      }
    })
    .catch((err) => {
      console.log(err.response.data.errors);
    })
    .finally(() => {});
};
// const albums = ref([]);
// const getAlbums = async () => {
//   await axios.get(`https://localhost:7043/Creators/${prop.ID}/albums`, {
//     withCredentials: true,
//   })
//     .then((res) => {
//       console.log('getAlbums', res.data);
//       albums.value = res.data.map(x => { return { label: x.AlbumName, value: x.Id } });
//     })
//     .catch((err) => {
//       console.log(err.response.data.errors);
//     });
// };

const submit_load = ref(false);
const addsong = () => {
  submit_load.value = true;
  let formData = new FormData();
  formData.append("creatorId", prop.ID);
  console.log(formData);

  Object.keys(song.value).forEach((x) => {
    formData.append(x, song.value[x]);
  });
  axios
    .post(`https://localhost:7043/Creators/${prop.ID}/song`, formData, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      alert(res.data);
      emit("close");
    })
    .catch((err) => {
      console.log(err.response.data.errors);
    })
    .finally(() => {
      submit_load.value = false;
    });
};
</script>
<style></style>