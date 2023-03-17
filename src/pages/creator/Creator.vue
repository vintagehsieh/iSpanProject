
<template>
  <a-layout class="px-5 py-3">
    <a-layout-content>
      <div>
        <div class="width-navbar-dark position-relative work-page-header-wrapper mb-3" id="inside_box">
          <div class="blur-cover-block">
            <img :src="
              creator?.creatorCover ??
              'https://localhost:44373/Uploads/Covers/puppy.jpg'
            " alt="Anti-social" class="blur-cover" />
          </div>
          <div class="container blur-cover-block-up">
            <div class="row justify-content-center">
              <div class="col-md-4">
                <div class="border-block p-1 m-3">
                  <div class="cover-block">
                    <img :src="
                      creator?.creatorPic ??
                      'https://localhost:44373/Uploads/Covers/puppy.jpg'
                    " width="400" height="400" style="display: block; margin: auto" @click="infoclick" />
                  </div>
                </div>
              </div>
              <div class="col-md-4 work-page-header-wrapper-right p-4">
                <h1 class="text-white" style="font-size: 100px">
                  {{ creator.creatorName }}
                </h1>
                <h3 class="text-truncate text-white opacity-72">
                  {{ creator.creatorAbout }}
                </h3>
                <ul class="list-inline text-white opacity-72 text-white mt-5">
                  <li class="list-inline-item mr-5">
                    <h4 class="font-weight-normal text-secondary">音樂</h4>
                    <div class="mb-0 fs-1 fw-bolder text-secondary">
                      {{ songs.length }}
                    </div>
                  </li>
                  <li class="list-inline-item">
                    <h4 class="font-weight-normal text-secondary">專輯</h4>
                    <div class="mb-0 fs-1 fw-bolder text-secondary">
                      {{ albums.length }}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row gap-3 px-3">
        <div class="col bg-white rounded p-3">
          <div class="hstack gap-3 mb-1">
            <div class="fs-3 fw-bold">音樂</div>
            <span class="fs-4 ms-auto bi-plus-lg" @click="addsong"></span>
          </div>
          <div class="overflow-auto invisible-scrollbar" style="height: 410px">
            <a-spin v-if="getSongs_load" class="w-100 h-100 align-items-center d-flex justify-content-center"
              style="height: 430px" />
            <div v-else class="vstack gap-3">
              <div v-for="song in songs" :key="song.Id"
                class="hstack align-items-center gap-3 p-3 songitme rounded border" role="button"
                @click="songclick(song)">
                <a-image :width="64" :src="'data:image/png;base64,' + song?.Cover"
                  fallback="data:image/png;base64,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" />
                <div>
                  <div class="fw-bold">{{ song.SongName }}</div>
                  <div class="text-secondary">{{ song.SongWriter }}</div>
                </div>
                <span class="ms-auto bi-x-lg text-danger" role="button" @click.stop="confirmdeleteSong(song)"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="col bg-white rounded p-3">
          <div class="hstack gap-3 mb-1">
            <div class="fs-3 fw-bold">專輯</div>
            <span class="fs-4 ms-auto bi-plus-lg" @click="addalbum"></span>
          </div>
          <div class="overflow-auto invisible-scrollbar" style="height: 410px">
            <a-spin v-if="getSongs_load" class="w-100 h-100 align-items-center d-flex justify-content-center"
              style="height: 430px" />
            <div v-else class="vstack gap-3">
              <div v-for="album in albums" :key="album.Id"
                class="hstack align-items-center gap-3 p-3 songitme rounded border" role="button"
                @click="albumclick(album)">
                <a-image :width="64" :src="'data:image/png;base64,' + album?.Cover"
                  fallback="data:image/png;base64,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" />
                <div>
                  <div class="fw-bold">{{ album.AlbumName }}</div>
                  <div class="text-secondary">{{ album.AlbumGenreName }}</div>
                </div>

                <span class="ms-auto bi-x-lg text-danger" role="button" @click.stop="confirmdeleteAlbum(album)"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a-modal v-model:visible="deletesongconfirm_visible" title="刪除歌曲" ok-text="確認" cancel-text="取消" @ok="deleteSong()">
        <p>
          確定要刪除歌曲:
          <span class="text-danger">{{ deletesongobject?.SongName }}</span> 嗎?
        </p>
      </a-modal>

      <a-modal v-model:visible="deletealbumconfirm_visible" title="刪除專輯" ok-text="確認" cancel-text="取消"
        @ok="deleteAlbum()">
        <p>
          確定要刪除專輯:
          <span class="text-danger">{{ deletealbumobject?.AlbumName }}</span>
          嗎?
        </p>
      </a-modal>

      <a-modal width="1200px" v-model:visible="addsongvisible" :footer="null" :afterClose="getSongs" destroyOnClose>
        <template #title>
          <div class="fw-bolder fs-4">新增音樂</div>
        </template>
        <AddSong :ID="creator.id" @close="addsongvisible = false" :AlbumList="
          albums.map((x) => {
            return { value: x.Id, label: x.AlbumName };
          })
        "></AddSong>
      </a-modal>
      <a-modal width="1200px" v-model:visible="songdetialvisible" :footer="null" :afterClose="getSongs" destroyOnClose>
        <template #title>
          <div class="fw-bolder fs-4">音樂資訊</div>
        </template>
        <SongDetail :Song="selectedsong" :CreateID="creator.id" @close="songdetialvisible = false"></SongDetail>
      </a-modal>

      <a-modal width="1200px" v-model:visible="addalbumvisible" :footer="null" :afterClose="getAlbums" destroyOnClose>
        <template #title>
          <div class="fw-bolder fs-4">新增專輯</div>
        </template>
        <AddAlbum :ID="creator.id" :SongList="
          songs.map((x) => {
            return {
              Id: x.Id,
              SongName: x.SongName,
              SongWriter: x.SongWriter,
            };
          })
        " @close="addalbumvisible = false"></AddAlbum>
      </a-modal>
      <a-modal width="1200px" v-model:visible="albumdetialvisible" :footer="null" :afterClose="getAlbums" destroyOnClose>
        <template #title>
          <div class="fw-bolder fs-4">專輯資訊</div>
        </template>
        <AlbumDetail :SongList="
          songs.map((x) => {
            return {
              Id: x.Id,
              SongName: x.SongName,
              SongWriter: x.SongWriter,
            };
          })
        " :Album="selectedalbum" :CreateID="creator.id" @close="albumdetialvisible = false"></AlbumDetail>
      </a-modal>

      <a-modal width="1200px" v-model:visible="editinfovisible" :footer="null" :afterClose="getAlbums" destroyOnClose>
        <template #title>
          <div class="fw-bolder fs-4">編輯個人資料</div>
        </template>
        <a-form :model="editdata" name="basic" layout="vertical" autocomplete="off" id="creatorform">
          <div class="row">
            <div class="col-lg-6 col-12">
              <a-form-item label="暱稱" name="暱稱">
                <a-input name="CreatorName" v-model:value="creator.creatorName" />
              </a-form-item>
              <a-form-item label="自我介紹" name="自我介紹">
                <a-textarea name="CreatorAbout" v-model:value="creator.creatorAbout"
                  :auto-size="{ minRows: 32, maxRows: 32 }" />
              </a-form-item>
              <a-form-item label="上傳個人背景" name="上傳個人背景">
                <a-input id="CoverImage" name="Cover" type="file" accept="image/png, image/jpeg, image/jpg"
                  @change="handleUploadCoverImage($event)" />
              </a-form-item>
              <a-form-item label="上傳個人頭貼" name="上傳個人頭貼">
                <a-input id="PicImage" name="Pic" type="file" accept="image/png, image/jpeg, image/jpg"
                  @change="handleUploadPicImage($event)" />
              </a-form-item>
            </div>
          </div>
        </a-form>
        <a-button type="primary" @click="editinfoclick" class="w-100" :loading="editsubmit_load">Submit</a-button>
      </a-modal>
    </a-layout-content>
  </a-layout>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import "ant-design-vue/dist/antd.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Cookies from "js-cookie";
