import { Component } from "@flysonic/core/Component.ts";

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

export default {
    RadioMaster_TX12,
};
