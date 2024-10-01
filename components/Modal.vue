<template>
    <Teleport v-if="isOpen" to="body">
        <div class="modal fadein" ref="modal">
            <div class="modal-dialog">
                <button class="btn btn-primary btn-icon exit" @click="closeModal">
                    <i class="fas fa-xmark"></i>
                </button>
                <div class="modal-content card">
                    <slot />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
const modal = ref()

const emit = defineEmits(['close'])
const { isOpen } = defineProps({
    isOpen : {
        default: false,
        type: Boolean
    }
})

const closeModal = () => {
    modal.value.classList.remove('fadein')
	modal.value.classList.add('fadeout')

	
	modal.value.addEventListener('animationend', () => {
        emit('close')
	})
}
</script>

<style lang="scss" scoped>
.modal{
    width: 100vw;
    height: 100vh;
    
    z-index: 999;
    
    position: absolute;
    top: 0;
    left: 0;

    display: grid;
    place-content: center;
    background-color: rgba(5, 16, 28, 0.5);
    
    .modal-dialog{
        background-color: rgba(5, 16, 28, 0.5);
        position: relative;

        .exit{
            position: absolute;
            top: -25px;
            right: -25px;

            i{
                font-size: 1.25em;
            }

        }

        .modal-content{
            max-height: 90vh;
            overflow-y: auto;
        }
    }
}
</style>