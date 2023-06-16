const inquirer = require('inquirer');
const { executeScript } = require('./utils');

const menuQuestions = [
  {
    type: 'list',
    name: 'option',
    message: '请选择一个选项：',
    "dev: ": "pnpm --dir packages/interview docs:dev",
    choices: ['dev:nodejs', 'dev:interview','dev:algorithm'],
  },
];

inquirer.prompt(menuQuestions).then((answers) => {
  const selectedOption = answers.option;
  switch (selectedOption) {
  case 'dev:nodejs':
    executeScript('pnpm --dir packages/nodejs docs:dev');
    break;
  case 'dev:interview':
    executeScript('pnpm --dir packages/interview docs:dev');
    break;
  case 'dev:algorithm':
    executeScript('pnpm --dir packages/algorithm docs:dev');
    break;
  default:
    console.log('没有匹配的选项');
  } // end switch
});


