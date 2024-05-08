export type EspansoType =
    | "date"
    | "choice"
    | "clipboard"
    | "echo"
    | "shell"
    | "random";

export type EspansoShell = "Powershell" | "bash" | "sh";

export type EspansoCommander = ";";

export type EspansoTrigger =
    | `${EspansoCommander}${string}`
    | Array<`${EspansoCommander}${string}`>;

export type EspansoVarReplacer = {
    trigger?: EspansoTrigger;
    regex?: string;
    replace: `{{${string}}}` | string;
    vars?: [
        {
            name: string;
            type: EspansoType;
            params?: Partial<{
                shell: EspansoShell;
                cmd: string | string[];
                format: string;
                choices: string[];
                locale: string;
                echo: string;
                values: Array<string | { label: string; id: string }>;
            }>;
        },
    ];
};
