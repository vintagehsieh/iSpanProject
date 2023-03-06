<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import axios from 'axios';

export default {
  components: {
    Header,
    Footer,
  },
  methods: {
    login() {
      const account = document.querySelector('#account').value;
      const password = document.querySelector('#password').value;

      axios.post('https://localhost:7043/Members/MemberLogin', {
        memberAccount: account,
        memberPassword: password
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
        .then(response => {
          const data = response.data;
          // handle data...
        })
        .catch(error => {
          console.error(error);
        });
    },
    logout() {
      fetch('https://localhost:7043/Members/MemberLogOut', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {

        })
        .catch(error => console.error(error));
    }
  }
}
</script>

<template>
  <Header />
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
}

img {
  display: block;
}

html,
body {
  width: 100%;
  height: 100%;
}

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
