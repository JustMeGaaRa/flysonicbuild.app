import { ComponentBuilder, ComponentRegistry } from "@flysonic/core/index.ts";

const TMotorHobby_F1404_2900KV = () =>
    new ComponentBuilder()
        .withName("T-Motor F1404 2900KV")
        .withPort((port) => {
            port.withName("PWM")
                .withDirection("input")
                .withKind("logical")
                .withProtocol("pwm");
        })
        .build();
const TMotorHobby_F1404_3800KV = () =>
    new ComponentBuilder()
        .withName("T-Motor F1404 3800KV")
        .withPort((port) => {
            port.withName("PWM")
                .withDirection("input")
                .withKind("logical")
                .withProtocol("pwm");
        })
        .build();
const TMotorHobby_F1303_4900KV = () =>
    new ComponentBuilder()
        .withName("T-Motor F1303 4900KV")
        .withPort((port) => {
            port.withName("PWM")
                .withDirection("input")
                .withKind("logical")
                .withProtocol("pwm");
        })
        .build();
const TMotorHobby_F1303_5000KV = () =>
    new ComponentBuilder()
        .withName("T-Motor F1303 5000KV")
        .withPort((port) => {
            port.withName("PWM")
                .withDirection("input")
                .withKind("logical")
                .withProtocol("pwm");
        })
        .build();
const TMotorHobby_Velox_F2206_1750KV = () =>
    new ComponentBuilder()
        .withName("T-Motor Velox F2206 1750KV")
        .withPort((port) => {
            port.withName("PWM")
                .withDirection("input")
                .withKind("logical")
                .withProtocol("pwm");
        })
        .build();

(function registerComponents() {
    const motor = { type: "Motor", vendor: "TMotorHobby" };
    ComponentRegistry.getInstance()
        .register({
            ...motor,
            name: "TMotor F1404 2900KV",
            create: TMotorHobby_F1404_2900KV,
        })
        .register({
            ...motor,
            name: "TMotor F1404 3800KV",
            create: TMotorHobby_F1404_3800KV,
        })
        .register({
            ...motor,
            name: "TMotor F1303 4900KV",
            create: TMotorHobby_F1303_4900KV,
        })
        .register({
            ...motor,
            name: "TMotor F1303 5000KV",
            create: TMotorHobby_F1303_5000KV,
        })
        .register({
            ...motor,
            name: "TMotor Velox F2206 1750KV",
            create: TMotorHobby_Velox_F2206_1750KV,
        });
})();

export default {
    TMotorHobby_F1404_2900KV,
    TMotorHobby_F1404_3800KV,
    TMotorHobby_F1303_4900KV,
    TMotorHobby_F1303_5000KV,
    TMotorHobby_Velox_F2206_1750KV,
};
