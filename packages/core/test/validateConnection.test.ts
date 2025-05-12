import { expect, test } from "vitest";
import {
    isValidCommunicationDirection,
    validateConnection,
} from "../src/validateConnection.ts";
import { Port, PortDirection } from "../src/Port.ts";
import { Component } from "../src/Component.ts";
import { ErrorCode } from "../src/errors/ErrorCode.ts";

test.each([
    {
        source: "input" as PortDirection,
        target: "output" as PortDirection,
        expected: true,
    },
    {
        source: "output" as PortDirection,
        target: "input" as PortDirection,
        expected: true,
    },
    {
        source: "bidirectional" as PortDirection,
        target: "bidirectional" as PortDirection,
        expected: true,
    },
    {
        source: "output" as PortDirection,
        target: "output" as PortDirection,
        expected: false,
    },
    {
        source: "input" as PortDirection,
        target: "input" as PortDirection,
        expected: false,
    },
])(
    "Should return $expected for connection from $source to $target",
    ({ source, target, expected }) => {
        const sourcePort: Port = {
            name: "SOURCE",
            direction: source,
            kind: "physical",
            protocols: [],
        };
        const targetPort: Port = {
            name: "TARGET",
            direction: target,
            kind: "physical",
            protocols: [],
        };

        const result = isValidCommunicationDirection(sourcePort, targetPort);

        expect(result).toBe(expected);
    }
);

test("Should return connection with 0 errors for valid connection", () => {
    const sourceComponent: Component = {
        id: "source",
        name: "Source Component",
        ports: [
            {
                name: "SOURCE",
                direction: "output",
                kind: "physical",
                protocols: [],
            },
        ],
    };

    const targetComponent: Component = {
        id: "target",
        name: "Target Component",
        ports: [
            {
                name: "TARGET",
                direction: "input",
                kind: "physical",
                protocols: [],
            },
        ],
    };

    const result = validateConnection(
        sourceComponent,
        targetComponent,
        sourceComponent.ports[0].name,
        targetComponent.ports[0].name
    );

    expect(result).not.toBeNull();
    expect(result.errors).toHaveLength(0);
});

test("Should return connection with 1 'Port Direction Mismatch' error", () => {
    const sourceComponent: Component = {
        id: "source",
        name: "Source Component",
        ports: [
            {
                name: "SOURCE_PORT",
                direction: "output",
                kind: "physical",
                protocols: [],
            },
        ],
    };

    const targetComponent: Component = {
        id: "target",
        name: "Target Component",
        ports: [
            {
                name: "TARGET_PORT",
                direction: "output",
                kind: "physical",
                protocols: [],
            },
        ],
    };

    const result = validateConnection(
        sourceComponent,
        targetComponent,
        sourceComponent.ports[0].name,
        targetComponent.ports[0].name
    );

    expect(result).not.toBeNull();
    expect(result.errors).toHaveLength(1);
    expect(result.errors?.[0].code).toBe(ErrorCode.PORT_DIRECTION_MISMATCH);
});

test("Should return connection with 1 'Port Kind Mismatch' error", () => {
    const sourceComponent: Component = {
        id: "source",
        name: "Source Component",
        ports: [
            {
                name: "SOURCE_PORT",
                direction: "output",
                kind: "physical",
                protocols: [],
            },
        ],
    };

    const targetComponent: Component = {
        id: "target",
        name: "Target Component",
        ports: [
            {
                name: "TARGET_PORT",
                direction: "input",
                kind: "logical",
                protocols: [],
            },
        ],
    };

    const result = validateConnection(
        sourceComponent,
        targetComponent,
        "SOURCE_PORT",
        "TARGET_PORT"
    );

    expect(result).not.toBeNull();
    expect(result.errors).toHaveLength(1);
    expect(result.errors?.[0].code).toBe(ErrorCode.PORT_KIND_MISMATCH);
});

test("Should return connection with 1 'Port Not Found' error", () => {
    const sourceComponent: Component = {
        id: "source",
        name: "Source Component",
        ports: [
            {
                name: "SOURCE_PORT",
                direction: "output",
                kind: "physical",
                protocols: [],
            },
        ],
    };

    const targetComponent: Component = {
        id: "target",
        name: "Target Component",
        ports: [],
    };

    const result = validateConnection(
        sourceComponent,
        targetComponent,
        "SOURCE_PORT",
        "NON_EXISTING_PORT"
    );

    expect(result).not.toBeNull();
    expect(result.errors).toHaveLength(1);
    expect(result.errors?.[0].code).toBe(ErrorCode.PORT_NOT_FOUND);
});

test("Should return connection with 1 'Protocol Not Supported' error", () => {
    const sourceComponent: Component = {
        id: "source",
        name: "Source Component",
        ports: [
            {
                name: "SOURCE_PORT",
                direction: "output",
                kind: "physical",
                protocols: [
                    {
                        name: "PROTOCOL_ABC",
                    },
                ],
            },
        ],
    };

    const targetComponent: Component = {
        id: "target",
        name: "Target Component",
        ports: [
            {
                name: "TARGET_PORT",
                direction: "input",
                kind: "physical",
                protocols: [
                    {
                        name: "PROTOCOL_123",
                    },
                ],
            },
        ],
    };

    const result = validateConnection(
        sourceComponent,
        targetComponent,
        "SOURCE_PORT",
        "TARGET_PORT"
    );

    expect(result).not.toBeNull();
    expect(result.errors).toHaveLength(1);
    expect(result.errors?.[0].code).toBe(ErrorCode.PROTOCOL_NOT_SUPPORTED);
});

test("Should return connection with 1 'Protocol Constraints Mismatch' error", () => {
    const sourceComponent: Component = {
        id: "source",
        name: "Source Component",
        ports: [
            {
                name: "SOURCE_PORT",
                direction: "output",
                kind: "physical",
                protocols: [
                    {
                        name: "PROTOCOL_ABC",
                        constraints: { voltage: 5 },
                    },
                ],
            },
        ],
    };

    const targetComponent: Component = {
        id: "target",
        name: "Target Component",
        ports: [
            {
                name: "TARGET_PORT",
                direction: "input",
                kind: "physical",
                protocols: [
                    {
                        name: "PROTOCOL_ABC",
                        constraints: { voltage: 3.3 },
                    },
                ],
            },
        ],
    };

    const result = validateConnection(
        sourceComponent,
        targetComponent,
        "SOURCE_PORT",
        "TARGET_PORT"
    );

    expect(result).not.toBeNull();
    expect(result.errors).toHaveLength(1);
    expect(result.errors?.[0].code).toBe(
        ErrorCode.PROTOCOL_CONSTRAINTS_MISMATCH
    );
});
