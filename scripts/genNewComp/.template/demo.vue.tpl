<template>
  <div>
    <my-{{ compClassName }} @click="onClick(1)">第一个</my-{{ compClassName }}>
    <my-{{ compClassName }} @click="onClick(2)">第二个</my-{{ compClassName }}>
    <my-{{ compClassName }} @click="onClick(3)">第三个</my-{{ compClassName }}>
  </div>
</template>

<script lang="ts" setup>
const onClick = (num) => { console.log(`我是第 ${num} 个自定义按钮`) }
</script>