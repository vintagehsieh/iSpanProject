<script>
import Register from "@/pages/member/components/Register";
export default {
  components: {
    Register,
  },
};
</script>
<template>
  <nav>
    <router-link to="/">MemberHome</router-link> |
    <router-link to="/MemberSecond">MemberSecond</router-link>
  </nav>
  <router-view />
  <Register />

</template>

<style></style>
