import { ComponentRegistry } from "@flysonic/core/ComponentRegistry.ts";
import { System } from "@flysonic/core/builders/SystemBuilder.ts";
import BetaFPV from "./vendors/betafpv.ts";
import CaddxFPV from "./vendors/caddxfpv.ts";
import RushFPV from "./vendors/rushfpv.ts";
import SpeedyBee from "./vendors/speedybee.ts";
import TMotorHobby from "./vendors/tmotorhobby.ts";
import RadioMaster from "./vendors/radiomaster.ts";
import walksnail from "./vendors/walksnail.ts";
import Tattu from "./vendors/tattu.ts";

export default function main() {
    const vtx = RushFPV.RushFPV_VTX_TinyTank_CH48();
    const antenna = RushFPV.RushFPV_Antenna_Cherry_RHCP();
    const receiver = BetaFPV.BetaFpv_ExpressLRS_NanoRx_915MHz();
    const camera = CaddxFPV.CaddxFpv_Ratel2();
    const motor1 = TMotorHobby.TMotorHobby_F1404_3800KV();
    const motor2 = TMotorHobby.TMotorHobby_F1404_3800KV();
    const motor3 = TMotorHobby.TMotorHobby_F1404_3800KV();
    const motor4 = TMotorHobby.TMotorHobby_F1404_3800KV();
    const fc = SpeedyBee.SpeedyBee_FC_F405Mini();
    const esc = SpeedyBee.SpeedyBee_ESC_BLSMini4In1();
    const transmitter = RadioMaster.RadioMaster_TX12();
    const goggles = walksnail.Walksnail_Goggles_AvatarHD_GooglesX();
    const battery = Tattu.Tattu_RLine_1300mAh_4S_100C();

    const registry = new ComponentRegistry()
        .registerComponent(vtx)
        .registerComponent(antenna)
        .registerComponent(receiver)
        .registerComponent(fc)
        .registerComponent(esc)
        .registerComponent(camera)
        .registerComponent(motor1)
        .registerComponent(motor2)
        .registerComponent(motor3)
        .registerComponent(motor4)
        .registerComponent(transmitter)
        .registerComponent(goggles)
        .registerComponent(battery);

    const system = System.create(registry)
        .connect(fc.id, receiver.id, (connection) =>
            connection
                .port("UART2_5V", "POWER", { color: "red" })
                .port("UART2_GND", "GND", { color: "gray" })
                .port("UART2_TX", "RX", { color: "blue" })
                .port("UART2_RX", "TX", { color: "yellow" })
        )
        .connect(vtx.id, antenna.id, (connection) =>
            connection.port("CONNECTOR_OUT", "CONNECTOR_IN")
        )
        .connect(fc.id, vtx.id, (connection) =>
            connection
                .port("UART1_5V", "POWER", { color: "red" })
                .port("UART1_TX", "DATA", { color: "blue" })
                .port("UART1_VTX", "VIDEO", { color: "yellow" })
                .port("UART1_GND", "GND", { color: "gray" })
        )
        .connect(fc.id, camera.id, (connection) =>
            connection
                .port("UART3_5V", "POWER", { color: "red" })
                .port("UART3_GND", "GND", { color: "gray" })
                .port("UART3_CAMERA", "VIDEO", { color: "yellow" })
        )
        .connect(esc.id, fc.id, (connection) =>
            connection.port("8_PIN_CABLE", "8_PIN_CABLE", {
                color: "url(#rainbow)",
            })
        )
        .connect(esc.id, motor1.id, (connection) =>
            connection
                .port("PWM_1", "PWM", { color: "gray" })
                .port("POWER_1", "POWER", { color: "gray" })
                .port("GND_1", "GND", { color: "gray" })
        )
        .connect(esc.id, motor2.id, (connection) =>
            connection
                .port("PWM_2", "PWM", { color: "gray" })
                .port("POWER_2", "POWER", { color: "gray" })
                .port("GND_2", "GND", { color: "gray" })
        )
        .connect(esc.id, motor3.id, (connection) =>
            connection
                .port("PWM_3", "PWM", { color: "gray" })
                .port("POWER_3", "POWER", { color: "gray" })
                .port("GND_3", "GND", { color: "gray" })
        )
        .connect(esc.id, motor4.id, (connection) =>
            connection
                .port("PWM_4", "PWM", { color: "gray" })
                .port("POWER_4", "POWER", { color: "gray" })
                .port("GND_4", "GND", { color: "gray" })
        )
        .connect(transmitter.id, receiver.id, (connection) => {
            connection.port("ELRS", "ELRS");
        })
        .connect(antenna.id, goggles.id, (connection) => {
            connection.port("RF_OUT", "RF_IN");
        })
        .connect(battery.id, esc.id, (connection) =>
            connection
                .port("POWER", "POWER_IN", { color: "red" })
                .port("GND", "GND_IN", { color: "gray" })
        )
        .build();

    return system;
}
