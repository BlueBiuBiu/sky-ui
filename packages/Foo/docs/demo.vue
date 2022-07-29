<template>
  <div>
    <sky-foo @click="onClick(1)">第一个</sky-foo>
    <sky-foo @click="onClick(2)">第二个</sky-foo>
    <sky-foo @click="onClick(3)">第三个</sky-foo>
  </div>
</template>

<script lang="ts" setup>
const onClick = (num) => { console.log(`我是第 ${num} 个自定义按钮`) }
</script>