import { Component } from "./Component.ts";

export type ComponentMetadata = {
    name: string;
    vendor: string;
    type: string;
    create: () => Component;
};

export class ComponentRegistry {
    private readonly components: Map<string, ComponentMetadata> = new Map();
    private readonly componentsByVendor: Map<string, ComponentMetadata[]> =
        new Map();
    private readonly componentsByType: Map<string, ComponentMetadata[]> =
        new Map();

    private static instance?: ComponentRegistry;

    private constructor() {}

    public static getInstance(): ComponentRegistry {
        if (!ComponentRegistry.instance) {
            ComponentRegistry.instance = new ComponentRegistry();
        }
        return ComponentRegistry.instance;
    }

    register(componentMetadata: ComponentMetadata): this {
        this.components.set(componentMetadata.name, componentMetadata);
        this.componentsByVendor.set(componentMetadata.vendor, [
            ...(this.componentsByVendor.get(componentMetadata.vendor) || []),
        ]);
        this.componentsByType.set(componentMetadata.type, [
            ...(this.componentsByType.get(componentMetadata.type) || []),
        ]);
        return this;
    }

    getComponent(name: string): ComponentMetadata | undefined {
        return this.components.get(name);
    }

    getComponents(): ComponentMetadata[] {
        return Array.from(this.components.values());
    }

    getComponentVendors(): string[] {
        return Array.from(new Set(this.componentsByVendor.keys()));
    }

    getComponentTypes(): string[] {
        return Array.from(new Set(this.componentsByType.keys()));
    }

    searchByVendor(vendor: string): ComponentMetadata[] {
        return Array.from(this.components.values()).filter(
            (component) => component.vendor === vendor
        );
    }

    searchByType(type: string): ComponentMetadata[] {
        return Array.from(this.components.values()).filter(
            (component) => component.type === type
        );
    }
}
