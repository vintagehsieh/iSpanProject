<template>
  <div class="card">
    <div class="pic">
      <slot name="picture"></slot>
    </div>
    <div class="desc">
      <slot name="name"></slot>
      <slot name="price"></slot>
      <slot name="categoryName"></slot>
      <slot name="id"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 16rem;
  height: 24rem;
  margin-right: 1rem;
  margin-bottom: 1rem;

  .pic {
    margin: 1rem;
    width: 14rem;
    height: 14rem;
    background-color: #29bdc2;
  }

  .desc {
    margin-left: 1rem;
    width: 14rem;
    height: 7rem;
  }
}
</style>
