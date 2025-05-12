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
    const vtx_antenna = RushFPV.RushFPV_Antenna_Cherry_RHCP();
    const receiver = BetaFPV.BetaFpv_ExpressLRS_NanoRx_915MHz();
    const camera = CaddxFPV.CaddxFpv_Ratel2();
    const motor1 = TMotorHobby.TMotorHobby_F1404_3800KV();
    const motor2 = TMotorHobby.TMotorHobby_F1404_3800KV();
    const motor3 = TMotorHobby.TMotorHobby_F1404_3800KV();
    const motor4 = TMotorHobby.TMotorHobby_F1404_3800KV();
    const fc = SpeedyBee.SpeedyBee_FC_F405Mini();
    const esc = SpeedyBee.SpeedyBee_ESC_BLSMini4In1();
    const remote_control = RadioMaster.RadioMaster_TX12();
    const goggles = walksnail.Walksnail_Goggles_AvatarHD_GooglesX();
    const battery = Tattu.Tattu_RLine_1300mAh_4S_100C();

    const system = System.create()
        .connect(fc, receiver, (connection) =>
            connection
                .port("UART2_5V", "POWER", { color: "red" })
                .port("UART2_GND", "GND", { color: "gray" })
                .port("UART2_TX", "RX", { color: "blue" })
                .port("UART2_RX", "TX", { color: "yellow" })
        )
        .connect(vtx, vtx_antenna, (connection) =>
            connection.port("CONNECTOR_OUT", "CONNECTOR_IN")
        )
        .connect(fc, vtx, (connection) =>
            connection
                .port("UART1_5V", "POWER", { color: "red" })
                .port("UART1_TX", "DATA", { color: "blue" })
                .port("UART1_VTX", "VIDEO", { color: "yellow" })
                .port("UART1_GND", "GND", { color: "gray" })
        )
        .connect(fc, camera, (connection) =>
            connection
                .port("UART3_5V", "POWER", { color: "red" })
                .port("UART3_GND", "GND", { color: "gray" })
                .port("UART3_CAMERA", "VIDEO", { color: "yellow" })
        )
        .connect(esc, fc, (connection) =>
            connection.port("8_PIN_CABLE", "8_PIN_CABLE", {
                color: "url(#rainbow)",
            })
        )
        .connect(esc, motor1, (connection) =>
            connection.port("PWM_1_OUT", "PWM", { color: "gray" })
        )
        .connect(esc, motor2, (connection) =>
            connection.port("PWM_2_OUT", "PWM", { color: "gray" })
        )
        .connect(esc, motor3, (connection) =>
            connection.port("PWM_3_OUT", "PWM", { color: "gray" })
        )
        .connect(esc, motor4, (connection) =>
            connection.port("PWM_4_OUT", "PWM", { color: "gray" })
        )
        .connect(remote_control, receiver, (connection) => {
            connection.port("ELRS", "ELRS");
        })
        .connect(vtx_antenna, goggles, (connection) => {
            connection.port("RF_OUT", "RF_IN");
        })
        .connect(battery, esc, (connection) =>
            connection
                .port("POWER", "POWER_IN", { color: "red" })
                .port("GND", "GND_IN", { color: "gray" })
        )
        .build();

    return system;
}
