#!/usr/bin/env node
const program = require("commander"); //用于捕获命令
const chalk = require("chalk"); //用于字体加色
const download = require("download-git-repo"); //用于下载git的包
const inquirer = require("inquirer"); //用于与用户输入做交互
const symbols = require("log-symbols"); //信息前面加✔或✖

program
  .version(require("../package").version, "-v,--version")
  .command("init <name>")
  .action(async (name) => {
    try {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "Dear",
          message: "请输入你的名字",
        },
      ]);
      console.log(`Dear ${answers.Dear} 项目将继续完善~你愿意加入其中嘛`);
      await new Promise((resolve, reject) => {
        download(
          "direct:https://github.com/wang-xin-yuan-001/NodeTemplate.git#main",
          name,
          { clone: true },
          (err) => {
            if (err) {
              reject(err);
            } else {
              console.log(symbols.success, chalk.green("创建项目成功"));
              resolve();
            }
          }
        );
      });
    } catch (err) {
      console.error(chalk.red(`Error: ${err.message}`));
    }
  });


program.parse(process.argv);
