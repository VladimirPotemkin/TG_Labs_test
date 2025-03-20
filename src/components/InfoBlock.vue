<script setup>
import { useInventoryStore } from '../store/inventory'
import SkeletonLoader from './SkeletonLoader.vue'

const store = useInventoryStore()


</script>

<template>
  <div class="info-block">
      <SkeletonLoader v-if="!store.gameData" />
      <template v-else>
        <p class="info-block__description">{{ store.gameData.description }}</p>

      </template>
    </div>
</template>

<style lang="scss">
.info-block {
  background: #262626;
  padding: 18px;
  border-radius: 12px;
  border: 1px solid #4d4d4d;
  width: 93%;
  
  &__description {
    background-color: #4d4d4d;
    border-radius: 12px;
    height: 36px;
    padding: 18px;
    
  }
}
</style>