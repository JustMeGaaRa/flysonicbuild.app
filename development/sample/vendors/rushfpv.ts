import { Component } from "@flysonic/core/Component.ts";

export const Cherry_Antenna: Component = {
    id: "antenna",
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
};

export const Rush_TinyTankVtx: Component = {
    id: "vtx",
    name: "Rush Tiny Tank VTX",
    ports: [
        {
            name: "POWER",
            direction: "input",
            kind: "physical",
            description: "Power supply for the VTX",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
        {
            name: "GND",
            direction: "bidirectional",
            kind: "physical",
            description: "Ground reference for all signals",
            protocols: [{ name: "ground" }],
        },
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
};
