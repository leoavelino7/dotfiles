import { homebrew } from "./homebrew/homebrew";
import { espanso } from "./espanso/espanso";
import { Logger } from "./logger";

type ExecFn = () => void;

const map = {
    homebrew,
    espanso,
    default: () => Logger.warn("Nothing to do"),
} satisfies Record<string, ExecFn>;

type Functions = keyof typeof map;

async function main() {
    const key: Functions = (process.argv.slice(2)[0] as any) || "default";
    const fn = map[key];
    return fn();
}

main();
