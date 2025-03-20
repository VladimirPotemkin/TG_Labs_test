<script setup>
import { onMounted } from 'vue'
import GameCard from './components/GameCard.vue'
import InventoryGrid from './components/InventoryGrid.vue'
import ItemModal from './components/ItemModal.vue'
import InfoBlock from './components/InfoBlock.vue'
import { useInventoryStore } from './store/inventory'

const store = useInventoryStore()

const handleReset = () => {
  if (confirm('Вы уверены что хотите сбросить инвентарь?')) {
    store.resetToDefault()
  }
}

onMounted(() => {
  store.loadFromLocalStorage()
  store.loadGameData()
})
</script>

<template>
  <button 
    class="reset-button"
    @click="handleReset"
  >
    Сбросить инвентарь
  </button>
  <div class="wrapper">
    <GameCard />
    <InventoryGrid />
    <InfoBlock />
    <ItemModal v-if="store.selectedItemId" />
  </div>
</template>

<style scoped>

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100vh;
  width: 100%;
  max-width: 849px;
  max-height: 660px;
  margin: 0 auto;
}

.reset-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 20px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #cc0000;
  }

  &:active {
    transform: scale(0.95);
  }
}

</style>
