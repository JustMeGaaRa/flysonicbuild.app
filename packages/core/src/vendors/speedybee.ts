import { ComponentBuilder, ComponentRegistry } from "../index.ts";

const SpeedyBee_FC_F405Mini = () =>
    new ComponentBuilder()
        .withName("SpeedyBee F405 Mini FC")
        .withMetadata({ type: "Flight Controller", vendor: "SpeedyBee" })
        .withPort((port) => {
            port.withName("UART1_TX")
                .withDirection("output")
                .withKind("logical")
                .withProtocol("UART")
                .withProtocol("SmartAudio", { baud_rate: 9600 });
        })
        .withPort((port) => {
            port.withName("UART1_VTX")
                .withDirection("output")
                .withKind("physical")
                .withProtocol("CVBS", { format: "NTSC" });
        })
        .withPort((port) => {
            port.withName("UART1_5V")
                .withDirection("output")
                .withKind("physical")
                .withProtocol("power", { voltage: 5 });
        })
        .withPort((port) => {
            port.withName("UART1_GND")
                .withDirection("bidirectional")
                .withKind("physical")
                .withProtocol("ground");
        })
        .withPort((port) => {
            port.withName("UART2_TX")
                .withDirection("output")
                .withKind("logical")
                .withProtocol("UART", { baud_rate: 115200 })
                .withProtocol("CRSF");
        })
        .withPort((port) => {
            port.withName("UART2_RX")
                .withDirection("input")
                .withKind("logical")
                .withProtocol("UART", { baud_rate: 115200 })
                .withProtocol("CRSF");
        })
        .withPort((port) => {
            port.withName("UART2_5V")
                .withDirection("output")
                .withKind("physical")
                .withProtocol("power", { voltage: 5 });
        })
        .withPort((port) => {
            port.withName("UART2_GND")
                .withDirection("bidirectional")
                .withKind("physical")
                .withProtocol("ground");
        })
        .withPort((port) => {
            port.withName("UART3_5V")
                .withDirection("output")
                .withKind("physical")
                .withProtocol("power", { voltage: 5 });
        })
        .withPort((port) => {
            port.withName("UART3_CAMERA")
                .withDirection("input")
                .withKind("physical")
                .withProtocol("CVBS", { format: "NTSC" });
        })
        .withPort((port) => {
            port.withName("UART3_GND")
                .withDirection("bidirectional")
                .withKind("physical")
                .withProtocol("ground");
        })
        .withPort((port) => {
            port.withName("8_PIN_CABLE")
                .withDirection("input")
                .withKind("physical")
                .withProtocol("power");
        })
        .build();

const SpeedyBee_ESC_BLSMini4In1 = () =>
    new ComponentBuilder()
        .withName("SpeedyBee BLS Mini 4-in-1 ESC")
        .withMetadata({
            type: "Electronic Speed Controller",
            vendor: "SpeedyBee",
        })
        .withPort((port) => {
            port.withName("POWER_IN")
                .withDirection("input")
                .withKind("physical")
                .withProtocol("power", { voltage: 14.8 });
        })
        .withPort((port) => {
            port.withName("GND_IN")
                .withDirection("bidirectional")
                .withKind("physical")
                .withProtocol("ground");
        })
        .withPort((port) => {
            port.withName("8_PIN_CABLE")
                .withDirection("output")
                .withKind("physical")
                .withProtocol("power");
        })
        .withPort((port) => {
            port.withName("PWM_1_OUT")
                .withDirection("output")
                .withKind("logical")
                .withProtocol("pwm");
        })
        .withPort((port) => {
            port.withName("PWM_2_OUT")
                .withDirection("output")
                .withKind("logical")
                .withProtocol("pwm");
        })
        .withPort((port) => {
            port.withName("PWM_3_OUT")
                .withDirection("output")
                .withKind("logical")
                .withProtocol("pwm");
        })
        .withPort((port) => {
            port.withName("PWM_4_OUT")
                .withDirection("output")
                .withKind("logical")
                .withProtocol("pwm");
        })
        .build();

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
