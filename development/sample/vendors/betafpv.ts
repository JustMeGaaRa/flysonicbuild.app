import { Component } from "@flysonic/core/Component.ts";

export const ExpressLRS_NanoRx: Component = {
    id: "rx",
    name: "BetaFPV ELRS Nano RX",
    ports: [
        {
            name: "TX",
            direction: "output",
            kind: "logical",
            protocols: [
                { name: "UART", constraints: { baud_rate: 115200 } },
                { name: "CRSF" },
            ],
        },
        {
            name: "RX",
            direction: "input",
            kind: "logical",
            protocols: [
                { name: "UART", constraints: { baud_rate: 115200 } },
                { name: "CRSF" },
            ],
        },
        {
            name: "POWER",
            direction: "input",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
        {
            name: "GND",
            direction: "bidirectional",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
        {
            name: "ELRS",
            direction: "bidirectional",
            kind: "physical",
            protocols: [
                {
                    name: "RF",
                    constraints: {
                        frequency: 915,
                        modulation: "FSK",
                        connector: "U.FL",
                    },
                },
            ],
        },
    ],
};
