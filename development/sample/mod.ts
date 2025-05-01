import { ComponentRegistry } from "@flysonic/core/ComponentRegistry.ts";
import { System } from "@flysonic/core/builders/SystemBuilder.ts";
import { ExpressLRS_NanoRx } from "./vendors/betafpv.ts";
import { Ratel_2 } from "./vendors/caddxfpv.ts";
import { Cherry_Antenna, Rush_TinyTankVtx } from "./vendors/rushfpv.ts";
import {
    F405_Mini_FC,
    SpeedyBee_BLS4In1_MiniESC,
} from "./vendors/speedybee.ts";
import { F1404_3800KV } from "./vendors/tmotorhobby.ts";

export default function main() {
    const registry = new ComponentRegistry()
        .registerComponent(Rush_TinyTankVtx)
        .registerComponent(Cherry_Antenna)
        .registerComponent(ExpressLRS_NanoRx)
        .registerComponent(F405_Mini_FC)
        .registerComponent(SpeedyBee_BLS4In1_MiniESC)
        .registerComponent(Ratel_2)
        .registerComponent(F1404_3800KV);

    const system = System.create(registry)
        .connect(F405_Mini_FC.id, ExpressLRS_NanoRx.id, (connection) =>
            connection
                .port("UART2_5V", "POWER", { color: "red" })
                .port("UART2_GND", "GND", { color: "gray" })
                .port("UART2_TX", "RX", { color: "blue" })
                .port("UART2_RX", "TX", { color: "yellow" })
        )
        .connect(Rush_TinyTankVtx.id, Cherry_Antenna.id, (connection) =>
            connection.port("CONNECTOR_OUT", "CONNECTOR_IN")
        )
        .connect(F405_Mini_FC.id, Rush_TinyTankVtx.id, (connection) =>
            connection
                .port("UART1_5V", "POWER", { color: "red" })
                .port("UART1_TX", "DATA", { color: "blue" })
                .port("UART1_VTX", "VIDEO", { color: "yellow" })
                .port("UART1_GND", "GND", { color: "gray" })
        )
        .connect(F405_Mini_FC.id, Ratel_2.id, (connection) =>
            connection
                .port("UART3_5V", "POWER", { color: "red" })
                .port("UART3_GND", "GND", { color: "gray" })
                .port("UART3_CAMERA", "VIDEO", { color: "yellow" })
        )
        .connect(SpeedyBee_BLS4In1_MiniESC.id, F405_Mini_FC.id, (connection) =>
            connection.port("8_PIN_CABLE", "8_PIN_CABLE", {
                color: "rainbow",
            })
        )
        .connect(SpeedyBee_BLS4In1_MiniESC.id, F1404_3800KV.id, (connection) =>
            connection
                .port("PWM_1", "PWM", { color: "gray" })
                .port("POWER_1", "POWER", { color: "gray" })
                .port("GND_1", "GND", { color: "gray" })
        )
        .build();

    return system;
}