import axios from "axios";
import AddSong from "./AddSong.vue";
import SongDetail from "./SongDetail.vue";
import AddAlbum from "./AddAlbum.vue";
import AlbumDetail from "./AlbumDetail.vue";

//const store = useStore();
const creator = ref({
  id: "",
  creatorAbout: "",
  creatorCoverPath: "",
  creatorName: "",
  creatorPicPath: "",
  totalFollows: "",
});
const UserID = ref(null);

onMounted(() => {
  getUserInfo().then(() => {
    getSongs();
    getAlbums();
  });
});

const getUserInfo = async () => {
  await axios
    .get(`https://localhost:7043/Creators/CreatorPage`, {
      withCredentials: true,
    })
    .then((res) => {
      creator.value = res.data;
    })
    .catch((err) => {
      console.log(err.response.data.errors);
    });
};

const songs = ref([]);
const getSongs_load = ref(false);
const getSongs = () => {
  getSongs_load.value = true;
  axios
    .get(`https://localhost:7043/Creators/${creator.value.id}/songs`, {
      withCredentials: true,
    })
    .then((res) => {
      songs.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      getSongs_load.value = false;
    });
};
const albums = ref([]);
const getAlbums = () => {
  axios
    .get(`https://localhost:7043/Creators/${creator.value.id}/albums`, {
      withCredentials: true,
    })
    .then((res) => {
      albums.value = res.data;
    })
    .catch((err) => {
      console.log(err.response.data.errors);
    });
};

