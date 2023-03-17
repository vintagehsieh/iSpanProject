<script>
import { computed } from "vue";
import { useStore } from 'vuex';
import { debounce } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';

export default {
  setup() {
    const store = useStore();

    store.dispatch('fetchSongDataAsync');
    store.dispatch('fetchAlbumDataAsync');
    store.dispatch('fetchPlaylistDataAsync');
    store.dispatch('fetchArtistDataAsync');
    store.dispatch('fetchCreatorDataAsync');

    const popularSongs = computed(() => {
      return store.getters.getPopSongs;
    });
    const popularAlbums = computed(() => {
      return store.getters.getPopAlbums;
    });
    const popularPlaylists = computed(() => {
      return store.getters.getPopPlaylists;
    });
    const popularArtists = computed(() => {
      return store.getters.getPopArtists;
    });
    const popularCreators = computed(() => {
      return store.getters.getPopCreators;
    });

    return {
      popularSongs,
      popularAlbums,
      popularPlaylists,
      popularArtists,
      popularCreators,
      modules: [Pagination],
    };
  },
  data() {
    return {
      isMain: true,
      showAllName: "",
      showAll: "顯示所有內容"
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    showAllPopSongs(popItems) {
      this.isMain = !this.isMain;
      this.showAllName = popItems.headerName;
    },
    returnMainPage() {
      this.isMain = !this.isMain;
    },
    setAlbum(albumId) {
      this.$store.dispatch('setAlbum', albumId);
    },
    setPlaylist(playlistId) {
      this.$store.dispatch('setPlaylist', playlistId);
    },
    setArtist(artistId) {
      this.$store.dispatch('setArtist', artistId);
    },
    setCreator(creatorId) {
      this.$store.dispatch('setCreator', creatorId);
    },
    setPopSongRowNumber() {
      this.$store.dispatch('increasePopSongRowNumber');
      this.$store.dispatch('fetchSongDataAsync');
    },
    setPopAlbumRowNumber() {
      this.$store.dispatch('setPopAlbumRowNumber', 2);
      this.$store.dispatch('fetchAlbumDataAsync');
    },
    handleScroll: debounce(async function () {
      const myDiv = document.getElementById('allPopular');
      const scrollPosition = myDiv.scrollTop;
      const divHeight = myDiv.clientHeight;
      const contentHeight = myDiv.scrollHeight;
      const distanceToBottom = contentHeight - (scrollPosition + divHeight);
      if (distanceToBottom < 800 && this.popularSongs.items.length < 50) {
        await this.$store.dispatch('increasePopSongRowNumber');
        await this.$store.dispatch('fetchSongDataAsync');
      }
    }, 100),
    slicePopulars(populars) {
      return Object.entries(populars.items).slice(0, 5).map(entry => entry[1]);
    }
  }
};
</script>

<template>
  <div class="container" v-show="isMain">
    <div class="announcement">
      <swiper :slidesPerView="1" :spaceBetween="10" :pagination="{
        clickable: true,
      }" :modules="modules" class="mySwiper">
        <swiper-slide v-for="album in popularAlbums.items">
          <img :src=album.albumCoverPath>
        </swiper-slide>
      </swiper>
    </div>
    <div class="trans">
      <div class="populars">
        <div class="box" id="popularSongs">
          <div class="contentHeader" id="popSongHeader">
            <span class="headerName">{{ popularSongs.headerName }}</span>
            <span class="showAll" @click="showAllPopSongs(popularSongs)" @click.once="setPopSongRowNumber()">{{ showAll
            }}</span>
          </div>
          <div class="content">
            <RouterLink class="link" v-for="song in slicePopulars(popularSongs)" :key="song.id" to="/album"
              @click="setAlbum(song.albumId)">
              <Card>
                <template #picture>
                  <img :src=song.songCoverPath alt="">
                </template>
                <template #name>
                  <h3>{{ song.songName }}</h3>
                </template>
                <template #desc>
                  <span v-for="artist in song.artistlist">{{ artist.artistName }}</span>
                </template>
              </Card>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="populars">
        <div class="box" id="popularAlbums">
          <div class="contentHeader" id="popAlbumHeader">
            <span class="headerName">{{ popularAlbums.headerName }}</span>
            <span class="showAll" @click="showAllPopSongs(popularAlbums)" @click.once="setPopAlbumRowNumber()">{{
              showAll }}</span>
          </div>
          <div class="content">
            <RouterLink class="link" v-for="album in slicePopulars(popularAlbums)" :key="album.id" to="/album"
              @click="setAlbum(album.id)">
              <Card>
                <template #picture>
                  <img :src=album.albumCoverPath alt="">
                </template>
                <template #name>
                  <h3>{{ album.albumName }}</h3>
                </template>
                <template #desc>
                  <p>{{ album.mainArtistName }}</p>
                  <p>{{ album.mainCreatorName }}</p>
                </template>
              </Card>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="populars">
        <div class="box" id="popularPlaylists">
          <div class="contentHeader" id="popPlaylistHeader">
            <span class="headerName">{{ popularPlaylists.headerName }}</span>
            <span class="showAll" @click="showAllPopSongs(popularPlaylists)">{{ showAll }}</span>
          </div>
          <div class="content">
            <RouterLink class="link" v-for="playlist in slicePopulars(popularPlaylists)" :key="playlist.id" to="/playlist"
              @click="setPlaylist(playlist.id)">
              <Card>
                <template #picture>
                  <img src="@/assets/music-note-icon-song-melody-tune-flat-symbol-free-vector.webp" alt=""
                    v-if='playlist.playlistCoverPath.length == 0'>
                  <img :src=playlist.playlistCoverPath alt="" v-else>
                </template>
                <template #name>
                  <h3>{{ playlist.listName }}</h3>
                </template>
                <template #desc>
                  <!-- <p>{{ playlist.mainArtistName[0] }}</p> -->
                </template>
              </Card>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="populars">
        <div class="box" id="popularArtists">
          <div class="contentHeader" id="popArtistHeader">
            <span class="headerName">{{ popularArtists.headerName }}</span>
            <span class="showAll" @click="showAllPopSongs(popularArtists)">{{ showAll }}</span>
          </div>
          <div class="content">
            <RouterLink class="link" v-for="artist in slicePopulars(popularArtists)" :key="artist.id" to="/artist"
              @click="setArtist(artist.id)">
              <Card>
                <template #picture>
                  <img :src=artist.artistPicPath alt="">
                </template>
                <template #name>
                  <h3>{{ artist.artistName }}</h3>
                </template>
              </Card>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="populars">
        <div class="box" id="popularCreators">
          <div class="contentHeader" id="popCreatorHeader">
            <span class="headerName">{{ popularCreators.headerName }}</span>
            <span class="showAll" @click="showAllPopSongs(popularCreators)">{{ showAll }}</span>
          </div>
          <div class="content">
            <RouterLink class="link" v-for="creator in slicePopulars(popularCreators)" :key="creator.id" to="/creator"
              @click="setCreator(creator.id)">
              <Card>
                <template #picture>
                  <img :src=creator.creatorPicPath alt="">
                </template>
                <template #name>
                  <h3>{{ creator.creatorName }}</h3>
                </template>
              </Card>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container" id="allPopular" v-show="!isMain" @scroll="handleScroll">
    <div class="header">
      <div class="returnBtn">
        <font-awesome-icon icon="fa-solid fa-angle-left" style="margin-right: 5px" />
        <span class="return" @click="returnMainPage()">返回</span>
      </div>
      <div class="headerName">
        <span>{{ showAllName }}</span>
      </div>
    </div>
    <div class="contentAll">
      <RouterLink class="link" v-show="showAllName == popularSongs.headerName" v-for="song in popularSongs.items"
        :key="song.id" to="/album" @click="setAlbum(song.albumId)">
        <Card>
          <template #picture>
            <img :src=song.songCoverPath alt="">
          </template>
          <template #name>
            <h3>{{ song.songName }}</h3>
          </template>
          <template #desc>
            <span v-for="artist in song.artistlist">{{ artist.artistName }}</span>
          </template>
        </Card>
      </RouterLink>
      <RouterLink class="link" v-show="showAllName == popularAlbums.headerName" v-for="album in popularAlbums.items"
        :key="album.id" to="/album" @click="setAlbum(album.id)">
        <Card>
          <template #picture>
            <img :src=album.albumCoverPath alt="">
          </template>
          <template #name>
            <h3>{{ album.albumName }}</h3>
          </template>
          <template #desc>
            <p>{{ album.mainArtistName }}</p>
          </template>
        </Card>
      </RouterLink>
      <RouterLink class="link" v-show="showAllName == popularPlaylists.headerName"
        v-for="playlist in popularPlaylists.items" :key="playlist.id" to="/playlist" @click="setPlaylist(playlist.id)">
        <Card>
          <template #picture>
            <img :src=playlist.playlistCoverPath alt="">
          </template>
          <template #name>
            <h3>{{ playlist.listName }}</h3>
          </template>
          <template #desc>
            <!-- <p>{{ playlist.mainArtistName[0] }}</p> -->
          </template>
        </Card>
      </RouterLink>
      <RouterLink class="link" v-show="showAllName == popularArtists.headerName" v-for="artist in popularArtists.items"
        :key="artist.id" to="/artist" @click="setArtist(artist.id)">
        <Card>
          <template #picture>
            <img :src=artist.artistPicPath alt="">
          </template>
          <template #name>
            <h3>{{ artist.artistName }}</h3>
          </template>
        </Card>
      </RouterLink>
      <RouterLink class="link" v-show="showAllName == popularCreators.headerName" v-for="creator in popularCreators.items"
        :key="creator.id" to="/creator" @click="setCreator(creator.id)">
        <Card>
          <template #picture>
            <img :src=creator.creatorPicPath alt="">
          </template>
          <template #name>
            <h3>{{ creator.creatorName }}</h3>
          </template>
        </Card>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 5rem 3rem 10rem 3rem;
  min-height: 100vh;
  color: white;
  background: linear-gradient(#ffa03a 0%, #202020 20%, #202020 100%);

  >.announcement {
    width: 80%;
    height: 15rem;
    margin: 0 auto 2rem auto;
    border-radius: 20px;
  }

  >.trans {
    >.populars {
      >.box {
        >.contentHeader {
          margin: 0 3rem;
          font-size: 30px;
          cursor: context-menu;
          display: flex;
          justify-content: space-between;
          align-items: center;

          >.showAll {
            right: 0;
            bottom: 0;
            font-size: 16px;
            padding: 5px 10px;
            border-radius: 5px;
            color: rgb(160, 160, 160);
            cursor: context-menu;

            &:hover {
              color: white;
              background-color: #383A3F;
            }
          }
        }

        >.content {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
      }
    }
  }

  >.header {
    >.returnBtn {
      width: 4rem;
      height: 2rem;
      border-radius: 5px;
      color: rgb(160, 160, 160);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: context-menu;

      &:hover {
        color: white;
        background-color: #383A3F;
      }
    }

    >.headerName {
      font-size: 40px;
    }
  }

  >.contentAll {
    padding-bottom: 3rem;
    height: auto;
    display: flex;
    flex-wrap: wrap;
  }
}

#allPopular {
  height: 100vh;
  max-height: 400px;
  overflow: scroll;
}

.slide-left-leave-active,
.slide-left-enter-active {
  transition: all .8s ease;
}

.slide-left-enter-from {
  transform: translateX(-100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-leave-active,
.slide-right-enter-active {
  transition: all .8s ease;
}

.slide-right-enter-from {
  transform: translateX(100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #ffffff00;
  border-radius: 10px;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
}
</style>
