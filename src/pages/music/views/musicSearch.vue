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
    <div id="searchGroup">
      <div id="search">
        <!-- font awesome maginifier -->
        <input type="text" placeholder="想聽什麼?"/>
      </div>
      <div id="sort">
        <div class="sort-unit" id="all">所有</div>
        <div class="sort-unit" id="song">歌曲</div>
        <div class="sort-unit" id="playlist">播放清單</div>
        <div class="sort-unit" id="artistAndCreator">藝人/創作者</div>
        <div class="sort-unit" id="album">專輯</div>
      </div>
    </div>
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

    >#searchGroup{
      >#search{
        width: 15rem;
        height: 35px;
        padding: 0 1rem;
        background-color: #fff;
        border-radius: 30px;
        display: flex;
        justify-content: center;

        >input{
          font-size: large;
          border:  none;
          &:focus{
            outline: none;
          }
        }
      }
      >#sort{
        margin-top: 1rem;
        display: flex;

        >.sort-unit{
          margin-right: 5px;
          padding: 0 10px;
          height: 2rem;
          color: white;
          background-color: #2c2c2c;
          border-radius: 30px;
          display: flex;
          align-items: center;

          &:hover{
            background-color: #383A3F;
          }
        }
      }
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
