const inquirer = require('inquirer');
const { executeScript } = require('./utils');

const menuQuestions = [
  {
    type: 'list',
    name: 'option',
    message: '请选择一个选项启动项目：',
    "dev: ": "pnpm --dir packages/interview docs:dev",
    choices: ['dev:home', 'dev:nodejs', 'dev:interview', 'dev:algorithm', 'dev:linux'],
  },
];

inquirer.prompt(menuQuestions).then((answers) => {
  const selectedOption = answers.option;
  switch (selectedOption) {
    case 'dev:home':
      executeScript('pnpm --dir packages/home dev');
      break;
    case 'dev:nodejs':
      executeScript('pnpm --dir packages/nodejs docs:dev');
      break;
    case 'dev:interview':
      executeScript('pnpm --dir packages/interview docs:dev');
      break;
    case 'dev:algorithm':
      executeScript('pnpm --dir packages/algorithm docs:dev');
      break;
    case 'dev:linux':
      executeScript('pnpm --dir packages/linux docs:dev');
      break;

    default:
      console.log('没有匹配的选项');
  } // end switch
});


