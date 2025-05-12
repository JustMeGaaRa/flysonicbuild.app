import { Component } from "./Component.ts";

export class ComponentService {
    private readonly components: Map<string, Component> = new Map();

    addComponent(component: Component): this {
        this.components.set(component.id, component);
        return this;
    }

    hasComponent(id: string): boolean {
        return this.components.has(id);
    }

    getComponent(id: string): Component | undefined {
        return this.components.get(id);
    }

    getComponents(): Component[] {
        return Array.from(this.components.values());
    }
}
