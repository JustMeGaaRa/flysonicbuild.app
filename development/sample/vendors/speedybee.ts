import { Component } from "@flysonic/core/Component.ts";
import { ComponentRegistry } from "@flysonic/core/ComponentRegistry.ts";

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
    name: "SpeedyBee BLS Mini 4-in-1 ESC",
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
            name: "PWM_1_OUT",
            direction: "output",
            kind: "logical",
            protocols: [{ name: "pwm" }],
        },
        {
            name: "PWM_2_OUT",
            direction: "output",
            kind: "logical",
            protocols: [{ name: "pwm" }],
        },
        {
            name: "PWM_3_OUT",
            direction: "output",
            kind: "logical",
            protocols: [{ name: "pwm" }],
        },
        {
            name: "PWM_4_OUT",
            direction: "output",
            kind: "logical",
            protocols: [{ name: "pwm" }],
        },
    ],
});

const SpeedyBee_FC_F405Mini = F405_Mini_FC;
const SpeedyBee_ESC_BLSMini4In1 = BLS_Mini_4In1ESC;

(function registerComponents() {
    const fc = { type: "Flight Controller", vendor: "SpeedyBee" };
    const esc = { type: "Electronic Speed Controller", vendor: "SpeedyBee" };
    ComponentRegistry.getInstance()
        .register({
            ...fc,
            name: "SpeedyBee F405 Mini FC",
            create: SpeedyBee_FC_F405Mini,
        })
        .register({
            ...esc,
            name: "SpeedyBee BLS Mini 4-in-1 ESC",
            create: SpeedyBee_ESC_BLSMini4In1,
        });
})();

export default {
    SpeedyBee_FC_F405Mini,
    SpeedyBee_ESC_BLSMini4In1,
};
