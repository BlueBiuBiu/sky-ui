# 基于Vue 3 + TypeScript + Vite的组件库

## 开发新组件步骤
- 命令行运行`yarn gen`,按照步骤填写后自动生成对应的组件模块
- 生成组件的位置在`packages/components`里面，开发组件时在`此组件的src文件夹开发`，系统自动引用在`此组件的docs/demo.vue预览`的组件进行预览，可实时调试
- 样式文件在`packages/theme-chalk/对应的组件名`,此处修改，系统自动应用到对应的组件中

## 删除组件步骤
- 直接删除`packages/components对应的组件文件`
- 修改`packages/index.ts`文件，去掉该文件内容后面导出该组件的语句，例如
```
export * from './components/Button'
```
- 修改`packages/list.json`文件，去掉该文件内该组件的相关配置，例如
```
{
  "compName":"Button",
  "compZhName":"按钮",
  "compDesc":"这是一个按钮",
  "compClassName":"button"
}
```