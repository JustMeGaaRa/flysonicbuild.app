import { Component } from "@flysonic/core/Component.ts";

const Tattu_RLine = (): Component => ({
    id: `tattu-battery-${crypto.randomUUID()}`,
    name: "Tattu R-Line",
    ports: [
        {
            name: "POWER",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 14.8 } }],
        },
        {
            name: "GND",
            direction: "bidirectional",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
    ],
});

const Tattu_RLine_1300mAh_4S_100C = Tattu_RLine;

export default {
    Tattu_RLine_1300mAh_4S_100C,
};