const addsongvisible = ref(false);
const addsong = () => {
  addsongvisible.value = true;
};

const songdetialvisible = ref(false);
const selectedsong = ref({});
const songclick = (song) => {
  selectedsong.value = song;
  songdetialvisible.value = true;
};

const deletesongobject = ref(null);
const deletesongconfirm_visible = ref(false);
const confirmdeleteSong = (song) => {
  deletesongconfirm_visible.value = true;
  deletesongobject.value = song;
};

const deleteSong_load = ref(false);
const deleteSong = () => {
  deleteSong_load.value = true;
  const senddata = {
    createId: creator.value.id,
    songId: deletesongobject.value.Id,
  };
  axios
    .post(
      `https://localhost:7043/Creators/${creator.value.id}/song_creator_Metadata/${deletesongobject.value.Id}`,
      senddata,
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      alert(res.data);
      getSongs();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      deleteSong_load.value = false;
      deletesongobject.value = null;
      deletesongconfirm_visible.value = false;
    });
};

//Album
const addalbumvisible = ref(false);
const addalbum = () => {
  addalbumvisible.value = true;
};

const albumdetialvisible = ref(false);
const selectedalbum = ref({});
const albumclick = (album) => {
  selectedalbum.value = album;
  albumdetialvisible.value = true;
};

const deletealbumobject = ref(null);
const deletealbumconfirm_visible = ref(false);
const confirmdeleteAlbum = (album) => {
  deletealbumconfirm_visible.value = true;
  deletealbumobject.value = album;
};

const deletealbum_load = ref(false);
const deleteAlbum = () => {
  deletealbum_load.value = true;
  const senddata = {
    createId: creator.value.id,
    albumId: deletealbumobject.value.Id,
  };
  axios
    .post(
      `https://localhost:7043/Creators/${creator.value.id}/deletealbum/${deletealbumobject.value.Id}`,
      senddata,
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      alert(res.data);
      getAlbums();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      deletealbum_load.value = false;
      deletealbumconfirm_visible.value = false;
      deletealbumobject.value = null;
    });
};

const editinfovisible = ref(false);
const infoclick = () => {
  editinfovisible.value = true;
};
const editsubmit_load = ref(false);

const editinfoclick = async () => {
  editinfovisible.value = false;
  var form = document.querySelector("#creatorform");
  // console.log(form)
  const senddata = new FormData(form);

  await fetch(`https://localhost:7043/Creators/CreatorPage`, {
    method: "PUT",
    headers: {
      //  'Content-Type': 'multipart/form-data',
      Accept: "*/*",
    },
    body: senddata,
    credentials: "include",
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  getUserInfo();
};

const handleUploadCoverImage = (event) => {
  const file = event.target.files[0];
  if (!file.type.startsWith("image/")) {
    alert("只能上傳圖片檔案");
    document.getElementById("CoverImage").value = null;
  } else {
    creator.value.creatorCoverPath = event.target.files[0];
  }
};
const handleUploadPicImage = (event) => {
  const file = event.target.files[0];
  if (!file.type.startsWith("image/")) {
    alert("只能上傳圖片檔案");
    document.getElementById("PicImage").value = null;
  } else {
    creator.value.creatorPicPath = event.target.files[0];
  }
};
</script>
<style>
.invisible-scrollbar::-webkit-scrollbar {
  display: none;
}

.songitme:hover {
  background-color: #8186910e;
}

.blur-cover-block {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
  background-color: #000;
}

.blur-cover-block-up {
  position: relative;
  z-index: 2;
  padding: 2rem 5rem 0 5rem;
}

.work-page-header-wrapper .border-block {
  background-color: #fff;
  border-color: #e4e4e4;
}

.border-block {
  display: block;
  background-color: #fff;
  border: 1px solid #e4e4e4;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 15rem;
  border-radius: 0.4rem;
  word-wrap: break-word;
}

.cover-block {
  overflow: hidden;
  display: block;
  position: relative;
  height: 0;
  padding: 0;
  padding-bottom: 100%;
  border-radius: 0.4rem;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.15s ease-in-out;
}

.blur-cover-block .blur-cover {
  transform: translate3d(-50%, -50%, 0);
  -webkit-filter: blur(15px);
  -moz-filter: blur(15px);
  -ms-filter: blur(15px);
  filter: blur(15px);
  opacity: 0.5;
  top: 50%;
  left: 50%;
  width: 100%;
  position: absolute;
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  padding: 20px;
}
</style>