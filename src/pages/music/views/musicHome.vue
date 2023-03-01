<script>
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
    <div class="announcement"></div>
    <div class="row">
      <Card v-for="item in array" :key="item.name" class="card">
        <template #picture>
          <img src="../../../assets/logo.png" alt="">
        </template>
        <template #name>
          <h3>{{ item.name }}</h3>
        </template>
        <template #desc>
          <p>{{ item.desc }}</p>
        </template>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 6rem 3rem;

  >.announcement {
    width: 90%;
    height: 15rem;
    background-color: #F6B352;
    margin: 0 auto 2rem auto;
    border-radius: 20px;
  }

  >.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    >.card {
      margin: 1rem;
    }
  }
}
</style>
