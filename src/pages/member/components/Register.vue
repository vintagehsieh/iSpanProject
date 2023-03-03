<script>
import { reactive, ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const isReg = ref(false);
    const registered = reactive({
      username: "",
      password: "",
      sex: "",
      email: "",
      age: "",
      terms: false,
    });
    const error_message = reactive({});

    const successFn = () => {
      alert("註冊成功");
      isReg.value = true;
    };

    const errorFn = (err) => {
      Object.keys(err).forEach((key) => (error_message[key] = err[key]));
    };

    const handRegisteredFn = () => {
      axios
        .post("/auth/registered", registered)
        .then((res) => {
          successFn();
        })
        .catch((err) => {
          errorFn(err.response.data.error_message);
        });
    };

    return { isReg, registered, handRegisteredFn, error_message };
  },
};
</script>
<template>
  <div v-if="!isReg">
    <div class="input-box">
      <p>NAME</p>
      <input
        type="text"
        placeholder="輸入使用者名稱"
        v-model="registered.username"
      />
      <p v-if="error_message.username" class="error">
        {{ error_message.username }}
      </p>
    </div>
    <div class="input-box">
      <p>PASSWORD</p>
      <input
        type="password"
        placeholder="輸入密碼"
        v-model="registered.password"
      />
      <p v-if="error_message.password" class="error">
        {{ error_message.password }}
      </p>
    </div>
    <div class="input-box">
      <p>E-MAIL</p>
      <input type="text" placeholder="輸入email" v-model="registered.email" />
      <p v-if="error_message.email" class="error">
        {{ error_message.email }}
      </p>
    </div>
    <div class="input-box">
      <p>年齡</p>
      <input type="number" placeholder="輸入年齡" v-model="registered.age" />
    </div>
    <div class="input-box">
      <input type="radio" id="boy" value="boy" v-model="registered.sex" />
      <label for="boy">boy</label>
      <input type="radio" id="girl" value="girl" v-model="registered.sex" />
      <label for="girl">girl</label>
    </div>
    <div class="input-box">
      <input type="checkbox" id="checkbox" v-model="registered.terms" />
      <label for="checkbox">我已閱讀使用者條款</label>
    </div>
    <a class="btn" @click="handRegisteredFn">送出</a>
  </div>
  <div v-if="isReg">
    <h1>註冊成功</h1>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  background-color: #233245;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "微軟正黑體";
}

.btn {
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: 180px;
  margin: 10px auto 0 auto;
  padding: 5px 0;
  color: white;
  background-color: skyblue;
  font-size: 12px;
}

p,
label {
  color: white;
  margin-bottom: 3px;
}
input[type="text"],
input[type="password"],
input[type="number"] {
  width: 180px;
  height: 24px;
  padding-left: 5px;
}
.input-box {
  margin-bottom: 20px;
}

input[type="radio"] {
  margin: 0 7px;
}
label {
  margin-right: 15px;
}

p.error {
  color: rgb(255, 119, 119);
  font-size: 12px;
  padding-top: 4px;
}

h1 {
  color: aliceblue;
}
</style>
