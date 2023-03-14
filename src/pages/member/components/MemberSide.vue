<script>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
export default {
  setup() {
    const username = ref("");

    onMounted(() => {
      fetch("https://localhost:7043/Members", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          member.value = data;
        })
        .catch((error) => {
          console.error(error);
        });
    });
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}/${month}/${day}`;
    };
    const openForm = () => {
      var inputs = document.querySelectorAll(".name");
      inputs.forEach((input) => {
        input.removeAttribute("readonly");
      });
      var checkbox = document.querySelectorAll(".checkbox");
      checkbox.forEach((input) => {
        input.removeAttribute("disabled");
      });
      var openBtn = document.querySelector("#openBtn");
      openBtn.setAttribute("hidden", true);
      var saveBtn = document.querySelector("#saveBtn");
      saveBtn.removeAttribute("hidden");
    };
    const saveForm = async () => {
      var inputs = document.querySelectorAll(".name");
      inputs.forEach((input) => {
        input.setAttribute("readonly", true);
      });
      var checkbox = document.querySelectorAll(".checkbox");
      checkbox.forEach((input) => {
        input.setAttribute("disabled", true);
      });
      var openBtn = document.querySelector("#openBtn");
      openBtn.removeAttribute("hidden", true);
      var saveBtn = document.querySelector("#saveBtn");
      saveBtn.setAttribute("hidden", true);
      // =====================================================================================================================
      const data = {};
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
        })
        .catch((error) => {});
    };
    const sendCode = async () => {
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
        })
        .catch((error) => {});
    };
    const openEmailInput = async () => {
      var openBtn = document.querySelector("#emailOpenBtn");
      openBtn.setAttribute("hidden", true);
      var saveBtn = document.querySelector("#emailSaveBtn");
      saveBtn.removeAttribute("hidden");
      var input = document.querySelector("#email");
      input.removeAttribute("readonly");
    };
    const saveEmailInput = async () => {
      var openBtn = document.querySelector("#emailOpenBtn");
      openBtn.removeAttribute("hidden");
      var saveBtn = document.querySelector("#emailSaveBtn");
      saveBtn.setAttribute("hidden", true);
      var input = document.querySelector("#email");
      input.setAttribute("readonly", true);
      // ================================================================================================================
      const data = {};
      const myEmail = document.querySelector("#email");
      data[email.id] = myEmail.value;
      const myForm = new FormData();
      for (const property in data) {
        myForm.append(property, data[property]);
      }

      fetch("https://localhost:7043/Members/UpdateEmail", {
        method: "PATCH",
        body: myForm,
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            openEmailInput();
            alert("更新失敗");
          }
        })
        .then((data) => {
          console.log(data);
          // if (data === "更新成功") {
          //   alert("更新成功");
          // }
        })
        .catch((error) => {});
    };
    return {
      member,
      formatDate,
      openForm,
      saveForm,
      sendCode,
      openEmailInput,
      saveEmailInput,
    };
  },
};
</script>
<template>
  <div class="content">
    <div class="navbar">
      <p>
        歡迎！<span style="color: orange">{{ username }}</span>
      </p>
      <div class="logo">
        <img src="@/assets/ae86bc6c9055369fd5ebd8d884a587ae.jpg" alt="" />
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
    <div class="header">
      <label class="title">個人資訊</label>
      <button type="button" class="btn" id="openBtn" @click="openForm()">
        變更
      </button>
      <button type="submit" class="btn" id="saveBtn" hidden>確認變更</button>
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

    <!-- -------------------------------------------------------------------------------------------- -->
    <div class="header">
      <label class="title">電子郵件信箱</label>
      <button
        type="button"
        class="btn"
        id="emailOpenBtn"
        @click="openEmailInput()"
      >
        變更
      </button>
      <button
        type="submit"
        class="btn"
        id="emailSaveBtn"
        hidden
        @click="saveEmailInput()"
      >
        確認變更
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
  </form>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  .navbar {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background-color: black;
    min-width: 30vw;
    height: 100%;
    padding-top: 6rem;
    color: white;
    padding-inline: 2rem;
    p {
      color: white;
      font-size: 1.5rem;
      margin-bottom: 1.75rem;
      letter-spacing: 4px;
    }
    input {
      width: 300px;
      margin-left: 50px;
      border: none;
    }
    .link {
      margin-top: 5rem;
      margin-left: -10px;
      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: white;
        margin-bottom: 2.5rem;
        font-size: 1.25rem;
        text-align: justify;
        &:hover {
          color: orange;
        }
        span {
        }
        h3 {
          padding-left: 1rem;
        }
      }
    }
  }
  .view {
    flex: 1;
    .router-link {
      a {
        .icon {
        }
        h3 {
        }
      }
    }
  }
}
</style>
