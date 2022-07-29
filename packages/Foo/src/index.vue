<template>
  <button class="my-foo" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineEmits(['click']);
</script>

<style scoped>
.my-foo {
  
}
</style>