<script>
export default {

}
</script>

<template>
  <div class="container">
    <SideBar id="side" />
    <div class="page">
      <div id="pageHeader">
        <div id="search">
          <input type="text" id="value">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" style="font-size: 25px; color: grey;" />
        </div>
      </div>
      <div id="pageCarousell">
        <div id="carousell"></div>
      </div>
    </div>
    <div id="products">
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  min-height: 200vh;

  #side {
    width: 15rem;
    height: 10rem;
  }

  .page {
    width: 60em;
    margin-bottom: 2rem;

    #pageHeader {
      width: 100%;
      height: 5rem;
      display: flex;

      #search {
        width: 16rem;
        height: 3rem;
        padding: 0 1rem;
        border: 2px solid #141a35;
        border-radius: 50px;
        margin-left: auto;
        margin-right: 8rem;
        padding-left: 20px;
        display: flex;
        align-items: center;

        input {
          font-size: 25px;
          width: 12rem;
          border: none;

          &:focus {
            outline: none;
          }
        }
      }
    }

    #pageCarousell {
      margin-bottom: 1rem;
      display: flex;
      justify-content: center;

      #carousell {
        width: 50rem;
        height: 30rem;
        border-radius: 1rem;
        background-color: #7388e0;
      }
    }
  }

  #products {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
