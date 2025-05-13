import { ComponentBuilder, ComponentRegistry } from "../index.ts";

const RadioMaster_TX12 = () =>
    new ComponentBuilder()
        .withName("RadioMaster")
        .withMetadata({ type: "Remote Control", vendor: "RadioMaster" })
        .withPort((port) => {
            port.withName("ELRS")
                .withDirection("bidirectional")
                .withKind("physical")
                .withProtocol("RF", {
                    frequency: 915,
                    modulation: "FSK",
                    connector: "U.FL",
                });
        })
        .build();

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
