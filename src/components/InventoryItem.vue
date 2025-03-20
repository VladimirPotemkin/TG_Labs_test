<!-- components/InventoryItem.vue -->
<script setup>
import { useInventoryStore } from '../store/inventory'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const store = useInventoryStore()

/**
 * Обработчик клика по предмету
 * Устанавливает выбранный ID для отображения модального окна
 */
const handleClick = () => {
  store.selectedItemId = props.item.id
}
</script>

<template>
  
  <div 
    class="inventory-item"
    :style="{ '--item-color': item.color,
      backgroundColor: item.color }"
      @click="handleClick"
  >
    <!-- Отображение количества предметов -->
    <span class="inventory-item__count">{{ item.count }}</span>
  </div>
</template>

<style lang="scss">



.inventory-item {
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
  cursor: grab; 
  display: flex;
  align-items: end;
  justify-content: end;
  transition: transform 0.1s ease;
  user-select: none;
  box-shadow: 
    5px -5px 2px 0px var(--item-color); 

  &:active {

    cursor: grabbing;
    transform: scale(1.1);
    z-index: 10 !important; 
  }

  &__count {
    position: absolute;
    bottom: -25px;
    right: -27px;
    padding: 2px 7px;
    color: white;
    background-color: #262626;
    text-align: end;
    border: 1px solid #4d4d4d;
    border-radius: 8px 0 0 0;
  }
}
</style>