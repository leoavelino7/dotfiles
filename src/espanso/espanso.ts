import fs from "node:fs/promises";
import path from "node:path";
import yaml from "yaml";
import { $shell, checkCommand, trim } from "../utils";
import { createEspansoConfig } from "./espanso.config";

const espansoConfigDefaults = {
    toggle_key: "OFF",
    search_shortcut: "off",
    auto_restart: true,
};

const install = async () => {
    console.log("Espanso - Installing");
    // https://espanso.org/docs/install/linux/#deb-x11
    await $shell(
        "wget https://github.com/federico-terzi/espanso/releases/download/v2.2.1/espanso-debian-x11-amd64.deb",
    );

    await $shell("sudo apt install ./espanso-debian-x11-amd64.deb");

    await $shell("rm ./espanso-debian-x11-amd64.deb");

    console.log("Espanso - Installed");
};

const configEspanso = async () => {
    const result = await $shell("espanso path config");
    const espansoPath = trim(result.stdout);
    if (!espansoPath) return process.exit(1);

    const matches = path.join(espansoPath, "match");
    const config = path.join(espansoPath, "config");
    const baseYml = path.join(espansoPath, "match", "base.yml");
    const defaultYml = path.join(espansoPath, "config", "default.yml");

    await fs.mkdir(espansoPath, { recursive: true });
    await fs.mkdir(matches, { recursive: true });
    await fs.writeFile(baseYml, createEspansoConfig(), "utf-8");
    await fs.mkdir(config, { recursive: true });
    await fs.writeFile(
        defaultYml,
        yaml.stringify(espansoConfigDefaults),
        "utf-8",
    );
    console.log("Espanso was configured");
    const created = [matches, config, baseYml, defaultYml];
    created.forEach((x) => console.log(`\t - Created: "${x}"`));
};

const start = async () => {
    const started = await checkCommand("espanso status");
    if (!started) await $shell("espanso start");
};

export const espanso = async () => {
    const exist = await checkCommand("espanso -v");
    if (!exist) await install();

    await configEspanso();
    await start();
};
