<script>
export default {};
</script>

<template>
    <div class="scrollable-container" @scroll.prevent="handleScroll">
        <div class="scrollable-content">
            <!-- Your content goes here -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.scrollable-container {
    width: 20rem;
    height: 400px;
    /* Set the height of the container */

    overflow-y: scroll;
    /* Enable vertical scrolling */

    &::-webkit-scrollbar {
        display: none;
    }
}

.scrollable-content {
    /* Set the height and width of the content */
    height: 800px;
    min-height: 400px;
    width: 100%;
    /* Add some padding to the content to prevent it from sticking to the sides of the container */
    padding: 10px;
    background-color: #ff9500;
}
</style>