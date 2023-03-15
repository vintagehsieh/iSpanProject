<template>
    <div class="card">
        <div class="pic">
            <slot name="picture"></slot>
        </div>
        <div class="desc">
            <slot name="categoryName"></slot>
            <slot name="name"></slot>
            <slot name="price"></slot>
            <slot name="id"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    width: 16rem;
    height: 24rem;
    margin-right: 3rem;
    margin-bottom: 5rem;
    background-color: #1f2124;
    box-shadow: rgba(255 255 255 / 10%) 1px 1px 6px 0;
    border-radius: 8px;

    .pic {
        margin: 1rem;
        width: 14rem;
        height: 14rem;
        border-radius: 8px 8px 8px 8px;
        background-color: #f19090;
        opacity: 70%;
    }

    .desc {
        margin-left: 1rem;
        margin-top: -1rem;
        margin-bottom: -1rem;
        width: 14rem;
        height: 6rem;
        border-radius: 0 0 8px 8px;
        padding-block: 1rem;
    }
}
</style>
