import { App, Plugin } from 'vue';

const modulesFiles: any = import.meta.glob('./components/*/*.ts', { eager: true})

function install(app: App) { 
  Object.keys(modulesFiles).forEach((file: any) => {
    const reg = /^(\.\/)(components\/)(.*)(\/index.ts)$/gi
    const cName = file.replace(reg, '$3') // console.log(name); // Button    
    const pluginName = `${cName}Plugin`
    modulesFiles[file][pluginName].install?.(app);
  })
}

export default install;
export * from './components/Button'