import { Component } from "@flysonic/core/Component.ts";
import { ComponentRegistry } from "@flysonic/core/ComponentRegistry.ts";

const Tattu_RLine = (): Component => ({
    id: `tattu-battery-${crypto.randomUUID()}`,
    name: "Tattu R-Line",
    ports: [
        {
            name: "POWER",
            direction: "output",
            kind: "physical",
            protocols: [{ name: "power", constraints: { voltage: 14.8 } }],
        },
        {
            name: "GND",
            direction: "bidirectional",
            kind: "physical",
            protocols: [{ name: "ground" }],
        },
    ],
});

const Tattu_RLine_1300mAh_4S_100C = Tattu_RLine;

(function registerComponents() {
    const battery = { type: "Battery", vendor: "Tattu" };
    ComponentRegistry.getInstance().register({
        ...battery,
        name: "Tattu R-Line 1300mAh 4S 100C",
        create: Tattu_RLine_1300mAh_4S_100C,
    });
})();

export default {
    Tattu_RLine_1300mAh_4S_100C,
};
