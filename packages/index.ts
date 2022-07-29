import { App, Plugin } from 'vue';

const modulesFiles: any = import.meta.glob('./*/*.ts', { eager: true})

function install(app: App) { 
  Object.keys(modulesFiles).forEach((file: any) => {
    const reg = /^(\.\/)(.*)(\/index.ts)$/gi
    const name = file.replace(reg, '$2') // console.log(name); // Button
    const pluginName = `${name}Plugin`
 
    modulesFiles[file][pluginName].install?.(app);
  })
}

export default install;
export * from './Button'

    export * from './Foo'
  