<script>
import Card from '@/components/Card.vue';

export default {
  data() {
    return {
      array: [
        {
          name: "Maru",
          desc: "Yes"
        },
        {
          name: "Maru",
          desc: "Yes"
        },
        {
          name: "Maru",
          desc: "Yes"
        },
        {
          name: "Maru",
          desc: "Yes"
        },
        {
          name: "Maru",
          desc: "Yes"
        },
        {
          name: "Maru",
          desc: "Yes"
        },
        {
          name: "Maru",
          desc: "Yes"
        },
        {
          name: "Maru",
          desc: "Yes"
        },
        {
          name: "Maru",
          desc: "Yes"
        },
        {
          name: "Maru",
          desc: "Yes"
        },
        {
          name: "Maru",
          desc: "Yes"
        },
        {
          name: "Maru",
          desc: "Yes"
        },
        {
          name: "Maru",
          desc: "Yes"
        },
        {
          name: "Maru",
          desc: "Yes"
        },
        {
          name: "Maru",
          desc: "Yes"
        },
        {
          name: "Allen",
          desc: "Kuo"
        },
        {
          name: "Pig",
          desc: "Meat"
        },
        {
          name: "Pig",
          desc: "Meat"
        }
      ]
    }
  }
};
</script>

<template>
  <div class="container">
    <h1 style="color: #fff;">This is Music Home.</h1>
    <div class="row">
      <Card v-for="num in array" key="num" class="card">
        <template #picture>
          <img src="../../../assets/logo.png" alt="">
        </template>
        <template #name>
          <h3>{{ num.name }}</h3>
        </template>
        <template #desc>
          <p>{{ num.desc }}</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 0 3rem;
  background-color: #1F2124;

  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    >.card {
      margin: 1rem;
    }
  }
}
</style>
