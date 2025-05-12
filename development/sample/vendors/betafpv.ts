import { Component } from "@flysonic/core/Component.ts";
import { ComponentRegistry } from "@flysonic/core/ComponentRegistry.ts";

const ExpressLRS_NanoRx = (): Component => ({
    id: `betafpv-antenna-${crypto.randomUUID()}`,
    name: "BetaFPV ELRS Nano RX",
    ports: [
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
            name: "TX",
            direction: "output",
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
});

const BetaFpv_ExpressLRS_NanoRx_2_4GHz = ExpressLRS_NanoRx;
const BetaFpv_ExpressLRS_NanoRx_915MHz = ExpressLRS_NanoRx;
const BetaFpv_ExpressLRS_NanoRx_868MHz = ExpressLRS_NanoRx;

(function registerComponents() {
    const receiver = { type: "Receiver", vendor: "BetaFPV" };
    ComponentRegistry.getInstance()
        .register({
            ...receiver,
            name: "BetaFPV ELRS Nano RX 2.4GHz",
            create: BetaFpv_ExpressLRS_NanoRx_2_4GHz,
        })
        .register({
            ...receiver,
            name: "BetaFPV ELRS Nano RX 915MHz",
            create: BetaFpv_ExpressLRS_NanoRx_915MHz,
        })
        .register({
            ...receiver,
            name: "BetaFPV ELRS Nano RX 868MHz",
            create: BetaFpv_ExpressLRS_NanoRx_868MHz,
        });
})();

export default {
    BetaFpv_ExpressLRS_NanoRx_2_4GHz,
    BetaFpv_ExpressLRS_NanoRx_915MHz,
    BetaFpv_ExpressLRS_NanoRx_868MHz,
};
