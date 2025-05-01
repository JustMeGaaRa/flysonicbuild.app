import { Component } from "@flysonic/core/Component.ts";

export const F1404_3800KV: Component = {
    id: "motor",
    name: "T-Motor F1404 3800KV",
    ports: [
        {
            name: "PWM",
            direction: "input",
            kind: "logical",
            protocols: [{ name: "pwm" }],
        },
        {
            name: "GND",
            direction: "bidirectional",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
        {
            name: "POWER",
            direction: "input",
            kind: "physical",
            protocols: [{ name: "power" }],
        },
    ],
};
