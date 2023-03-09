<script>
export default {
  data() {
    return {
      username: 'Allen Kuo',
      name: 'Allen Kuo',
      email: 'AllenKuo@gmail.com',
      avatar: 'https://via.placeholder.com/150',
      creatorabout:"我是誰我在哪你們要幹嘛",
      follower:"9487"
    }
  }
}
</script>
<template>
  <div class="container">
    <div class="profile">
      <div class="avatar">
        <img :src="avatar" alt="avatar">
      </div>
      <div class="info">
        <h1 class="creatorName">{{ username }}的首頁</h1>
        <ul>
          <li><strong>姓名：</strong>{{ name }}</li>
          <li><strong>電子郵件：</strong>{{ email }}</li>
          <li><strong>關於我：</strong>{{ creatorabout }}</li>
          <li><strong>粉絲：</strong>{{ follower }}</li>
        </ul>
      </div>
    </div>
    <div class="options">
      <div>
        <h3>Music</h3>
        <button>新增音樂</button>
    <ul>
      <li>歌曲1</li>
      <li>歌曲2</li>
      <li>歌曲3</li>
    </ul>
      </div>
      <div>
        <h3>Album</h3>
        <button>新增專輯</button>
    <ul>
      <li>專輯1</li>
      <li>專輯2</li>
      <li>專輯3</li>
    </ul>
      </div>
    </div>

  </div>
  </template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 50px;
}

.profile {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}

.avatar {
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}

.avatar img {
  width: 150px;
  height: 150px;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.creatorName {
  color: lightblue;
  font-size: 36px;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin-bottom: 10px;
  font-size: 20px;
}

strong {
  font-weight: bold;
}

.options {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.options div {
  margin: 0 20px;
  margin-right: 20px;
}

h3 {
  font-size: 24px;
  margin-bottom: 10px;
  margin-top: 0;
}
button{
  margin-right: 10px;
}
</style>