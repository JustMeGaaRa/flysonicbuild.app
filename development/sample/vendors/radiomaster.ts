import { Component } from "@flysonic/core/Component.ts";
import { ComponentRegistry } from "@flysonic/core/ComponentRegistry.ts";

const RadioMaster = (): Component => ({
    id: `radiomaster-${crypto.randomUUID()}`,
    name: "RadioMaster",
    ports: [
        {
            name: "ELRS",
            direction: "bidirectional",
            kind: "physical",
            protocols: [
                {
                    name: "RF",
                    constraints: {
                        frequency: 915,
                        modulation: "FSK",
                        connector: "U.FL",
                    },
                },
            ],
        },
    ],
});

const RadioMaster_TX12 = RadioMaster;

(function registerComponents() {
    const remote = { type: "Remote Control", vendor: "RadioMaster" };
    ComponentRegistry.getInstance().register({
        ...remote,
        name: "RadioMaster TX12",
        create: RadioMaster_TX12,
    });
})();

export default {
    RadioMaster_TX12,
};
