import { expect, test } from "vitest";
import { ComponentRegistry } from "../src/ComponentRegistry.ts";

test("Should have registered components", () => {
    const componentRegistry = ComponentRegistry.getInstance();
    const componentMetadata1 = {
        name: "Flywoo Goku",
        vendor: "Flywoo",
        type: "Flight Controller",
        create: () => ({ id: "flywoo", name: "Flywoo Goku", ports: [] }),
    };
    const componentMetadata2 = {
        name: "SpeedyBee F405 FC",
        vendor: "SpeedyBee",
        type: "Flight Controller",
        create: () => ({
            id: "speedybee",
            name: "SpeedyBee F405 FC",
            ports: [],
        }),
    };

    componentRegistry.register(componentMetadata1);
    componentRegistry.register(componentMetadata2);

    const components = componentRegistry.getComponents();
    const vendors = componentRegistry.getComponentVendors();
    const types = componentRegistry.getComponentTypes();

    expect(components).toHaveLength(2);
    expect(vendors).toHaveLength(2);
    expect(vendors).toContain("Flywoo");
    expect(vendors).toContain("SpeedyBee");
    expect(types).toHaveLength(1);
    expect(types).toContain("Flight Controller");
});

test("Should return 2 components for vendor 'Flywoo' AND 1 for type 'VTX'", () => {
    const componentRegistry = ComponentRegistry.getInstance();
    const componentMetadata1 = {
        name: "Flywoo Goku",
        vendor: "Flywoo",
        type: "Flight Controller",
        create: () => ({ id: "flywoo", name: "Flywoo Goku", ports: [] }),
    };
    const componentMetadata2 = {
        name: "Flywoo Goku VTX",
        vendor: "Flywoo",
        type: "VTX",
        create: () => ({
            id: "flywoo-vtx",
            name: "Flywoo Goku VTX",
            ports: [],
        }),
    };

    componentRegistry.register(componentMetadata1);
    componentRegistry.register(componentMetadata2);

    const vendorComponents = componentRegistry.searchByVendor("Flywoo");
    const typeComponents = componentRegistry.searchByType("VTX");

    expect(vendorComponents).toHaveLength(2);
    expect(vendorComponents[0].name).toBe("Flywoo Goku");
    expect(vendorComponents[0].vendor).toBe("Flywoo");
    expect(vendorComponents[0].type).toBe("Flight Controller");
    expect(vendorComponents[0].create()).toEqual({
        id: "flywoo",
        name: "Flywoo Goku",
        ports: [],
    });
    expect(vendorComponents[1].name).toBe("Flywoo Goku VTX");
    expect(vendorComponents[1].vendor).toBe("Flywoo");
    expect(vendorComponents[1].type).toBe("VTX");
    expect(vendorComponents[1].create()).toEqual({
        id: "flywoo-vtx",
        name: "Flywoo Goku VTX",
        ports: [],
    });
    expect(typeComponents).toHaveLength(1);
    expect(typeComponents[0].name).toBe("Flywoo Goku VTX");
    expect(typeComponents[0].vendor).toBe("Flywoo");
    expect(typeComponents[0].type).toBe("VTX");
    expect(typeComponents[0].create()).toEqual({
        id: "flywoo-vtx",
        name: "Flywoo Goku VTX",
        ports: [],
    });
});
