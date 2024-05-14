import { exec } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { Logger } from "./logger";

export const $shell = promisify(exec);

export const trim = (str: string) => str.trim().replace(/\n/g, "");

export const home = (...names: string[]) =>
    path.resolve(os.homedir(), ...names);

export const checkCommand = async (command: string) => {
    try {
        const { stderr } = await $shell(`${command} 2>&1`);
        if (!stderr) {
            Logger.info(`[${command}] already installed...`);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};