<script>
import { onMounted, ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const member = ref([]);
    onMounted(() => {
      getMember();
    });
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}/${month}/${day}`;
    };
    const getMember = () => {
      fetch("https://localhost:7043/Members", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          member.value = data;
          data.memberEdit = false;
          data.emailEdit = false;
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const openForm = () => {
      member.value.memberEdit = true;
    };
    const saveForm = async () => {
      const data = {};
      member.value.memberEdit = false;
      const myInputs = document.querySelectorAll(".name");
      const mycheckboxs = document.querySelectorAll(".checkbox");
      myInputs.forEach((myinput) => {
        data[myinput.id] = myinput.value;
      });
      mycheckboxs.forEach((mycheckbox) => {
        data[mycheckbox.id] = mycheckbox.checked;
      });
      const myForm = new FormData();
      for (const property in data) {
        myForm.append(property, data[property]);
      }

      fetch("https://localhost:7043/Members", {
        method: "PUT",
        body: myForm,
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            openForm();
            alert("更新失敗");
          }
        })
        .then((data) => {
          // console.log(data);
          // if (data === "更新成功") {
          //   alert("更新成功");
          // }
          window.location.reload();
        })
        .catch((error) => {});
    };
    const sendCode = async () => {
      const data = {};

      const email = document.querySelector("#email");
      data[email.id] = email.value;
      const myConfirmForm = new FormData();
      myConfirmForm.append("email", email.value);
      fetch("https://localhost:7043/Members/ResendConfirmCode", {
        method: "PATCH",
        body: myConfirmForm,
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            alert("已發送驗證碼，請去信箱收取信件");

            return response.text();
          } else {
            alert("發生錯誤");
          }
        })
        .then((data) => {
          // if (data === "更新成功") {
          // alert("更新成功");
          // }
        })
        .catch((error) => {});
    };
    const openEmailForm = async () => {
      member.value.emailEdit = true;
    };
    const saveEmailForm = async () => {
      const emailInput = document.querySelector("#email");
      const newEmail = emailInput.value;
      const data = {};
      if (newEmail === member.value.memberEmail) {
        member.value.emailEdit = false;
        return; // 值未變更，直接結束函式
      }
      member.value.emailEdit = false;
      const email = document.querySelector("#email");
      data[email.id] = email.value;

      const myEmailForm = new FormData();
      // for (const property in data) {
      //   myEmailForm.append(property, data[property]);
      // }
      myEmailForm.append("email.Email", email.value);

      fetch("https://localhost:7043/Members/UpdateEmail", {
        method: "PATCH",
        body: myEmailForm,
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            openEmailForm();

            alert("更新失敗");
          }
        })
        .then((data) => {
          // console.log(data);
          // if (data === "更新成功") {
          //   alert("更新成功");
          // }
          window.location.reload();
        })
        .catch((error) => {});
    };
    return {
      member,
      formatDate,
      openForm,
      saveForm,
      sendCode,
      openEmailForm,
      saveEmailForm,
      getMember,
    };
  },
};
</script>

<template>
  <aside>
    <div id="logo">
      <a href="index.html">
        <img
          src="@/assets/music-note-icon-song-melody-tune-flat-symbol-free-vector.webp"
          alt=""
        />
      </a>
    </div>
    <div id="default">
      <a to="" class="routerLink">
        <i class="fa-solid fa-user"></i>
        <h3>個人資訊</h3>
      </a>
      <a to="" class="routerLink">
        <i class="fa-solid fa-list"></i>
        <h3>訂閱紀錄</h3>
      </a>
      <a to="" class="routerLink">
        <i class="fa-solid fa-cart-shopping"></i>
        <!-- <i class="fa-solid fa-poo"></i> -->
        <h3>訂單紀錄</h3>
      </a>
      <a to="" class="routerLink" @click="createNewPlaylist">
        <i class="fa-solid fa-music"></i>
        <h3>音樂庫</h3>
      </a>
    </div>
  </aside>
  <form class="form" id="myForm" @submit.prevent="saveForm">
    <h1 class="h1">使用者資訊</h1>
    <!-- 如果是編輯狀態 就顯示 -->
    <div v-if="member.memberEdit == true">
      <div class="header">
        <label class="title">個人資訊</label>
        <!-- <button type="button" class="btn" id="openBtn" @click="openForm()">
          變更
        </button> -->
        <button type="submit" class="btn" id="saveBtn" @click="saveForm()">
          確認變更
        </button>
      </div>

      <div class="m-input-box">
        <div class="m-input">
          <label for="name" class="label">暱稱</label>
          <input
            type="text"
            class="name"
            id="memberNickName"
            :value="member.memberNickName"
          />
        </div>
        <div class="m-input">
          <label for="name" class="label">出生日</label>
          <input
            type="text"
            class="name"
            id="memberDateOfBirth"
            :value="formatDate(member.memberDateOfBirth)"
          />
        </div>
        <div class="m-input">
          <label for="name" class="label">地址</label>
          <input
            type="text"
            class="name"
            id="memberAddress"
            :value="member.memberAddress"
          />
        </div>
        <div class="m-input">
          <label for="name" class="label">手機號碼：</label>
          <input
            type="text"
            class="name"
            id="memberCellphone"
            :value="member.memberCellphone"
          />
        </div>
        <div class="m-input">
          <label for="name" class="label">接收郵件資訊</label>
          <input
            type="checkbox"
            class="checkbox"
            id="memberReceivedMessage"
            :checked="member.memberReceivedMessage"
          />
        </div>
        <div class="m-input">
          <label for="name" class="label">分享資訊給平台</label>
          <input
            type="checkbox"
            class="checkbox"
            id="memberSharedData"
            :checked="member.memberSharedData"
          />
        </div>
        <div class="m-input">
          <label for="name" class="label">公開行事曆</label>
          <input
            type="checkbox"
            class="checkbox"
            id="calenderPrivacy"
            :checked="member.calenderPrivacy"
          />
        </div>
      </div>
    </div>
    <!-- 如果不是編輯狀態，就不顯示 -->
    <div v-else>
      <div class="header">
        <label class="title">個人資訊</label>
        <button type="button" class="btn" id="openBtn" @click="openForm()">
          變更
        </button>
        <!-- <button type="submit" class="btn" id="saveBtn" hidden>確認變更</button> -->
      </div>
      <div class="m-input-box">
        <div class="m-input">
          <label for="name" class="label">暱稱</label>
          <input
            type="text"
            class="name"
            id="memberNickName"
            readonly
            :value="member.memberNickName"
          />
        </div>
        <div class="m-input">
          <label for="name" class="label">出生日</label>
          <input
            type="text"
            class="name"
            id="memberDateOfBirth"
            readonly="readonly"
            :value="formatDate(member.memberDateOfBirth)"
          />
        </div>
        <div class="m-input">
          <label for="name" class="label">地址</label>
          <input
            type="text"
            class="name"
            id="memberAddress"
            readonly="readonly"
            :value="member.memberAddress"
          />
        </div>
        <div class="m-input">
          <label for="name" class="label">手機號碼：</label>
          <input
            type="text"
            class="name"
            id="memberCellphone"
            readonly="readonly"
            :value="member.memberCellphone"
          />
        </div>
        <div class="m-input">
          <label for="name" class="label">接收郵件資訊</label>
          <input
            type="checkbox"
            class="checkbox"
            id="memberReceivedMessage"
            disabled
            :checked="member.memberReceivedMessage"
          />
        </div>
        <div class="m-input">
          <label for="name" class="label">分享資訊給平台</label>
          <input
            type="checkbox"
            class="checkbox"
            id="memberSharedData"
            disabled
            :checked="member.memberSharedData"
          />
        </div>
        <div class="m-input">
          <label for="name" class="label">公開行事曆</label>
          <input
            type="checkbox"
            class="checkbox"
            id="calenderPrivacy"
            disabled
            :checked="member.calenderPrivacy"
          />
        </div>
      </div>
    </div>
  </form>
  <form class="form" id="myEmailForm">
    <div v-if="member.emailEdit == true">
      <div class="header">
        <label class="title">電子郵件信箱</label>
        <button
          type="submit"
          class="btn"
          id="emailSaveBtn"
          @click="saveEmailForm()"
        >
          確認變更
        </button>
      </div>

      <div class="email-input-box">
        <div class="email-input">
          <label for="email" class="label">電子郵件信箱</label>
          <input type="text" id="email" :value="member.memberEmail" />
        </div>
        <!-- <button class="btn">變更</button> -->
        <button class="btn-send" v-if="member.isConfirmed" hidden>
          重發驗證信
        </button>
        <button type="submit" class="btn-send" v-else @click="sendCode()">
          重發驗證信
        </button>
        <div class="email-input">
          <label for="email" class="label">驗證狀態</label>
          <span v-if="member.isConfirmed"
            >驗證完成<i
              class="fa-solid fa-circle-check"
              style="color: #f6b352"
            ></i
          ></span>
          <span v-else
            >尚未完成<i
              class="fa-solid fa-circle-xmark"
              style="color: #df3737"
            ></i
          ></span>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="header">
        <label class="title">電子郵件信箱</label>
        <button
          type="button"
          class="btn"
          id="emailOpenBtn"
          @click="openEmailForm()"
        >
          變更
        </button>
      </div>

      <div class="email-input-box">
        <div class="email-input">
          <label for="email" class="label">電子郵件信箱</label>
          <input
            type="text"
            id="email"
            readonly="readonly"
            :value="member.memberEmail"
          />
        </div>
        <!-- <button class="btn">變更</button> -->
        <button class="btn-send" v-if="member.isConfirmed" hidden>
          重發驗證信
        </button>
        <button type="submit" class="btn-send" v-else @click="sendCode()">
          重發驗證信
        </button>
        <div class="email-input">
          <label for="email" class="label">驗證狀態</label>
          <span v-if="member.isConfirmed"
            >驗證完成<i
              class="fa-solid fa-circle-check"
              style="color: #f6b352"
            ></i
          ></span>
          <span v-else
            >尚未完成<i
              class="fa-solid fa-circle-xmark"
              style="color: #df3737"
            ></i
          ></span>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  /* 	border: none; */
  font-family: "Helvetica Neue", "Helvetica", "Arial", "PingFangTC-Light",
    "STHeitiTC-Light", "Microsoft JhengHei", "微軟正黑體", sans-serif;
  list-style: none;
}
input {
  margin-left: 10px;
  outline-style: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  //   padding: 14px 14px;
  width: 200px;
  height: 30px;
  font-size: 18px;
  background-color: #e7e6e600;
}
form {
  margin-bottom: 5px;
  background-color: #e7cccc;
  border-radius: 10px;
  margin-top: 20px;
  // padding: 30px;
}
.h1 {
  padding: 30px;
}
.header {
  display: flex;
  margin: auto;
  justify-content: space-between;
  background-color: #b3abab;
  width: 100%;
  padding: 20px;
}
.title {
  font-size: 24px;
}
.btn {
  background-color: #fff;
  width: 50px;
  height: 30px;
  border-radius: 8px;
  color: black;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  border: none;
}
.m-input-box {
  width: 600px;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 20px;
  padding-left: 1rem;
  > .m-input {
    margin-top: 20px;
    label {
      margin-left: 1rem;
      display: inline-block;
      width: 100px;
    }
    input {
      width: 300px;
      margin-left: 50px;
      // border: none;
      // background-color: white;
    }
  }
}
.email-input-box {
  width: 600px;
  padding: 20px;
  margin-bottom: 20px;
  padding-left: 1rem;
  > .email-input {
    padding-left: 1rem;
    display: inline;
    label {
      margin-top: 20px;
      // margin-left: 1rem;
      display: inline-block;
      width: 100px;
    }
    input {
      width: 300px;
      margin-left: 50px;
      border: none;
    }
    span {
      width: 300px;
      margin-left: 50px;
      border: none;
    }
  }
  > .btn-send {
    background-color: #fff;
    width: 90px;
    height: 30px;
    border-radius: 8px;
    border-color: #ccc;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
    border: none;
    flex: auto;
  }
}

aside {
  background-color: #707070;
  width: 100%;
  height: 100%;
  margin: 50px;
  padding: 0 2rem;
  color: rgb(0, 0, 0);

  #logo {
    display: flex;
    width: 200px;
    height: 100px;
    overflow: hidden;
    margin-bottom: 2rem;

    > a img {
      display: flex;
      width: max(10vw, 200px);
      scale: 2;
    }
  }

  > #default {
    width: 80%;
    margin: auto;
    > a {
      padding: 1rem 0;
      text-decoration: none;
    }
  }
}
</style>
