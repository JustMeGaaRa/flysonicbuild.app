import { ComponentBuilder, ComponentRegistry } from "../index.ts";

const Cherry_Antenna = () =>
    new ComponentBuilder()
        .withName("Rush Cherry Antenna")
        .withMetadata({ type: "Antenna", vendor: "RushFPV" })
        .withPort((port) => {
            port.withName("CONNECTOR_IN")
                .withDescription(
                    "RF energy carrying modulated NTSC signal is transferred via coaxial wire"
                )
                .withDirection("input")
                .withKind("physical")
                .withProtocol("wire", { connector: "U.FL" })
                .withProtocol("RF", { frequency: 5.8, modulation: "FM" });
        })
        .withPort((port) => {
            port.withName("RF_OUT")
                .withDescription(
                    "Antenna passively radiates the RF signal with defined polarization"
                )
                .withDirection("output")
                .withKind("physical")
                .withProtocol("wire", { connector: "U.FL" })
                .withProtocol("RF", { frequency: 5.8, modulation: "FM" });
        })
        .build();

const TinyTank_VTX = () =>
    new ComponentBuilder()
        .withName("Rush Tiny Tank VTX")
        .withMetadata({ type: "VTX", vendor: "RushFPV" })
        .withPort((port) => {
            port.withName("DATA")
                .withDescription("VTX control data is sent to the VTX via UART")
                .withDirection("input")
                .withKind("logical")
                .withProtocol("UART", { baud_rate: 9600 })
                .withProtocol("SmartAudio");
        })
        .withPort((port) => {
            port.withName("VIDEO")
                .withDescription(
                    "NTSC video signal (analog waveform) is fed into the VTX"
                )
                .withDirection("input")
                .withKind("physical")
                .withProtocol("CVBS", { format: "NTSC" });
        })
        .withPort((port) => {
            port.withName("POWER")
                .withDescription("Power supply for the VTX")
                .withDirection("input")
                .withKind("physical")
                .withProtocol("power", { voltage: 5 });
        })
        .withPort((port) => {
            port.withName("GND")
                .withDescription("Ground reference for all signals")
                .withDirection("bidirectional")
                .withKind("physical")
                .withProtocol("ground");
        })
        .withPort((port) => {
            port.withName("CONNECTOR_OUT")
                .withDescription(
                    "RF energy carrying modulated NTSC signal is transferred via coaxial wire"
                )
                .withDirection("output")
                .withKind("physical")
                .withProtocol("wire", { connector: "U.FL" })
                .withProtocol("RF", { frequency: 5.8, modulation: "FM" });
        })
        .build();

const RushFPV_Antenna_Cherry_RHCP = Cherry_Antenna;
const RushFPV_Antenna_Cherry_LHCP = Cherry_Antenna;
const RushFPV_VTX_TinyTank_CH48 = TinyTank_VTX;
const RushFPV_VTX_TinyTank_CH32 = TinyTank_VTX;

(function registerComponents() {
    const antenna = { type: "VTX Antenna", vendor: "RushFPV" };
    const vtx = { type: "VTX", vendor: "RushFPV" };
    ComponentRegistry.getInstance()
        .register({
            ...antenna,
            name: "Rush Cherry Antenna RHCP",
            create: RushFPV_Antenna_Cherry_RHCP,
        })
        .register({
            ...antenna,
            name: "Rush Cherry Antenna LHCP",
            create: RushFPV_Antenna_Cherry_LHCP,
        })
        .register({
            ...vtx,
            name: "Rush Tiny Tank VTX CH48",
            create: RushFPV_VTX_TinyTank_CH48,
        })
        .register({
            ...vtx,
            name: "Rush Tiny Tank VTX CH32",
            create: RushFPV_VTX_TinyTank_CH32,
        });
})();

export default {
    RushFPV_Antenna_Cherry_RHCP,
    RushFPV_Antenna_Cherry_LHCP,
    RushFPV_VTX_TinyTank_CH48,
    RushFPV_VTX_TinyTank_CH32,
};
