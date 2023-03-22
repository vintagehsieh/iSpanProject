<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const isSubmitting = ref(false);
    const member = ref([]);
    onMounted(() => {
      getMember();
    });
    const errorFn = (err) => {
      Object.keys(err).forEach((key) => (error_message[key] = err[key]));
      console.log(error_message.Email);
    };
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

      await fetch("https://localhost:7043/Members", {
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

      store.dispatch("updateUserID");
      getMember();
    };
    const sendCode = async () => {
      if (isSubmitting.value) return;
      isSubmitting.value = true;
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
        .catch((error) => {
          errorFn(err.response.data.errors);
          isSubmitting.value = false;
        });
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
      isSubmitting,
    };
  },
};
</script>

<template>
  <div class="memberInfo">
    <h1 class="h1">使用者資訊</h1>
    <form class="form" id="myForm" @submit.prevent="saveForm">
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
          <hr />
          <div class="m-input">
            <label for="name" class="label">出生日</label>
            <input
              type="text"
              class="name"
              id="memberDateOfBirth"
              :value="formatDate(member.memberDateOfBirth)"
            />
          </div>
          <hr />
          <div class="m-input">
            <label for="name" class="label">地址</label>
            <input
              type="text"
              class="name"
              id="memberAddress"
              :value="member.memberAddress"
            />
          </div>
          <hr />
          <div class="m-input">
            <label for="name" class="label">手機號碼</label>
            <input
              type="text"
              class="name"
              id="memberCellphone"
              :value="member.memberCellphone"
            />
          </div>
          <hr />
          <div class="m-input">
            <label for="name" class="label">接收郵件資訊</label>
            <input
              type="checkbox"
              class="checkbox"
              id="memberReceivedMessage"
              :checked="member.memberReceivedMessage"
            />
          </div>
          <hr />
          <div class="m-input">
            <label for="name" class="label">分享資訊給平台</label>
            <input
              type="checkbox"
              class="checkbox"
              id="memberSharedData"
              :checked="member.memberSharedData"
            />
          </div>
          <hr />
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
          <hr />
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
          <hr />
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
          <hr />
          <div class="m-input">
            <label for="name" class="label">手機號碼</label>
            <input
              type="text"
              class="name"
              id="memberCellphone"
              readonly="readonly"
              :value="member.memberCellphone"
            />
          </div>
          <hr />
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
          <hr />
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
          <hr />
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
            <input
              type="text"
              id="email"
              class="email"
              :value="member.memberEmail"
            />
          </div>
          <!-- <button class="btn">變更</button> -->
          <div class="btn-appear">
            <div class="emailConfirm">
              <span v-if="member.isConfirmed"
                >驗證完成
                <i class="fa-solid fa-circle-check" style="color: #f6b352"></i
              ></span>
              <span v-else
                >尚未完成
                <i class="fa-solid fa-circle-xmark" style="color: #df3737"></i
              ></span>
            </div>
            <button class="btn-send" v-if="member.isConfirmed" hidden>
              重發驗證信
            </button>

            <button type="submit" class="btn-send" v-else @click="sendCode()">
              重發驗證信
            </button>
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
              class="email"
              readonly="readonly"
              :value="member.memberEmail"
            />
          </div>
          <!-- <button class="btn">變更</button> -->
          <div class="btn-appear">
            <div class="emailConfirm">
              <span v-if="member.isConfirmed"
                >驗證完成
                <i class="fa-solid fa-circle-check" style="color: #f6b352"></i
              ></span>
              <span v-else
                >尚未完成
                <i class="fa-solid fa-circle-xmark" style="color: #df3737"></i
              ></span>
            </div>
            <button class="btn-send" v-if="member.isConfirmed" hidden>
              重發驗證信
            </button>

            <button type="submit" class="btn-send" v-else @click="sendCode()">
              重發驗證信
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.memberInfo {
  display: flex;
  flex-direction: column;
  width: 100%;
  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 32px;
    text-align: left;
    width: 75%;
    color: black;
  }
  .form {
    border: 1px solid transparent;
    width: 75%;
    height: auto;
    border-radius: 8px;
    box-shadow: rgba(0 0 0 / 30%) 0 2px 10px 2px;
    color: black;
    text-align: left;
    padding: 3rem;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      margin-bottom: 15px;
      .title {
        font-size: 2rem;
        font-weight: bold;
        padding-bottom: 24px;
        margin-top: 20px;
      }
      .btn {
        width: 80px;
        height: 40px;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 8px;
        background: white;
      }
    }
    hr {
      border: none;
      background-color: rgba(0, 0, 0, 0.2);
      height: 2px;
    }

    .m-input-box {
      .m-input {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 4rem;
        padding-block: 1.5rem;
        .label {
          font-size: 1.4rem;
          font-weight: 700px;
          margin-bottom: 2rem;
          padding-top: 1.75rem;
        }
        .name {
          font-size: 1.4rem;
          border: none;
          text-align: right;
          &:focus {
            border: none;
            padding-block: 4px;
            box-shadow: rgba(0 0 0 / 30%) 0 2px 10px 2px;
          }
        }
        .checkbox {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: none;
        }
      }
    }
  }
  #myEmailForm {
    margin-block: 3rem;
    margin-bottom: 10rem;
    .email-input-box {
      display: flex;
      flex-direction: column;
      .email-input {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 4rem;
        padding-block: 1rem;
        .label {
          font-size: 1.4rem;
          font-weight: 700px;
          margin-bottom: 2rem;
          padding-top: 1.75rem;
        }
        .email {
          font-size: 1.4rem;
          border: none;
          text-align: right;
          width: 400px;
        }
      }
      .btn-appear {
        display: flex;
        justify-content: end;
        align-items: center;
        margin-top: -1rem;
        .btn-send {
          width: 100px;
          height: 40px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          background: white;
          align-self: end;
          margin-left: 1rem;
        }
        .emailConfirm {
          display: flex;
          justify-content: end;
          align-items: center;
          margin-top: 1px;
        }
      }
    }
  }
}
</style>
