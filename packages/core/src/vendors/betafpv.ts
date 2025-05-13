import { ComponentBuilder, ComponentRegistry } from "../index.ts";

const ExpressLRS_NanoRx = () =>
    new ComponentBuilder()
        .withName("BetaFPV ELRS Nano RX")
        .withMetadata({ type: "Receiver", vendor: "BetaFPV" })
        .withPort((port) => {
            port.withName("RX")
                .withDirection("input")
                .withKind("logical")
                .withProtocol("UART", { baud_rate: 115200 })
                .withProtocol("CRSF");
        })
        .withPort((port) => {
            port.withName("TX")
                .withDirection("output")
                .withKind("logical")
                .withProtocol("UART", { baud_rate: 115200 })
                .withProtocol("CRSF");
        })
        .withPort((port) => {
            port.withName("POWER")
                .withDirection("input")
                .withKind("physical")
                .withProtocol("power", { voltage: 5 });
        })
        .withPort((port) => {
            port.withName("GND")
                .withDirection("bidirectional")
                .withKind("physical")
                .withProtocol("ground");
        })
        .withPort((port) => {
            port.withName("ELRS")
                .withDirection("bidirectional")
                .withKind("physical")
                .withProtocol("RF", {
                    frequency: 915,
                    modulation: "FSK",
                    connector: "U.FL",
                });
        })
        .build();

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
