<script>
export default {

};
</script>

<template>
    <div class="modal-container">
        <div class="modal">
            <div class="header">
                <slot name="header"></slot>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.3);
}

.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    color: rgb(0, 0, 0);
    padding: 20px;

    .header {
        width: 100%;
        height: 3rem;
        display: flex;
    }

    .content {
        width: 100%;
        height: 16rem;
    }
}
</style>