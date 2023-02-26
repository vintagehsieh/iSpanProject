<script>
import Card from '@/components/Card.vue';

export default {
  data(){
    return{
      items: [
        {
          name: "hello",
          desc: 'world'
        },
        {
          name: "hello",
          desc: 'world'
        },
        {
          name: "hello",
          desc: 'world'
        },
        {
          name: "hello",
          desc: 'world'
        },
        {
          name: "hello",
          desc: 'world'
        },
        {
          name: "hello",
          desc: 'world'
        },
        {
          name: "hello",
          desc: 'world'
        },
      ]
    }
  },
  compotents:{
    Card,
  }
};
</script>
<template>
  <div class="container">
    <h1>This is Music Search Page</h1>
    <div class="row">
      <Card v-for="item in items" :key="item.id" class="card">
        <template #name>
          <p>{{ item.name }}</p>
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
  width: 100%;
  height: 140vh;
  padding: 6rem 3rem;
  background-color: #1F2124;

  >h1 {
    color: white;
  }

  >.row{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    >.card{
      margin: 1rem;
    }
  }
}
</style>
