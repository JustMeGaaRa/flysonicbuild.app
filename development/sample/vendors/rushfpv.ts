import { Component } from "@flysonic/core/Component.ts";

const Cherry_Antenna = (): Component => ({
    id: `rushfpv-antenna-${crypto.randomUUID()}`,
    name: "Rush Cherry Antenna",
    ports: [
        {
            name: "CONNECTOR_IN",
            direction: "input",
            kind: "physical",
            description:
                "RF energy carrying modulated NTSC signal is transferred via coaxial wire",
            protocols: [
                { name: "wire", constraints: { connector: "U.FL" } },
                {
                    name: "RF",
                    constraints: { frequency: 5.8, modulation: "FM" },
                },
            ],
        },
        {
            name: "RF_OUT",
            direction: "output",
            kind: "physical",
            description:
                "Antenna passively radiates the RF signal with defined polarization",
            protocols: [
                {
                    name: "RF",
                    constraints: {
                        frequency: 5.8,
                        modulation: "FM",
                        polarization: "RHCP",
                    },
                },
            ],
        },
    ],
});

const TinyTank_VTX = (): Component => ({
    id: `rushfpv-vtx-${crypto.randomUUID()}`,
    name: "Rush Tiny Tank VTX",
    ports: [
        {
            name: "DATA",
            direction: "input",
            kind: "logical",
            description: "VTX control data is sent to the VTX via UART",
            protocols: [
                { name: "UART", constraints: { baud_rate: 9600 } },
                { name: "SmartAudio" },
            ],
        },
        {
            name: "VIDEO",
            direction: "input",
            kind: "physical",
            description:
                "NTSC video signal (analog waveform) is fed into the VTX",
            protocols: [{ name: "CVBS", constraints: { format: "NTSC" } }],
        },
        {
            name: "GND",
            direction: "bidirectional",
            kind: "physical",
            description: "Ground reference for all signals",
            protocols: [{ name: "ground" }],
        },
        {
            name: "POWER",
            direction: "input",
            kind: "physical",
            description: "Power supply for the VTX",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
        {
            name: "CONNECTOR_OUT",
            direction: "output",
            kind: "physical",
            description:
                "RF energy carrying modulated NTSC signal is transferred via coaxial wire",
            protocols: [
                { name: "wire", constraints: { connector: "U.FL" } },
                {
                    name: "RF",
                    constraints: { frequency: 5.8, modulation: "FM" },
                },
            ],
        },
    ],
});

const RushFPV_Antenna_Cherry_RHCP = Cherry_Antenna;
const RushFPV_Antenna_Cherry_LHCP = Cherry_Antenna;
const RushFPV_VTX_TinyTank_CH48 = TinyTank_VTX;
const RushFPV_VTX_TinyTank_CH32 = TinyTank_VTX;

export default {
    RushFPV_Antenna_Cherry_RHCP,
    RushFPV_Antenna_Cherry_LHCP,
    RushFPV_VTX_TinyTank_CH48,
    RushFPV_VTX_TinyTank_CH32,
};
