import { Component } from "@flysonic/core/Component.ts";

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
