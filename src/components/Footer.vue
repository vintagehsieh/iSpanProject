<script>
export default {
  setup() {
    const year = new Date().getFullYear();
    return {
      year,
    };
  },
};
</script>
<template>
  <footer>
    <div id="footer_nav">
      <ul id="intro">
        <li>平台簡介</li>
        <li>關於我們</li>
        <li>概念闡述</li>
      </ul>
      <ul id="member">
        <li>成員介紹</li>
        <li>徐金劭</li>
        <li>林澔</li>
        <li>洪祥盛</li>
        <li>陳郁翔</li>
        <li>謝盛翔</li>
      </ul>
    </div>
    <hr />
    <div id="footer_time">ⓒ 2022 - {{ year }} isMusic</div>
    <div class="blur"></div>
  </footer>
</template>

<style lang="scss" scoped>
.blur {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  backdrop-filter: blur(12vmax);
}
footer {
  width: 100%;
  height: 450px;
  margin-top: 50px;
  background-color: #1f2124;
  color: white;
  position: relative;
  z-index: 3;
  > #footer_nav {
    display: flex;
    position: relative;
    z-index: 4;
    > #intro {
      margin-left: 12rem;
      margin-top: 3rem;
      > li {
        display: flex;
        justify-content: center;
        margin: 1rem 0;
      }
      > :nth-child(1) {
        font-size: 20px;
        margin-bottom: 1rem;
      }
    }
    > #member {
      margin-left: 6rem;
      margin-top: 3rem;
      > li {
        display: flex;
        justify-content: center;
        margin: 1rem 0;
      }
      > :nth-child(1) {
        font-size: 20px;
        margin-bottom: 1rem;
      }
    }
  }
}
#footer_time {
  display: flex;
  justify-content: end;
  margin-right: 10rem;
  color: white;
  position: relative;
  z-index: 4;
}
hr {
  border-color: rgba(255, 255, 255, 0.938);
  margin: 2rem 0 2rem 0;
  z-index: 4;
  position: relative;
}
</style>
