import { Component } from "@flysonic/core/Component.ts";
import { ComponentRegistry } from "@flysonic/core/ComponentRegistry.ts";

const Walksnail_Avatar = (): Component => ({
    id: `walksnail-avatarhd-${crypto.randomUUID()}`,
    name: "Walksnail Avatar HD (Single Antenna)",
    ports: [
        {
            name: "RF_IN",
            direction: "input",
            kind: "physical",
            protocols: [
                {
                    name: "RF",
                    constraints: {
                        frequency: 5.8,
                        modulation: "FM",
                        polarization: "RHCP",
                    },
                },
            ],
        },
    ],
});

const Walksnail_Kit_AvatarHDMini1SLite = Walksnail_Avatar;
const Walksnail_Kit_AvatarHDMini1S = Walksnail_Avatar;
const Walksnail_Kit_AvatarHDNanoV3 = Walksnail_Avatar;
const Walksnail_Kit_AvatarHDPro_SingleAntenna = Walksnail_Avatar;
const Walksnail_Kit_AvatarHDV2_SingleAntenna = Walksnail_Avatar;
const Walksnail_Kit_AvatarGT = Walksnail_Avatar;
const Walksnail_Kit_Moonlight = Walksnail_Avatar;
const Walksnail_Kit_AvatarHDPro_DualAntenna = Walksnail_Avatar;
const Walksnail_Kit_AvatarHDV2_DualAntenna = Walksnail_Avatar;
const Walksnail_VTX_AvatarHDMini1S = Walksnail_Avatar;
const Walksnail_VTX_AvatarHDMiniV3 = Walksnail_Avatar;
const Walksnail_VTX_AvatarHDV2 = Walksnail_Avatar;
const Walksnail_VTX_Moonlight = Walksnail_Avatar;
const Walksnail_Goggles_AvatarHD_GooglesX = Walksnail_Avatar;
const Walksnail_Goggles_AvatarHD_GogglesL = Walksnail_Avatar;
const Walksnail_VRX_Avatar_FPV = Walksnail_Avatar;

(function registerComponents() {
    const avatar = { type: "Camera", vendor: "Walksnail" };
    ComponentRegistry.getInstance()
        .register({
            ...avatar,
            name: "Walksnail Avatar HD (Single Antenna)",
            create: Walksnail_Avatar,
        })
        .register({
            ...avatar,
            name: "Walksnail Avatar HD (Dual Antenna)",
            create: Walksnail_Avatar,
        })
        .register({
            ...avatar,
            name: "Walksnail Avatar HD Mini 1S Lite",
            create: Walksnail_Kit_AvatarHDMini1SLite,
        })
        .register({
            ...avatar,
            name: "Walksnail Avatar HD Mini 1S",
            create: Walksnail_Kit_AvatarHDMini1S,
        })
        .register({
            ...avatar,
            name: "Walksnail Avatar HD Nano V3",
            create: Walksnail_Kit_AvatarHDNanoV3,
        })
        .register({
            ...avatar,
            name: "Walksnail Avatar HD Pro (Single Antenna)",
            create: Walksnail_Kit_AvatarHDPro_SingleAntenna,
        })
        .register({
            ...avatar,
            name: "Walksnail Avatar HD V2 (Single Antenna)",
            create: Walksnail_Kit_AvatarHDV2_SingleAntenna,
        })
        .register({
            ...avatar,
            name: "Walksnail Avatar GT",
            create: Walksnail_Kit_AvatarGT,
        })
        .register({
            ...avatar,
            name: "Walksnail Avatar HD Pro (Dual Antenna)",
            create: Walksnail_Kit_AvatarHDPro_DualAntenna,
        })
        .register({
            ...avatar,
            name: "Walksnail Avatar HD V2 (Dual Antenna)",
            create: Walksnail_Kit_AvatarHDV2_DualAntenna,
        })
        .register({
            ...avatar,
            name: "Walksnail Avatar HD Mini 1S",
            create: Walksnail_VTX_AvatarHDMini1S,
        })
        .register({
            ...avatar,
            name: "Walksnail Avatar HD Mini V3",
            create: Walksnail_VTX_AvatarHDMiniV3,
        })
        .register({
            ...avatar,
            name: "Walksnail Avatar HD V2",
            create: Walksnail_VTX_AvatarHDV2,
        })
        .register({
            ...avatar,
            name: "Walksnail Moonlight",
            create: Walksnail_VTX_Moonlight,
        })
        .register({
            ...avatar,
            name: "Walksnail Avatar HD Goggles X",
            create: Walksnail_Goggles_AvatarHD_GooglesX,
        })
        .register({
            ...avatar,
            name: "Walksnail Avatar HD Goggles L",
            create: Walksnail_Goggles_AvatarHD_GogglesL,
        })
        .register({
            ...avatar,
            name: "Walksnail Avatar HD VRX",
            create: Walksnail_VRX_Avatar_FPV,
        });
})();

export default {
    Walksnail_Kit_AvatarHDMini1SLite,
    Walksnail_Kit_AvatarHDMini1S,
    Walksnail_Kit_AvatarHDNanoV3,
    Walksnail_Kit_AvatarHDPro_SingleAntenna,
    Walksnail_Kit_AvatarHDV2_SingleAntenna,
    Walksnail_Kit_AvatarGT,
    Walksnail_Kit_Moonlight,
    Walksnail_Kit_AvatarHDPro_DualAntenna,
    Walksnail_Kit_AvatarHDV2_DualAntenna,
    Walksnail_VTX_AvatarHDMini1S,
    Walksnail_VTX_AvatarHDMiniV3,
    Walksnail_VTX_AvatarHDV2,
    Walksnail_VTX_Moonlight,
    Walksnail_Goggles_AvatarHD_GooglesX,
    Walksnail_Goggles_AvatarHD_GogglesL,
    Walksnail_VRX_Avatar_FPV,
};
