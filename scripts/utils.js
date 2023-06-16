const { exec } = require('child_process');
const { readdirSync } = require('fs');

 function executeScript(script) {
  const child = exec(script);

  child.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  child.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log('脚本执行成功');
    } else {
      console.error('脚本执行失败');
    }
  });
}

function getSubdirectories(dir) {
  try {
    const dirents = readdirSync(dir, { withFileTypes: true });
    const subdirectories = dirents
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    return subdirectories;
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}

module.exports = {
  executeScript,
  getSubdirectories,
};
