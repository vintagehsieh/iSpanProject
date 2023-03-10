<script>
import { onMounted, ref } from "vue";
export default {
  setup() {
    const member = ref([]);
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
          console.log();
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return { member };
  },
};
</script>

<template>
  <aside>
    <div id="logo">
      <a href="index.html">
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
  <form class="form">
    <h1 class="h1">使用者資訊</h1>
    <div class="header">
      <label class="title">個人資訊</label>
      <button class="btn">變更</button>
    </div>
    <div class="m-input-box">
      <div class="m-input">
        <label for="name" class="label">暱稱</label>
        <!-- <p v-if="isEdit">{{ member.memberNickName }}</p> -->
        <input type="text" id="name" readonly="readonly" value="123" />
      </div>
      <div class="m-input">
        <label for="name" class="label">出生日</label>
        <input type="text" id="name" readonly="readonly" value="123" />
      </div>
      <div class="m-input">
        <label for="name" class="label">地址</label>
        <input type="text" id="name" readonly="readonly" value="123" />
      </div>
      <div class="m-input">
        <label for="name" class="label">手機號碼：</label>
        <input type="text" id="name" readonly="readonly" value="123" />
      </div>
      <div class="m-input">
        <label for="name" class="label">是否接收資訊</label>
        <input type="text" id="name" readonly="readonly" value="123" />
      </div>
      <div class="m-input">
        <label for="name" class="label">是否分享資訊</label>
        <input type="text" id="name" readonly="readonly" value="123" />
      </div>
      <div class="m-input">
        <label for="name" class="label">公開音樂庫</label>
        <input type="text" id="name" readonly="readonly" value="123" />
      </div>
      <div class="m-input">
        <label for="name" class="label">公開行事曆</label>
        <input type="text" id="name" readonly="readonly" value="123" />
      </div>
    </div>

    <!-- -------------------------------------------------------------------------------------------- -->
    <div class="header">
      <label class="title">電子郵件信箱</label>
    </div>
    <div class="email-input-box">
      <div class="email-input">
        <label for="email" class="label">電子郵件信箱</label>
        <input
          type="text"
          id="email"
          readonly="readonly"
          value="12312312312312311@gmail.com"
        />
      </div>
      <!-- <button class="btn">變更</button> -->
      <button class="btn-send">重發驗證信</button>
      <div class="email-input">
        <label for="email" class="label">是否驗證完成</label>
        <input type="text" id="email" readonly="readonly" value="123" />
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
      border: none;
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