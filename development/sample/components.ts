import { Component } from "@flysonic/core/index.ts";

export const Rush_TinyTankVtx: Component = {
    id: "vtx",
    name: "Rush Tiny Tank VTX",
    ports: [
        {
            name: "POWER_IN",
            direction: "input",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
        {
            name: "DATA",
            direction: "input",
            kind: "logical",
            protocols: [
                { name: "uart" },
                { name: "smartaudio", constraints: { baud_rate: 9600 } },
            ],
        },
        {
            name: "VIDEO_IN",
            direction: "input",
            kind: "physical",
            protocols: [
                { name: "analog_video", constraints: { format: "NTSC" } },
            ],
        },
        {
            name: "RF_OUT",
            direction: "output",
            kind: "physical",
            protocols: [
                {
                    name: "rf",
                    constraints: {
                        frequency: 5.8,
                        modulation: "FM",
                        connector: "U.FL",
                    },
                },
            ],
        },
        {
            name: "GND",
            direction: "bidirectional",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
    ],
};

export const Rush_CherryAntenna: Component = {
    id: "antenna",
    name: "Rush Cherry Antenna",
    ports: [
        {
            name: "RF_IN",
            direction: "input",
            kind: "physical",
            protocols: [
                {
                    name: "rf",
                    constraints: {
                        frequency: 5.8,
                        modulation: "FM",
                        connector: "U.FL",
                    },
                },
            ],
        },
        {
            name: "signal",
            direction: "bidirectional",
            kind: "physical",
            protocols: [
                {
                    name: "rf",
                    constraints: {
                        frequency: 5.8,
                        modulation: "FM",
                    },
                },
            ],
        },
    ],
};

export const BetaFpv_ExpressLRS_NanoRx: Component = {
    id: "rx",
    name: "BetaFPV ELRS Nano RX",
    ports: [
        {
            name: "TX",
            direction: "output",
            kind: "logical",
            protocols: [{ name: "uart" }, { name: "elrs" }],
        },
        {
            name: "RX",
            direction: "input",
            kind: "logical",
            protocols: [{ name: "uart" }, { name: "elrs" }],
        },
        {
            name: "POWER_IN",
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
            name: "RF_OUT",
            direction: "output",
            kind: "physical",
            protocols: [
                {
                    name: "rf",
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

export const BetaFpv_ExpressLRS_NanoRxAntenna: Component = {
    id: "rx_antenna",
    name: "BetaFPV ELRS Nano RX Antenna",
    ports: [
        {
            name: "RF_IN",
            direction: "input",
            kind: "physical",
            protocols: [
                {
                    name: "rf",
                    constraints: {
                        frequency: 915,
                        modulation: "FSK",
                        connector: "U.FL",
                    },
                },
            ],
        },
        {
            name: "signal",
            direction: "bidirectional",
            kind: "physical",
            protocols: [
                {
                    name: "rf",
                    constraints: {
                        frequency: 915,
                        modulation: "FSK",
                    },
                },
                {
                    name: "serial",
                    constraints: {
                        serial_provider: "CRSF",
                    },
                },
            ],
        },
    ],
};

export const SpeedyBee_F405_MiniFC: Component = {
    id: "fc",
    name: "SpeedyBee F405 Mini FC",
    ports: [
        {
            name: "UART1_TX",
            direction: "output",
            kind: "logical",
            protocols: [
                { name: "uart" },
                { name: "smartaudio", constraints: { baud_rate: 9600 } },
            ],
        },
        {
            name: "UART1_VTX",
            direction: "output",
            kind: "physical",
            protocols: [
                { name: "analog_video", constraints: { format: "NTSC" } },
            ],
        },
        {
            name: "UART1_5V_OUT",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
        {
            name: "UART1_GND",
            direction: "bidirectional",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
        {
            name: "UART2_TX",
            direction: "output",
            kind: "logical",
            protocols: [{ name: "uart" }, { name: "elrs" }],
        },
        {
            name: "UART2_RX",
            direction: "input",
            kind: "logical",
            protocols: [{ name: "uart" }, { name: "elrs" }],
        },
        {
            name: "UART2_5V_OUT",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
        {
            name: "UART2_GND",
            direction: "bidirectional",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
        {
            name: "UART3_5V_OUT",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
        {
            name: "UART3_GND",
            direction: "bidirectional",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
        {
            name: "UART3_CAMERA_IN",
            direction: "input",
            kind: "physical",
            protocols: [{ name: "analog_video" }],
        },
        {
            name: "8_PIN_CABLE",
            direction: "input",
            kind: "physical",
            protocols: [{ name: "power" }],
        },
    ],
};

export const SpeedyBee_BLS4In1_MiniESC: Component = {
    id: "esc",
    name: "SpeedyBee BLS 4-in-1 ESC",
    ports: [
        {
            name: "8_PIN_CABLE",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "power" }],
        },
        {
            name: "PWM_OUT_1",
            direction: "output",
            kind: "logical",
            protocols: [{ name: "pwm" }],
        },
        {
            name: "GND_1",
            direction: "bidirectional",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
        {
            name: "POWER_OUT_1",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
        {
            name: "PWM_OUT_2",
            direction: "output",
            kind: "logical",
            protocols: [{ name: "pwm" }],
        },
        {
            name: "GND_2",
            direction: "bidirectional",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
        {
            name: "POWER_OUT_2",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
        {
            name: "PWM_OUT_3",
            direction: "output",
            kind: "logical",
            protocols: [{ name: "pwm" }],
        },
        {
            name: "GND_3",
            direction: "bidirectional",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
        {
            name: "POWER_OUT_3",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
        {
            name: "PWM_OUT_4",
            direction: "output",
            kind: "logical",
            protocols: [{ name: "pwm" }],
        },
        {
            name: "GND_4",
            direction: "bidirectional",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
        {
            name: "POWER_OUT_4",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
    ],
};

export const Caddx_Ratel_2: Component = {
    id: "cam",
    name: "Caddx Ratel 2",
    ports: [
        {
            name: "VIDEO_OUT",
            direction: "output",
            kind: "physical",
            protocols: [
                { name: "analog_video", constraints: { format: "NTSC" } },
            ],
        },
        {
            name: "POWER_IN",
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
    ],
};

export const TMotor_F1404_3800KV: Component = {
    id: "motor",
    name: "T-Motor F1404 3800KV",
    ports: [
        {
            name: "PWM_IN",
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
            name: "POWER_IN",
            direction: "input",
            kind: "physical",
            protocols: [{ name: "power" }],
        },
    ],
};
