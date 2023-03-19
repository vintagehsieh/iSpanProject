<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { onMounted, ref, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Cookies from "js-cookie";
import axios from "axios";

export default {
  components: {
    Header,
    Footer,
  },
  setup() {
    const isLogin = ref(false);
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {

      const isLoginLocalStorage = localStorage.getItem("isLogin");
      if (isLoginLocalStorage) {
        isLogin.value = true;
      } else {
        isLogin.value = false;
      }

      window.addEventListener("pointermove", updatePosition);
      requestAnimationFrame(animate);
    });

    const handLogout = () => {
      // 把isLogin改回false
      isLogin.value = false;

      // 清除cookie和localstorage
      Cookies.remove("loginInfo");
      Cookies.remove("UserID");
      localStorage.clear();

      deleteCookie();
      redirect();
    };

    const redirect = () => {
      router.push({ path: route.path });
    };

    const deleteCookie = () => {
      axios
        .post(
          "https://localhost:7043/Members/MemberLogOut",
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          { withCredentials: true }
        )
        .then((res) => {})
        .catch((err) => {});
    };

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval = null;

    const rotateWord = (e) => {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        e.target.innerText = e.target.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return e.target.dataset.value[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= e.target.dataset.value.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };

    const blobX = ref(0);
    const blobY = ref(0);
    const targetX = ref(0);
    const targetY = ref(0);

    const updatePosition = (e) => {
      const { clientX, clientY } = e;
      targetX.value = clientX;
      targetY.value = clientY;
    };

    const animate = () => {
      blobX.value += (targetX.value - blobX.value) * 0.05;
      blobY.value += (targetY.value - blobY.value) * 0.05;

      requestAnimationFrame(animate);
    };

    onUnmounted(() => {
      window.removeEventListener("pointermove", updatePosition);
    });

    return { isLogin, handLogout, rotateWord, blobX, blobY };
  },
};
</script>

<template>
  <Header :isLogin="isLogin" :handLogout="handLogout" />
  <div id="blob" :style="{ left: `${blobX}px`, top: `${blobY}px` }"></div>
  <div id="blur"></div>
  <div class="landing-page">
    <div class="section1">
      <div class="wrap">
        <div class="card"></div>
        <div class="title">
          <div class="line1">WELCOME</div>
          <div class="line2">MUSIC PLATFORM</div>
          <div class="line3">WITH DIVERSITY</div>
        </div>
      </div>
      <a href="#section2"
        ><div class="tosec2">
          <span class="arrow"><i class="fa-solid fa-arrow-down"></i></span></div
      ></a>
    </div>
    <div class="section2" id="section2">
      <h1
        class="music"
        ref="music"
        data-value="MUSIC PLAYER"
        @mouseover="rotateWord($event)"
      >
        MUSIC PLAYER
      </h1>
      <h1
        class="shop"
        ref="shop"
        data-value="SHOPPING"
        @mouseover="rotateWord($event)"
      >
        SHOPPING
      </h1>
      <h1
        ref="activity"
        data-value="ACTIVITIES"
        @mouseover="rotateWord($event)"
      >
        ACTIVITIES
      </h1>
      <h1 ref="creator" data-value="CREATING" @mouseover="rotateWord($event)">
        CREATING
      </h1>
      <h1 ref="member" data-value="MEMBER" @mouseover="rotateWord($event)">
        MEMEBER
      </h1>
    </div>

    <!-- <div class="section3">
      <div class="audioplayer" v-for="s in sounddata">
    <audio v-bind:data-num="s.number" preload="auto">
      <source v-bind:src="s.url" type="audio/ogg"/>
    </audio>
  </div>
  <div class="center_box">
    <div class="keyboard">
      <div class="pianokey" v-for="s in display_keys">
        <div class="white" v-if="s.type==&quot;white&quot;" v-on:click="addnote(s.num)" v-bind:class="get_current_highlight(s.num,s.key)?&quot;playing&quot;:&quot;&quot;">
          <div class="label">{{String.fromCharCode(s.key)}}</div>
        </div>
        <div class="black" v-if="s.type==&quot;black&quot;" v-on:click="addnote(s.num)" v-bind:class="get_current_highlight(s.num,s.key)?&quot;playing&quot;:&quot;&quot;">
          <div class="label">{{String.fromCharCode(s.key)}}</div>
        </div>
      </div>
    </div><br/>
    <div class="controls">
      <ul class="notes_list" v-if="notes.length&gt;0">
        <li v-for="(note,id) in notes" v-bind:class="now_note_id-1==id?&quot;playing&quot;:&quot;&quot;">
          <div class="num">{{note.num}}</div>
          <div class="time">{{note.time}}</div>
        </li>
      </ul>
      <button v-on:click="load_sample">Sample</button>
      <button v-on:click="playnext(1)">Playnext</button>
      <button v-if="playing_time&lt;=1" v-on:click="startplay">Startplay<i class="fa fa-play"></i></button>
      <button v-if="playing_time&gt;1" v-on:click="stopplay">Stopplay<i class="fa fa-pause"></i></button>
      <button v-if="record_time&lt;=0" v-on:click="start_record">Record<i class="fa fa-circle"></i></button>
      <button v-if="record_time&gt;=1" v-on:click="stop_record">StopRecord<i class="fa fa-top"></i></button>
      <button v-on:click="notes=[]">Clear</button>
      <h4>{{playing_time+record_time}}</h4>
    </div>
  </div>
    </div> -->
  </div>
  <Footer />
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  // 改字體
  font-family: "Microsoft JhengHei", "Heiti TC", "sans-serif";
  list-style: none;

  img {
    display: block;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    background-color: #1f2124;
    scroll-behavior: smooth;
    scroll-padding-top: 10rem;
  }
}

