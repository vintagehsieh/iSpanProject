<script>
export default {}
</script>

<template>
    <div class="container">
        <div class="header">
            <span id="categoryName" style="font-size:100px; color: black">{{ this.sharedData.category.name }}</span>
        </div>
        <div class="body">
            <Card v-for="item in items" :key="item.id">
            </Card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100vh;
    background-color: #9d5a5a;
}
</style>