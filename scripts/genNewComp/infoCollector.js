import inquirer from'inquirer'

// FooBar --> foo-bar
const kebabCase = string => string
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .replace(/[\s_]+/g, '-')
  .toLowerCase();

export default async () => {
  const meta = await inquirer
    .prompt([
      {
        type: 'input',
        message: '请输入你要新建的组件名（纯英文，大写开头）：',
        name: 'compName',
      },
      {
        type: 'input',
        message: '请输入你要新建的组件名（中文）：',
        name: 'compZhName',
        default: '默认组件名'
      },
      {
        type: 'input',
        message: '请输入组件的功能描述：',
        name: 'compDesc',
        default: '默认：这是一个新组件'
      }
    ])
  const { compName } = meta
  meta.compClassName = kebabCase(compName)
  /**
   * console.log(meta); // 打印结果如下
   {
      compName: 'SkyBlueName',
      compZhName: '测试',
      compDesc: '默认：这是一个新组件',
      compClassName: 'sky-blue-name'
    }
   */
  return meta
}
