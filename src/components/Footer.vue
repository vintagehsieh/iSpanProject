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
  </footer>
</template>

<style lang="scss" scoped>
footer {
  width: 100%;
  height: 450px;
  margin-top: 50px;
  background-color: #1f2124;
  color: white;
  > #footer_nav {
    display: flex;
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
}
hr {
  border-color: rgba(255, 255, 255, 0.1);
  margin: 3rem 0 2.25rem 0;
}
</style>
