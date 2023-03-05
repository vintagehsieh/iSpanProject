<script>
export default {
    methods: {
        openModal() {
            modalMask.classList.add('active');
        },
        closeModal() {
            modalMask.classList.remove('active');
        }
    }
};
</script>

<template>
    <div class="modal-mask">
        <div class="modal">
            <h2>Modal Title</h2>
            <p>Modal content goes here.</p>
            <button class="close-modal">Close</button>
        </div>
    </div>
</template>

<style lang="scss"scoped>
.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;

    >.modal {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        position: relative;

        >h2 {
            margin-top: 0;
        }

        >.close-modal {
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }

    &:not(.active) {
        display: none;
    }
}
</style>