import { Logger } from "../logger";
import { checkCommand } from "../utils";

const install = async () => {
    Logger.error("Homebrew - Read the documentation: https://brew.sh/");
    process.exit(-1);
};

export const homebrew = async () => {
    const exist = await checkCommand("brew -v");
    if (!exist) await install();
}