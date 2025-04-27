import { Component } from "./Component.ts";

export class ComponentRegistry {
    private components: Map<string, Component> = new Map();

    registerComponent(component: Component): this {
        this.components.set(component.id, component);
        return this;
    }

    getComponent(id: string): Component | undefined {
        return this.components.get(id);
    }

    getComponents(): Component[] {
        return Array.from(this.components.values());
    }
}
