// store/inventory.js
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

/**
 * Хранилище для управления состоянием инвентаря
 * Использует Composition API Pinia
 */
export const useInventoryStore = defineStore('inventory', () => {
  // Реактивный массив предметов инвентаря
  const items = reactive([])
  
  // ID выбранного предмета для отображения в модальном окне
  const selectedItemId = ref(null)
  
  // Данные игры (загружаются асинхронно)
  const gameData = ref(null)

  const resetToDefault = () => {
    items.splice(0, items.length, ...initDefaultItems())
    saveToLocalStorage()
  }
  // Инициализация стартовых предметов по умолчанию
  const initDefaultItems = () => [
    { 
      id: 1, 
      color: '#7FAA65', 
      count: 4, 
      x: 0, 
      y: 0, 
      name: 'Зеленый', 
      description: 'Какое-то описание' 
    },
    { 
      id: 2, 
      color: '#AA9765',
      count: 2, 
      x: 1, 
      y: 0, 
      name: 'Желтый', 
      description: 'Какое-то описание' 
    },
    { 
      id: 3, 
      color: '#656CAA', 
      count: 6, 
      x: 2, 
      y: 0, 
      name: 'Синий', 
      description: 'Какое-то описание' 
    }
  ]

  /**
   * Загрузка состояния из localStorage
   * Если данных нет - инициализирует дефолтные значения
   */
  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('inventory')
    if (saved) {
      // Восстановление из сохраненных данных
      const parsed = JSON.parse(saved)
      items.splice(0, items.length, ...parsed)
    } else {
      // Первый запуск - используем дефолтные значения
      items.splice(0, items.length, ...initDefaultItems())
      saveToLocalStorage()
    }
  }

  /**
   * Имитация загрузки данных игры с сервера
    */
  const loadGameData = async () => {
    // Имитация загрузки данных
    await new Promise(resolve => setTimeout(resolve, 1000500))
    
    // Установка моковых данных
    gameData.value = {
      image: 'game-image.jpg',
      name: 'Some name',
      description: 'Some decription'
    }
  }

  // Сохранение текущего состояния в localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('inventory', JSON.stringify(items))
  }

  /**
   * Удаление предмета по ID
   * @param {number} id - Уникальный идентификатор предмета
   */
  const deleteItem = (id) => {
    const index = items.findIndex(item => item.id === id)
    if (index !== -1) {
      items.splice(index, 1)
      saveToLocalStorage()
    }
  }

  /**
   * Перемещение предмета в новую позицию
   * @param {number} id - ID перемещаемого предмета
   * @param {number} newX  - Новая координата X (0-4)
   * @param {number} newY - Новая координата Y (0-4)
   */
  const moveItem = (id, newX, newY) => {
    const item = items.find(i => i.id === id)
    if (!item) return
  
    // Проверка на существующие предметы в ячейке
    const targetItems = items.filter(i => 
      i.x === newX && 
      i.y === newY &&
      i.id !== id
    )
  
    if (targetItems.length > 0) {
      // Отмена перемещения если ячейка занята
      return
    }
  
    // Обновление позиции
    item.x = newX
    item.y = newY
    saveToLocalStorage()
  }
  
  const removeItemQuantity = (itemId, quantity) => {
    const itemIndex = items.findIndex(i => i.id === itemId)
    if (itemIndex === -1) return

    const currentItem = items[itemIndex]
    const newCount = currentItem.count - quantity

    if (newCount > 0) {
      // Частичное удаление
      currentItem.count = newCount
    } else {
      // Полное удаление из инвентаря
      items.splice(itemIndex, 1)
      
      // Сброс выбранного элемента при полном удалении
      if (selectedItemId.value === itemId) {
        selectedItemId.value = null
      }
    }

    saveToLocalStorage() // Сохраняем изменения
  }

  return {
    items,
    selectedItemId,
    gameData,
    loadFromLocalStorage,
    loadGameData,
    deleteItem,
    moveItem,
    resetToDefault,
    removeItemQuantity
  }
})


