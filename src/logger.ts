import chalk from "chalk";

const log = console.log;

export namespace Logger {
    export const error = (...data: any[]) => log(chalk.red(...data)); 
    export const warn = (...data: any[]) => log(chalk.yellow(...data)); 
    export const info = (...data: any[]) => log(chalk.blue(...data)); 
}