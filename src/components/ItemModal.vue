<script setup>
import { ref, computed } from 'vue' 
import { useInventoryStore } from '../store/inventory'
import SkeletonLoader from './SkeletonLoader.vue'


const store = useInventoryStore()
const isDeleting = ref(false)
const quantityInput = ref(null)

const selectedItem = computed(() => 
  store.items.find(item => item.id === store.selectedItemId)
)

const handleDelete = () => {
  isDeleting.value = true
  setTimeout(() => quantityInput.value?.focus(), 0)
}

const confirmDelete = () => {
  const quantity = parseInt(quantityInput.value?.value || 0)
  if (quantity > 0 && quantity <= selectedItem.value.count) {
    store.removeItemQuantity(store.selectedItemId, quantity)
    closeModal()
  }
}

const closeModal = () => {
  store.selectedItemId = null
}
</script>

<template>
  <div class="modal">
    <button class="modal__close" @click="closeModal">
      <img src="../assets/close.png" alt="" class="close__img">
    </button>
    <div class="modal__content">
      <div class="modal__image">
        <div class="modal__item-preview">
        <div 
          class="item-preview"
          :style="{ backgroundColor: selectedItem.color }"
        >
        </div>
      </div>
    </div>
    <div class="modal__line"></div>
      <SkeletonLoader v-if="!store.gameData" />
      <SkeletonLoader v-if="!store.gameData" />
      <SkeletonLoader v-if="!store.gameData" />
      <SkeletonLoader v-if="!store.gameData" />
      <SkeletonLoader v-if="!store.gameData" />
      <template v-else>
        <h3 class="modal__title">{{ selectedItem.name }}</h3>
        <p class="modal__description">{{ selectedItem.description }}</p>
      </template>
      <div class="modal__line bottom" v-if="!isDeleting"></div>

      <div class="modal__actions">
        <template v-if="!isDeleting">
          <button class="modal__button modal__button--delete" @click="handleDelete">
            Удалить
          </button>
        </template>

        <!-- Режим ввода количества -->
        <template v-else>
          <input 
            type="number" 
            class="modal__quantity-input" 
            placeholder="Количество" 
            min="1" 
            :max="selectedItem.count"
            ref="quantityInput"
          />
          <div class="btns">
            <button class="modal__button" @click="closeModal">
            Отмена
          </button>
          <button class="modal__button modal__button--delete" @click="confirmDelete">
            Подтвердить
          </button>
          
        </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;


  &__close {
    position: absolute;
    top: 35px;
    right: 475px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1000; 
  }

  &__content {
    position: absolute;
    top: 26px;
    right: 465px;
    z-index: 1;
    background: white;
    padding: 24px;
    border: 1px solid #4d4d4d;
    border-radius: 0 12px 12px 0;
    background-color: #262626;
    opacity: 0.9;
    height: 500px;
    width: 250px;
    
  }

  &__line {
    height: 2px;
    background: #4d4d4d;
    margin-bottom: 16px;

    &.bottom {
      height: 1px;
    }
  }

  

  &__image {
    img {
      width: 100%;
      border-radius: 4px;
    }
  }

  &__title {
    margin: 0 0 12px;
  }

  &__description {
    color: #666;
    margin: 0 0 20px;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: flex-end;
  }

  &__button {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 12px;
    cursor: pointer;
    &:hover {
      
      box-shadow: 0px 0px 5px  #fff;
    }
    

    
    &--delete {
      width: 100%;
      background: #ff4444;
      color: white;
      border-color: #ff4444;

    
    }
  }
  &__quantity-input {
    padding: 8px;
    border: 1px solid #4d4d4d;
    border-radius: 12px;
    background: #262626;
    color: white;
    
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

.item-preview {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-bottom: 30px;
}

.btns {
  display: flex;
  gap: 20px;
}
</style>