import { Component } from "@flysonic/core/index.ts";

export const Ratel_2: Component = {
    id: "cam",
    name: "Caddx Ratel 2",
    ports: [
        {
            name: "VIDEO",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "CVBS", constraints: { format: "NTSC" } }],
        },
        {
            name: "POWER",
            direction: "input",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
        {
            name: "GND",
            direction: "none",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
    ],
};
