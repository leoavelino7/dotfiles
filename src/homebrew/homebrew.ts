import { Logger } from "../logger";
import { $shell, checkCommand } from "../utils";

const install = async () => {
    Logger.error("Homebrew - Read the documentation: https://brew.sh/");
    process.exit(-1);
};

const apps = ["zoxide"].join(" ");

export const homebrew = async () => {
    const exist = await checkCommand("brew -v");
    if (!exist) await install();
    Logger.info("Homebrew - Installing apps");
    await $shell(`brew install ${apps}`)
}