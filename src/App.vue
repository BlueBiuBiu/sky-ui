<template>
  <div class="my-kit-doc">
    <aside>
      <h2>组件</h2>
      <router-link v-for="(link, index) in data.links" :key="index" :to="link.path" @click="linkClick(link)">{{ link.name }}</router-link>
    </aside>
    <main>
      <div class="example">
        <router-view></router-view>
        <preview class="preview" v-if="isShowSource" v-bind="currentPreview.data"/>
        <div class="operate">
          <img class="icon" @click="viewSource" src="~@/assets/images/op.png" alt="">
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import ComponentList from '/packages/list.json';
import { reactive, ref } from 'vue'
import Preview from "./components/preview.vue"

const data = reactive({
  links: ComponentList.map(item => ({
    path: `/components/${item.compName}`,
    name: item.compZhName,
    compName: item.compName
  }))
})

// 当前组件
let currentPreview = reactive({
  data: {
    compName: 'Button',
    demoName: 'demo'
  }
})

// 侧边栏链接点击
const linkClick = (link) => {
  currentPreview.data = {
    compName: link.compName,
    demoName: 'demo'
  }
}

let isShowSource = ref(false)
// 
const viewSource = () => {
  isShowSource.value = !isShowSource.value
}
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
.my-kit-doc {
  width: 100%;
  display: flex;
  min-height: 100vh;
  aside {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    padding: 15px;
    border-right: 1px solid #ccc;
  }
  main {
    width: 100%;
    flex: 1;
    padding: 15px;
  }
  .example {
    width: 100%;
    border: 1px solid #ebedf0;

    .markdown-body {
      margin: 20px;
    }

    .preview {
      margin: 20px;
    }

    .operate {
      display: flex;
      justify-content: flex-end;
      cursor: pointer;
      border-top: 1px solid #ebedf0;
      padding: 5px 10px;

      .icon {
        width: 25px;
        height: 25px;
      }
    }
  }
}
</style>