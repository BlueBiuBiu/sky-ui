<template>
  <pre class="language-html"><code class="language-html">{{ sourceCode }}</code></pre>
</template>

<script>
import Prism from 'prismjs';
import '../assets/prism.css'; // 主题 CSS

export default {
  props: {
    /** 组件名称 */
    compName: {
      type: String,
      default: '',
      require: true,
    },
    /** 要显示代码的组件 */
    demoName: {
      type: String,
      default: '',
      require: true,
    },
  },
  data() {
    return {
      sourceCode: '',
    };
  },
  async mounted() {
    this.sourceCode = (
      await import(/* @vite-ignore */ `../../packages/${this.compName}/docs/${this.demoName}.vue?raw`)
    ).default;
    await this.$nextTick(); // 确保在源码都渲染好了以后再执行高亮
    Prism.highlightAll();
  }
}
</script>