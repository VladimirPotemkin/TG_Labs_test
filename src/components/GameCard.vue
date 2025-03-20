<script setup>
import { useInventoryStore } from '../store/inventory'
import SkeletonLoader from './SkeletonLoader.vue'

const store = useInventoryStore()
</script>

<template>
  <div class="game-card">
    <div class="game-card__image">
      <SkeletonLoader v-if="!store.gameData" height="200px" />
      <img v-else :src="store.gameData.image" alt="Game image">
    </div>
    
    <div class="game-card__info">
      <SkeletonLoader v-if="!store.gameData" />
      <SkeletonLoader v-if="!store.gameData" />
      <SkeletonLoader v-if="!store.gameData" />
      <SkeletonLoader v-if="!store.gameData" />
      <SkeletonLoader v-if="!store.gameData" />
      <template v-else>
        <h2 class="game-card__title">{{ store.gameData.name }}</h2>
        <p class="game-card__description">{{ store.gameData.description }}</p>

      </template>
    </div>
  </div>
</template>

<style lang="scss">
.game-card {

  width: 236px;
  height: 500px;
  background: #262626;
  border: 1px solid #464646;
  border-radius: 12px;
  margin-right: 24px;

  &__image {
    padding: 18px 14px;
    img {
      width: 100%;
      border-radius: 4px;
    }
  }

  &__info {
    padding: 0 14px;
  }

  &__title {
    margin: 0 auto;
    font-size: 1.5rem;
  }

  &__description {
    color: #666;
    line-height: 1.4;
  }
}
</style>