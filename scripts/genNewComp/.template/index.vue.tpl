<template>
  <button class="my-{{ compClassName }}" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineEmits(['click']);
</script>

<style scoped>
.my-{{ compClassName }} {
  
}
</style>