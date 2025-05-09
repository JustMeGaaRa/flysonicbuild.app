import { Component } from "@flysonic/core/Component.ts";

const F1404_3800KV = (): Component => ({
    id: `tmotorhobby-motor-${crypto.randomUUID()}`,
    name: "T-Motor F1404 3800KV",
    ports: [
        {
            name: "PWM",
            direction: "input",
            kind: "logical",
            protocols: [{ name: "pwm" }],
        },
        {
            name: "GND",
            direction: "bidirectional",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
        {
            name: "POWER",
            direction: "input",
            kind: "physical",
            protocols: [{ name: "power" }],
        },
    ],
});

const TMotorHobby_F1404_2900KV = F1404_3800KV;
const TMotorHobby_F1404_3800KV = F1404_3800KV;
const TMotorHobby_F1303_4900KV = F1404_3800KV;
const TMotorHobby_F1303_5000KV = F1404_3800KV;

export default {
    TMotorHobby_F1404_2900KV,
    TMotorHobby_F1404_3800KV,
    TMotorHobby_F1303_4900KV,
    TMotorHobby_F1303_5000KV,
};
