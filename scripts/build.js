const { executeScript } = require('./utils');
const fs = require('fs');
const path = require('path');

// 获取pages目录下的所有文件夹名称，并且循环构建

const pagesDir = path.resolve(__dirname, '../packages');

const pages = fs.readdirSync(pagesDir);

async function run() {
  for (const page of pages) {
    if(page === 'template') continue;
    const pagePath = path.resolve(pagesDir, page);
    const stat = fs.statSync(pagePath);
    if (stat.isDirectory()) {
      await executeScript(`pnpm build:${page}`);
    }
  }
}


run().catch(error => {
  console.error(error);
});
