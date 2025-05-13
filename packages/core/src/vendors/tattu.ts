import { ComponentBuilder, ComponentRegistry } from "../index.ts";

const Tattu_RLine_1300mAh_4S_100C = () =>
    new ComponentBuilder()
        .withName("Tattu R-Line 1300mAh 4S 100C")
        .withMetadata({ type: "Battery", vendor: "Tattu" })
        .withPort((port) => {
            port.withName("POWER")
                .withDirection("output")
                .withKind("physical")
                .withProtocol("power", { voltage: 14.8 });
        })
        .withPort((port) => {
            port.withName("GND")
                .withDirection("bidirectional")
                .withKind("physical")
                .withProtocol("ground");
        })
        .build();

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
