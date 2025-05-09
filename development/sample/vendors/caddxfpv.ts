import { Component } from "@flysonic/core/index.ts";

const Ratel_2 = (): Component => ({
    id: `caddx-camera-${crypto.randomUUID()}`,
    name: "Caddx Ratel 2",
    ports: [
        {
            name: "POWER",
            direction: "input",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
        {
            name: "VIDEO",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "CVBS", constraints: { format: "NTSC" } }],
        },
        {
            name: "GND",
            direction: "bidirectional",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
    ],
});

const CaddxFpv_Ratel2 = Ratel_2;
const CaddxFpv_RatelPro = Ratel_2;
const CaddxFpv_BabyRatel2 = Ratel_2;

export default {
    CaddxFpv_Ratel2,
    CaddxFpv_RatelPro,
    CaddxFpv_BabyRatel2,
};