.landing-page {
  height: auto;
  background-color: #1f2124;
  margin-top: 8rem;
  padding-inline: 15rem;

  .section1 {
    height: 700px;
    width: 100%;
    .wrap {
      top: 10rem;
      position: relative;
      z-index: 3;
      display: flex;
      justify-content: center;
      align-items: center;

      .card {
        width: 580px;
        height: 580px;
        position: absolute;
        top: calc(50% - 190px);
        z-index: 4;
        background-color: orange;
        border-radius: 28px;
        background-image: url("@/assets/e4634da841c0ed906e77cab9b6b733ef.gif");
        background-size: cover;
        background-position: center;
      }
      .title {
        width: 100%;
        font-family: "Space Mono", monospace;
        color: white;
        position: absolute;
        font-size: 5rem;
        z-index: 4;
        display: flex;
        flex-direction: column;
        margin-block: 2rem;
        margin-top: 15rem;
        .line1 {
          font-weight: 500;
          font-size: 5.5rem;
          padding-left: 10rem;
        }
        .line2 {
          font-size: 7.5rem;
          font-weight: 700;
          margin-left: 5rem;
          margin-block: 1.5rem;
        }
        .line3 {
          font-size: 5rem;
          font-weight: 500;
          text-align: right;
          padding-right: 6rem;
        }
      }
    }
    .tosec2 {
      background-color: transparent;
      border: 2px solid white;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      z-index: 4;
      position: relative;
      left: -13.5rem;
      top: 27rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: #f6b352;
        border: #f6b352;
      }
      .arrow {
        color: white;
        font-size: 3rem;
        z-index: 5;
      }
    }
  }
  .section2 {
    margin-top: 3rem;
    margin-bottom: 10rem;
    background: rgba(0, 0, 0, 0);
    h1 {
      margin-bottom: 1rem;
      font-family: "Space Mono", monospace;
      font-size: clamp(3rem, 5vw, 10rem);
      color: white;
      padding: 0rem clamp(1rem, 2vw, 3rem);
      border-radius: clamp(0.4rem, 0.75vw, 1rem);
      z-index: 3;
      position: relative;
      &hover {
        background-color: white;
        color: #f68657;
      }
    }
  }
  .section3 {
    .audioplayer {
      audio {
        source {
        }
      }
    }
    .center_box {
      .pianokey {
        .white {
          .label {
          }
        }
        .black {
          .label {
          }
        }
      }
    }
    .controls {
      .notes_list {
        li {
          .num {
          }
          .time {
          }
        }
      }
    }
  }
}

@keyframes rotate {
  from {
    rotate: 0deg;
  }

  50% {
    scale: 1 1.5;
  }

  to {
    rotate: 360deg;
  }
}

#blob {
  background-color: white;
  height: 20vmax;
  aspect-ratio: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  border-radius: 50%;
  background: linear-gradient(to right, #f6b352, #f5ac8d);
  animation: rotate 20s infinite;
  opacity: 0.8;
  z-index: 1;
}

#blur {
  height: 1700px;
  width: 100%;
  position: absolute;
  z-index: 1;
  backdrop-filter: blur(12vmax);
}
</style>
