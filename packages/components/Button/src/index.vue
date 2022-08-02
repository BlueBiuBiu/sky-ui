<template>
  <button 
    :type="nativeType"
    :size="nativeSize"
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(size),
    ]
    "
    >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import "../style"
import { defineProps } from "vue"
import { useNamespace } from "/packages/hooks"
import { buttonProps } from './index'

defineProps(buttonProps)

const ns = useNamespace('button')

</script>
