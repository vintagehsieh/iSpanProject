<script>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const isReset = ref(false);
    const reset = reactive({
      email: "",
    });
    const error_message = reactive({});
    const isSubmitting = ref(false);

    const successFn = () => {
      alert("驗證信寄送成功");
      isReset.value = true;
      setTimeout(() => {
        redirect();
      }, 1000);
    };

    const errorFn = (err) => {
      Object.keys(err).forEach((key) => (error_message[key] = err[key]));
      // console.log(error_message.Email);
    };

    const handReset = async () => {
      if (isSubmitting.value) return;

      isSubmitting.value = true;
      await axios
        .get(
          `https://localhost:7043/Members/ForgetPassword?email=${reset.email}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          successFn();
        })
        .catch((err) => {
          console.log(err);
          isSubmitting.value = false;
          // console.log(err.response.data.errors);
          errorFn(err.response.data.errors);
        });
    };

    const redirect = () => {
      console.log("redirect");
      window.history.pushState({}, "", "/");
      window.location.reload();
    };

    return { isReset, reset, error_message, handReset, isSubmitting, redirect };
  },
  methods: {
    setResetPassword() {
      this.reset.email = 'FUEN25iSMusic@gmail.com';
    }
  }
};
</script>
<template>
  <div v-if="!isReset">
    <div class="logo">
      <img src="@/assets/logo.png" alt="" @click="setResetPassword()" />
    </div>
    <hr />
    <div class="title">
      <h2>密碼重新設定</h2>
      <p>
        請輸入您註冊時所填寫的電子信箱，我們將寄送驗證連結至您的電子信箱以完成後續的密碼重新驗證。
      </p>
    </div>

    <form>
      <div class="input-box">
        <p>電子信箱</p>
        <input type="email" placeholder="請輸入電子信箱" v-model.lazy.trim="reset.email" />
        <!-- <p v-if="error_message" class="error">
              {{ error_message.NickName[0] }}
            </p> -->
      </div>
      <button :disabled="isSubmitting" type="submit" @click.prevent="handReset">
        送出
      </button>
    </form>
  </div>
  <div v-if="isReset" class="redirection">
    寄送成功，稍後請至您的電子信箱收取驗證信...
  </div>
</template>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  background-color: #233245;
  font-family: "微軟正黑體";
}

.logo {
  width: 300px;
  height: 100px;
  margin: 2rem auto;
  overflow: hidden;

  img {
    width: 100%;
    object-fit: cover;
    scale: 2;
  }
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: white;
    margin-block: 3rem;
  }

  p {
    color: white;
    width: 25rem;
  }
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;

  .input-box {
    display: flex;
    flex-direction: column;

    >p {
      margin-top: 1.5rem;
      font-size: 1.25rem;
      padding-left: 5px;
      color: white;
    }

    >input {
      width: 300px;
      height: 30px;
      border-radius: 20px;
      padding-left: 1rem;
    }

    .error {
      color: orange;
      font-size: 12px;
      margin-top: 0.25rem;
    }
  }

  >button {
    margin-top: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    width: 100px;
    height: 30px;
    border-radius: 8px;
    border: none;
    color: black;
    font-size: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
}

.redirection {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.5rem;
}
</style>
