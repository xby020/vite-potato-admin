import shell from 'shelljs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import * as fs from 'fs/promises';
import dotenv from 'dotenv';
import { execSync } from 'child_process';

const release = async () => {
  // Load environment variables
  dotenv.config();

  // Get the current version
  const pkg = JSON.parse(await fs.readFile('./package.json', 'utf-8'));

  const commit = execSync('git show -s --format=%H').toString().trim(); //当前提交的版本号
  let name = execSync('git show -s --format=%cn').toString().trim(); //姓名
  let email = execSync('git show -s --format=%ce').toString().trim(); //邮箱
  let date = new Date(execSync('git show -s --format=%cd').toString()); //日期
  let message = execSync('git show -s --format=%s').toString().trim(); //说明
  const lastCommit = `${new Array(80).join(
    '='
  )}\ngit:${commit}\n作者:${name}<${email}>\n日期:${
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes()
  }\n说明:${message}\n${new Array(80).join('=')}`;

  console.log(
    chalk.yellow(
      [
        '',
        '██████╗  ██████╗ ████████╗ █████╗ ████████╗ ██████╗ ',
        '██╔══██╗██╔═══██╗╚══██╔══╝██╔══██╗╚══██╔══╝██╔═══██╗',
        '██████╔╝██║   ██║   ██║   ███████║   ██║   ██║   ██║',
        '██╔═══╝ ██║   ██║   ██║   ██╔══██║   ██║   ██║   ██║',
        '██║     ╚██████╔╝   ██║   ██║  ██║   ██║   ╚██████╔╝',
        '╚═╝      ╚═════╝    ╚═╝   ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ',
        ''
      ].join('\n')
    )
  );

  console.log('');
  console.log(
    chalk.green('--- 🛠️  欢迎使用 🥔Potato🥔 自动化发布工具V1.0.0 🛠️  ---')
  );
  console.log('');

  // output the current version
  console.log(
    chalk.green('📂 当前开发项目:'),
    chalk.yellow(process.env.VITE_APP_TITLE)
  );
  console.log(chalk.green('🔎 当前版本号:'), chalk.yellow(pkg.version));

  // output the last commit
  console.log(chalk.green('\n🥔 最后一次提交:'));
  console.log(chalk.yellow(lastCommit));

  // no git
  if (!shell.which('git')) {
    shell.echo('❗您的系统中没有 Git,或者 Git 指令无法使用');
    shell.exit(1);
  }

  const res1 = await inquirer.prompt([
    {
      type: 'list',
      name: 'env',
      message: '请选择发布环境',
      choices: ['dev', 'test', 'prod']
    }
  ]);

  console.log(res1);
};

release();
