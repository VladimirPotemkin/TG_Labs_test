<script setup>
import { ref, onUnmounted, nextTick } from 'vue'
import InventoryItem from './InventoryItem.vue'
import { useInventoryStore } from '../store/inventory'

const store = useInventoryStore()

// Состояние перетаскивания
const dragItem = ref(null)
const startX = ref(0)
const startY = ref(0)

// Константы инвентаря
const CELL_SIZE = 99
const GRID_SIZE = 5    

/**
  Обработчик начала перетаскивания
 @param {Object} item 
  @param {Event} event 
 */
const handleMouseDown = (item, event) => {
  event.preventDefault() // Предотвращаем стандартное поведение
  
  // Инициализация перетаскивания
  dragItem.value = item
  startX.value = event.clientX
  startY.value = event.clientY

  // Подготовка DOM-элемента
  const itemEl = event.target.closest('.inventory-item')
  if (itemEl) {
    itemEl.style.transition = 'none' 
    itemEl.classList.add('dragging') 
  }

  // Навешиваем обработчики перемещения
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

/**
 * Обработчик движения мыши при перетаскивании
 * @param {Event} event - Событие мыши
 */
const handleMouseMove = (event) => {
  if (!dragItem.value) return // Выходим если не перетаскиваем

  // Получаем DOM-элемент перетаскиваемого предмета
  const itemEl = document.querySelector('.inventory-item.dragging')
  if (!itemEl) return

  // Рассчитываем смещение относительно начальной позиции
  const deltaX = event.clientX - startX.value
  const deltaY = event.clientY - startY.value

  // Применяем трансформацию для визуализации перетаскивания
  itemEl.style.transform = `translate(${deltaX}px, ${deltaY}px)`
}
const getItemStyle = (index) => ({
  zIndex: index + 1,
  transform: `translate(${index * 5}px, ${index * 5}px)`
})
/**
 * Обработчик завершения перетаскивания
 * @param {Event} event - Событие мыши
 */
const handleMouseUp = async (event) => {
  if (!dragItem.value) return // Выходим если не было перетаскивания

  // Сбрасываем стили перетаскиваемого элемента
  const itemEl = document.querySelector('.inventory-item.dragging')
  if (itemEl) {
    itemEl.style.transition = 'transform 0.2s' // Включаем анимацию
    itemEl.style.transform = 'none'            // Сбрасываем позицию
    itemEl.classList.remove('dragging')        // Удаляем класс
  }

  // Получаем координаты сетки инвентаря
  const gridEl = document.querySelector('.inventory')
  const rect = gridEl.getBoundingClientRect()

  // Рассчитываем новую позицию с учетом границ
  const newX = Math.max(
    0,
    Math.min(
      GRID_SIZE - 1,
      Math.floor((event.clientX - rect.left) / CELL_SIZE)
    )
  )
  const newY = Math.max(
    0,
    Math.min(
      GRID_SIZE - 1,
      Math.floor((event.clientY - rect.top) / CELL_SIZE)
    )
  )

  // Проверяем доступность ячейки
  const cellOccupied = store.items.some(i => 
    i.x === newX && 
    i.y === newY &&
    i.id !== dragItem.value.id
  )

  // Перемещаем если ячейка свободна
  if (!cellOccupied) {
    store.moveItem(dragItem.value.id, newX, newY)
  }

  // Сбрасываем состояние перетаскивания
  dragItem.value = null

  // Очищаем обработчики
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

/**
 * Обработчик клика по ячейке инвентаря
 * @param {Event} event - Событие клика
 */
const handleCellClick = async (event) => {
  await nextTick() // Ждем завершения всех обновлений DOM

  // Игнорируем клики во время перетаскивания
  if (dragItem.value) return

  // Находим кликнутый предмет
  const itemEl = event.target.closest('.inventory-item')
  if (itemEl) {
    const itemId = parseInt(itemEl.dataset.id)
    if (!isNaN(itemId)) {
      store.selectedItemId = itemId // Открываем модальное окно
    }
  }
}

// Очистка при размонтировании компонента
onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})

</script>

<template>
  <div class="inventory">
    <div class="inventory__row" v-for="y in 5" :key="y">
      <div 
        v-for="x in 5" 
        :key="x"
        class="inventory__cell"
        @mouseup="handleMouseUp"
        @click="handleCellClick"
      >
        <InventoryItem
          v-for="(item, index) in store.items.filter(i => i.x === x-1 && i.y === y-1)"
          :key="item.id"
          :item="item"
          :data-id="item.id"
          :style="getItemStyle(index)"
          @mousedown="handleMouseDown(item, $event)"

        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.inventory {
  overflow: hidden;
  border: 1px solid #4d4d4d;
  border-radius: 12px;

  &__row {
    display: flex;
    border-bottom: 1px solid #4d4d4d;
 
    
    &:last-child {
      margin-bottom: 0;
      border: none;
    }
  }

  &__cell {
    width: 105px;
    height: 99px;
    border-right: 1px solid #4d4d4d;
    position: relative;
    background: #262626;

    &:hover {
      background: #4d4d4d;
    }



    &:last-child {
      border: none;
    }
  }
}

.inventory-item {
  pointer-events: auto;
  transition: transform 0.2s;
  
  &:hover {
    z-index: 10 !important;
  }
}
</style>