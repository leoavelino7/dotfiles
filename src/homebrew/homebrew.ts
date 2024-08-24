import { Logger } from "../logger";
import { $shell, checkCommand } from "../utils";

const install = async () => {
    Logger.error("Homebrew - Read the documentation: https://brew.sh/");
    process.exit(-1);
};

const apps = ["zoxide", "bat", "fzf"];

export const homebrew = async () => {
    const exist = await checkCommand("brew -v");
    if (!exist) await install();
    Logger.info("Homebrew - Installing apps");

    for (const app of apps) {
        Logger.info("\nHomebrew - Installing - ", app);
        await $shell(`brew install ${app}`);
        Logger.info("Homebrew - Installed - ", app);
    }
};
