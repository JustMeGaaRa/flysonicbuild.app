import { ComponentBuilder, ComponentRegistry } from "@flysonic/core/index.ts";

const CaddxFpv_Ratel2 = () =>
    new ComponentBuilder()
        .withName("Caddx Ratel 2")
        .withPort((port) => {
            port.withName("POWER")
                .withDirection("input")
                .withKind("physical")
                .withProtocol("power", { voltage: 5 });
        })
        .withPort((port) => {
            port.withName("VIDEO")
                .withDirection("output")
                .withKind("physical")
                .withProtocol("CVBS", { format: "NTSC" });
        })
        .withPort((port) => {
            port.withName("GND")
                .withDirection("bidirectional")
                .withKind("physical")
                .withProtocol("ground");
        })
        .build();

const CaddxFpv_RatelPro = () =>
    new ComponentBuilder()
        .withName("Caddx Ratel Pro")
        .withPort((port) => {
            port.withName("POWER")
                .withDirection("input")
                .withKind("physical")
                .withProtocol("power", { voltage: 5 });
        })
        .withPort((port) => {
            port.withName("VIDEO")
                .withDirection("output")
                .withKind("physical")
                .withProtocol("CVBS", { format: "NTSC" });
        })
        .withPort((port) => {
            port.withName("GND")
                .withDirection("bidirectional")
                .withKind("physical")
                .withProtocol("ground");
        })
        .build();

const CaddxFpv_BabyRatel2 = () =>
    new ComponentBuilder()
        .withName("Caddx Baby Ratel 2")
        .withPort((port) => {
            port.withName("POWER")
                .withDirection("input")
                .withKind("physical")
                .withProtocol("power", { voltage: 5 });
        })
        .withPort((port) => {
            port.withName("VIDEO")
                .withDirection("output")
                .withKind("physical")
                .withProtocol("CVBS", { format: "NTSC" });
        })
        .withPort((port) => {
            port.withName("GND")
                .withDirection("bidirectional")
                .withKind("physical")
                .withProtocol("ground");
        })
        .build();

(function registerComponents() {
    const camera = { type: "camera", vendor: "Caddx" };
    ComponentRegistry.getInstance()
        .register({
            ...camera,
            name: "Caddx Ratel 2",
            create: CaddxFpv_Ratel2,
        })
        .register({
            ...camera,
            name: "Caddx Ratel Pro",
            create: CaddxFpv_RatelPro,
        })
        .register({
            ...camera,
            name: "Caddx Baby Ratel 2",
            create: CaddxFpv_BabyRatel2,
        });
})();

export default {
    CaddxFpv_Ratel2,
    CaddxFpv_RatelPro,
    CaddxFpv_BabyRatel2,
};
