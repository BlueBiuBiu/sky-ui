import fs from 'fs'
import handlebars from 'handlebars'
import path from 'path'
import { outputFile } from "fs-extra"
const __dirname = path.resolve();

const installTsTplReplacer = async (listFileContent) => {

  // 组件列表
  const listFrom = path.resolve(__dirname,'packages/list.json')

  // 组件导出入口
  const indexFrom = path.resolve(__dirname,'packages/index.ts')

  //组件对应的样式文件创建
  const styleFile = path.resolve(__dirname,`packages/theme-chalk/${listFileContent.compClassName}.scss`)

  // 设置输入输出路径
  const installFileFrom = path.resolve(__dirname,'scripts/genNewComp/.template/install.ts.tpl')
  const docsDemoFileFrom = path.resolve(__dirname,'scripts/genNewComp/.template/demo.vue.tpl')
  const docsReadmeFileFrom = path.resolve(__dirname,'scripts/genNewComp/.template/readme.md.tpl')
  const indexFileFrom = path.resolve(__dirname,'scripts/genNewComp/.template/index.vue.tpl')
  // 组件文件夹
  const installFolder = path.resolve(__dirname,`packages/components/${listFileContent.compName}`)
  const installFileTo = path.resolve(__dirname,`packages/components/${listFileContent.compName}/index.ts`)
  // docs文件夹
  const docsFolder = path.resolve(__dirname,`packages/components/${listFileContent.compName}/docs`)
  const docsFileToDemo = path.resolve(__dirname,`packages/components/${listFileContent.compName}/docs/demo.vue`)
  const docsFileToReadme = path.resolve(__dirname,`packages/components/${listFileContent.compName}/docs/readme.md`)
  // src文件夹
  const srcFolder = path.resolve(__dirname,`packages/components/${listFileContent.compName}/src`)
  const srcFileTo = path.resolve(__dirname,`packages/components/${listFileContent.compName}/src/index.vue`)
  // style文件夹
  const styleFolder = path.resolve(__dirname,`packages/components/${listFileContent.compName}/style`)
  const styleFileTo = path.resolve(__dirname,`packages/components/${listFileContent.compName}/style/index.ts`)

  // 是否已存在该组件
  let isExistComp = false
  let writeProcess = 0

  // 创建组件文件夹
  try {
    await fs.promises.access(path.resolve(__dirname,installFolder), fs.constants.F_OK | fs.constants.W_OK);
    isExistComp = true
    console.log('已存在该组件，不可重复创建');
  } catch (err) {
    fs.mkdirSync(installFolder, {recursive: true})
  }

  if(isExistComp) return

  // 创建docs文件夹
  fs.access(path.resolve(__dirname,docsFolder), fs.constants.F_OK, (err) => {
    if(err) {
      fs.mkdirSync(docsFolder, {recursive: true})
    }
  });

  // 创建src文件夹
  fs.access(path.resolve(__dirname,srcFolder), fs.constants.F_OK, (err) => {
    if(err) {
      fs.mkdirSync(srcFolder, {recursive: true})
    }
  });

  // 创建style文件夹
  fs.access(path.resolve(__dirname,styleFolder), fs.constants.F_OK, (err) => {
    if(err) {
      fs.mkdirSync(styleFolder, {recursive: true})
    }
  });

  // 写入到组件列表JSON配置文件
  let ComponentLists = fs.readFileSync(listFrom, 'utf-8')
  ComponentLists = JSON.parse(ComponentLists)
  ComponentLists.push({
    "compName": `${listFileContent.compName}`,
    "compZhName": `${listFileContent.compZhName}`,
    "compDesc": `${listFileContent.compDesc}`,
    "compClassName": `${listFileContent.compClassName}`
  })
  outputFile(listFrom, JSON.stringify(ComponentLists), err => {
    if (err) console.log(err)
    else console.log(`组件列表配置写入成功`);
  })

  // 单个导出写入/packages/index.ts文件中
  const singleExport = `
    export * from './components/${listFileContent.compName}'
  `
  outputFile(indexFrom, singleExport,{flag: 'a+'}, err => {
    if (err) console.log(err)
    else console.log(`单个导出配置写入成功`);
  })

  // 组件样式引入文件引入到每个对应的style
  const styleImport = `
  import '/packages/theme-chalk/${listFileContent.compClassName}.scss'
  `
  outputFile(styleFileTo, styleImport,{flag: 'a+'}, err => {
    if (err) console.log(err)
    else console.log(`组件样式引入写入成功`);
  })

  // 组件样式文件创建
  const styleCreate = `
    @use 'component-base' as *;
    @use 'mixins/mixins' as *;
    @use 'sass:map';
  `
  outputFile(styleFile, styleCreate,{flag: 'a+'}, err => {
    if (err) console.log(err)
    else console.log(`组件样式创建成功`);
  })

  // 读取模板内容
  const installFileTpl = fs.readFileSync(installFileFrom, 'utf-8')
  const docsDemoFileTpl = fs.readFileSync(docsDemoFileFrom, 'utf-8')
  const docsReadmeFileTpl = fs.readFileSync(docsReadmeFileFrom, 'utf-8')
  const indexFileTpl = fs.readFileSync(indexFileFrom, 'utf-8')
  
  // 使用 handlebars 替换模板内容
  const installFileContent = handlebars.compile(installFileTpl)(listFileContent)
  const docsDemoFileContent = handlebars.compile(docsDemoFileTpl)(listFileContent)
  const docsReadmeFileContent = handlebars.compile(docsReadmeFileTpl)(listFileContent)
  const indexFileContent = handlebars.compile(indexFileTpl)(listFileContent)

  // 渲染模板并输出至指定目录
  outputFile(installFileTo, `${installFileContent}`,{flag: 'a+'}, err => {
    writeProcess += 25
    if (err) console.log(err)
    else console.log(`写入模板进度${writeProcess}%`);
  })
  outputFile(docsFileToDemo, `${docsDemoFileContent}`,{flag: 'a+'}, err => {
    writeProcess += 25
    if (err) console.log(err)
    else console.log(`写入模板进度${writeProcess}%`);
  })
  outputFile(docsFileToReadme, `${docsReadmeFileContent}`,{flag: 'a+'}, err => {
    writeProcess += 25
    if (err) console.log(err)
    else console.log(`写入模板进度${writeProcess}%`);
  })
  outputFile(srcFileTo, `${indexFileContent}`,{flag: 'a+'}, err => {
    writeProcess += 25
    if (err) console.log(err)
    else console.log(`写入模板进度${writeProcess}%`);
  })
}

export default installTsTplReplacer