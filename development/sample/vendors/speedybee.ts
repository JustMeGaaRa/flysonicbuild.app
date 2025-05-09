import { Component } from "@flysonic/core/Component.ts";

const F405_Mini_FC = (): Component => ({
    id: `fc-${crypto.randomUUID()}`,
    name: "SpeedyBee F405 Mini FC",
    ports: [
        {
            name: "UART1_TX",
            direction: "output",
            kind: "logical",
            protocols: [
                { name: "UART" },
                { name: "SmartAudio", constraints: { baud_rate: 9600 } },
            ],
        },
        {
            name: "UART1_VTX",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "CVBS", constraints: { format: "NTSC" } }],
        },
        {
            name: "UART1_5V",
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
            protocols: [
                { name: "UART", constraints: { baud_rate: 115200 } },
                { name: "CRSF" },
            ],
        },
        {
            name: "UART2_RX",
            direction: "input",
            kind: "logical",
            protocols: [
                { name: "UART", constraints: { baud_rate: 115200 } },
                { name: "CRSF" },
            ],
        },
        {
            name: "UART2_5V",
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
            name: "UART3_5V",
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
            name: "UART3_CAMERA",
            direction: "input",
            kind: "physical",
            protocols: [{ name: "CVBS" }],
        },
        {
            name: "8_PIN_CABLE",
            direction: "input",
            kind: "physical",
            protocols: [{ name: "power" }],
        },
    ],
});

const BLS_Mini_4In1ESC = (): Component => ({
    id: `esc-${crypto.randomUUID()}`,
    name: "SpeedyBee BLS 4-in-1 ESC",
    ports: [
        {
            name: "POWER_IN",
            direction: "input",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 14.8 } }],
        },
        {
            name: "GND_IN",
            direction: "bidirectional",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
        {
            name: "8_PIN_CABLE",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "power" }],
        },
        {
            name: "PWM_1",
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
            name: "POWER_1",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
        {
            name: "PWM_2",
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
            name: "POWER_2",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
        {
            name: "PWM_3",
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
            name: "POWER_3",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
        {
            name: "PWM_4",
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
            name: "POWER_4",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 5 } }],
        },
    ],
});

const SpeedyBee_FC_F405Mini = F405_Mini_FC;
const SpeedyBee_ESC_BLSMini4In1 = BLS_Mini_4In1ESC;

export default {
    SpeedyBee_FC_F405Mini,
    SpeedyBee_ESC_BLSMini4In1,
};
