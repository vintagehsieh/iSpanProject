<script>
import { onMounted, ref, reactive } from "vue";
import axios from "axios";

.form{
  .h1{

  }
  .header{
    .title{

    }
    .btn{

    }

  }

  .m-input-box{
    .m-input{
      .label{ }
      .name{ }
      .checkbox{ }
    }
  }

}

export default {
  setup() {
    // const isEdit = ref(false);
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
  <!-- 個人資料表格 -->
  <form class="form" id="myForm" @submit.prevent="saveForm()">
    <h2>使用者資訊</h2>
    <!-- 按鈕開關 -->
    <div class="header">
      <!-- 非編輯狀態 -->
      <label class="title">個人資訊</label>
      <button
        v-if="member.memberEdit == false"
        type="button"
        class="btn"
        id="openBtn"
        @click="openForm()"
      >
        變更
      </button>
      <!-- 編輯狀態 -->
      <button
        v-if="member.memberEdit == true"
        type="submit"
        class="btn"
        id="saveBtn"
        @click="saveForm()"
      >
        確認變更
      </button>
    </div>

    <!-- 使用者資訊 -->
    <div class="input-box">
      <!-- 暱稱 -->
      <div class="input">
        <label for="name" class="label">暱稱</label>
        <!-- 非編輯狀態 -->
        <input
          v-if="member.memberEdit == false"
          type="text"
          class="name"
          id="memberNickName"
          readonly
          :value="member.memberNickName"
        />
        <!-- 編輯狀態 -->
        <input
          v-if="member.memberEdit == true"
          type="text"
          :class="['name', { edit: member.memberEdit }]"
          id="memberNickName"
          :value="member.memberNickName"
        />
      </div>
      <hr />
      <!-- 生日 -->
      <div class="input">
        <label for="name" class="label">出生日期</label>
        <!-- 非編輯狀態 -->
        <input
          v-if="member.memberEdit == false"
          type="text"
          class="name"
          id="memberDateOfBirth"
          readonly
          :value="formatDate(member.memberDateOfBirth)"
        />
        <!-- 編輯狀態 -->
        <input
          v-if="member.memberEdit == true"
          type="text"
          :class="['name', { edit: member.memberEdit }]"
          id="memberDateOfBirth"
          :value="formatDate(member.memberDateOfBirth)"
        />
      </div>
      <hr />
      <!-- 地址 -->
      <div class="input">
        <!-- 非編輯狀態 -->
        <label for="name" class="label">地址</label>
        <input
          v-if="member.memberEdit == false"
          type="text"
          class="name"
          id="memberAddress"
          readonly
          :value="member.memberAddress"
        />
        <!-- 編輯狀態 -->
        <input
          v-if="member.memberEdit == true"
          type="text"
          :class="['name', { edit: member.memberEdit }]"
          id="memberAddress"
          :value="member.memberAddress"
        />
      </div>
      <hr />
      <!-- 手機號碼 -->
      <div class="input">
        <!-- 非編輯狀態 -->
        <label for="name" class="label">手機號碼</label>
        <input
          v-if="member.memberEdit == false"
          type="tel"
          class="name"
          id="memberPhone"
          readonly
          :value="member.memberCellphone"
        />
        <!-- 編輯狀態 -->
        <input
          v-if="member.memberEdit == true"
          type="tel"
          :class="['name', { edit: member.memberEdit }]"
          id="memberPhone"
          :value="member.memberCellphone"
        />
      </div>
      <hr />
      <!-- 接收郵件資訊 -->
      <div class="input">
        <!-- 非編輯狀態 -->
        <label for="name" class="label">接收郵件資訊</label>
        <input
          v-if="member.memberEdit == false"
          type="checkbox"
          class="checkbox"
          id="memberReceivedMessage"
          disabled
          :checked="member.memberReceivedMessage"
        />
        <!-- 編輯狀態 -->
        <input
          v-if="member.memberEdit == true"
          type="checkbox"
          class="checkbox"
          id="memberReceivedMessage"
          :checked="member.memberReceivedMessage"
        />
      </div>
      <hr />
      <!-- 分享資訊給平台 -->
      <div class="input">
        <!-- 非編輯狀態 -->
        <label for="name" class="label">分享資訊給平台</label>
        <input
          v-if="member.memberEdit == false"
          type="checkbox"
          class="checkbox"
          id="memberSharedData"
          disabled
          :checked="member.memberSharedData"
        />
        <!-- 編輯狀態 -->
        <input
          v-if="member.memberEdit == true"
          type="checkbox"
          class="checkbox"
          id="memberSharedData"
          :checked="member.memberSharedData"
        />
      </div>
      <hr />
      <!-- 公開行事曆 -->
      <div class="input">
        <!-- 非編輯狀態 -->
        <label for="name" class="label">公開行事曆</label>
        <input
          v-if="member.memberEdit == false"
          type="checkbox"
          class="checkbox"
          id="calenderPrivacy"
          disabled
          :value="member.calenderPrivacy"
        />
        <!-- 編輯狀態 -->
        <input
          v-if="member.memberEdit == true"
          type="checkbox"
          class="checkbox"
          id="calenderPrivacy"
          :value="member.calenderPrivacy"
        />
      </div>
    </div>
  </form>
  <!-- 信箱驗證表格 -->
</template>
<style lang="scss" scoped>
form {
  width: 75%;
  height: auto;
  border-radius: 8px;
  box-shadow: rgba(0 0 0 / 30%) 0 2px 10px 2px;
  color: black;
  text-align: left;
  padding: 3rem;
  h2 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 32px;
  }
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
  .input-box {
    .input {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 4rem;
      padding-block: 3rem;

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
        &.edit {
          border: 1px solid rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          padding-block: 4px;
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
</style>
