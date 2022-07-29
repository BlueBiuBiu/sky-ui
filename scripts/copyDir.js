import fs from "fs"
import { resolve } from "path"
const __dirname = resolve()

// 复制文件夹
fs.promises.cp(resolve(__dirname, "./packages"), resolve(__dirname, "./docs"),{ recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
})