<script setup>
defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '16px'
  }
})
</script>

<template>
  <div 
    class="skeleton-loader"
    :style="{ 
      width: width,
      height: height 
    }"
  ></div>
</template>

<style lang="scss">
@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-loader {
  background: linear-gradient(0deg, #3C3C3C 0%, #444444 51%, #333333 100%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite linear;
  border-radius: 12px;
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>