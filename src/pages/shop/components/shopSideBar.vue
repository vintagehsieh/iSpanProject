<template>
    <nav id="vision_menu">
        <ul class="CleanList">
            <li><a href="/List/3">發燒音樂</a></li>
            <li><a href="/PreGoods.php">韓國流行音樂</a></li>
            <li><a href="/release.php">日本流行音樂</a></li>
            <li><a href="/List/4">華語流行音樂</a></li>
            <li><a href="/List/4">西洋流行音樂</a></li>
        </ul>
    </nav>
</template>



<style lang="scss" scoped>
.CleanList {
    padding-top: 5rem;
    width: 14rem;
    height: 25rem;

    li {
        width: 100%;
        height: 20%;
        padding: 1rem;
        font-size: 2rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        border-bottom: 2px dashed grey;

        a {
            text-decoration: none;
            color: rgb(37, 95, 171);
        }

        &:hover {
            background-color: rgb(139, 95, 38);

            a {
                color: white;
            }
        }
    }
}
</style>
