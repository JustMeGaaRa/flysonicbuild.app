import { ComponentRegistry } from "@flysonic/core/ComponentRegistry.ts";
import { System } from "@flysonic/core/builders/SystemBuilder.ts";
import {
    BetaFpv_ExpressLRS_NanoRx,
    BetaFpv_ExpressLRS_NanoRxAntenna,
    Caddx_Ratel_2,
    Rush_CherryAntenna,
    Rush_TinyTankVtx,
    SpeedyBee_BLS4In1_MiniESC,
    SpeedyBee_F405_MiniFC,
    TMotor_F1404_3800KV,
} from "./components.ts";

export default function main() {
    const registry = new ComponentRegistry()
        .registerComponent(Rush_TinyTankVtx)
        .registerComponent(Rush_CherryAntenna)
        .registerComponent(BetaFpv_ExpressLRS_NanoRx)
        .registerComponent(BetaFpv_ExpressLRS_NanoRxAntenna)
        .registerComponent(SpeedyBee_F405_MiniFC)
        .registerComponent(SpeedyBee_BLS4In1_MiniESC)
        .registerComponent(Caddx_Ratel_2)
        .registerComponent(TMotor_F1404_3800KV);

    const system = System.create(registry)
        .connect(
            BetaFpv_ExpressLRS_NanoRx.id,
            BetaFpv_ExpressLRS_NanoRxAntenna.id,
            (connection) => connection.port("RF_OUT", "RF_IN")
        )
        .connect(
            SpeedyBee_F405_MiniFC.id,
            BetaFpv_ExpressLRS_NanoRx.id,
            (connection) =>
                connection
                    .port("UART2_5V_OUT", "POWER_IN", { color: "red" })
                    .port("UART2_GND", "GND", { color: "black" })
                    .port("UART2_TX", "RX", { color: "blue" })
                    .port("UART2_RX", "TX", { color: "yellow" })
        )
        .connect(Rush_TinyTankVtx.id, Rush_CherryAntenna.id, (connection) =>
            connection.port("RF_OUT", "RF_IN")
        )
        .connect(SpeedyBee_F405_MiniFC.id, Rush_TinyTankVtx.id, (connection) =>
            connection
                .port("UART1_5V_OUT", "POWER_IN", { color: "red" })
                .port("UART1_TX", "DATA", { color: "blue" })
                .port("UART1_VTX", "VIDEO_IN", { color: "yellow" })
                .port("UART1_GND", "GND", { color: "black" })
        )
        .connect(SpeedyBee_F405_MiniFC.id, Caddx_Ratel_2.id, (connection) =>
            connection
                .port("UART3_5V_OUT", "POWER_IN", { color: "red" })
                .port("UART3_GND", "GND", { color: "black" })
                .port("UART3_CAMERA_IN", "VIDEO_OUT", { color: "yellow" })
        )
        .connect(
            SpeedyBee_BLS4In1_MiniESC.id,
            SpeedyBee_F405_MiniFC.id,
            (connection) =>
                connection.port("8_PIN_CABLE", "8_PIN_CABLE", {
                    color: "rainbow",
                })
        )
        .connect(
            SpeedyBee_BLS4In1_MiniESC.id,
            TMotor_F1404_3800KV.id,
            (connection) =>
                connection
                    .port("PWM_OUT_1", "PWM_IN", { color: "black" })
                    .port("POWER_OUT_1", "POWER_IN", { color: "black" })
                    .port("GND_1", "GND", { color: "black" })
        )
        .build();

    return system;
}
