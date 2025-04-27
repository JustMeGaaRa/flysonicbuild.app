import { Component } from "./Component.ts";
import { Connection } from "./Connection.ts";
import { ErrorBuilder, ErrorCode, ValidationError } from "./errors/index.ts";
import { Port } from "./Port.ts";
import { Protocol } from "./Protocol.ts";

export function validatePort(
    sourcePort: Port,
    targetPort: Port
): ValidationError[] {
    throw new Error("Not implemented yet");
}

export function isValidCommunicationDirection(
    sourcePort: Port,
    targetPort: Port
): boolean {
    return (
        (sourcePort.direction === "output" &&
            targetPort.direction === "input") ||
        (sourcePort.direction === "input" &&
            targetPort.direction === "output") ||
        (sourcePort.direction === "bidirectional" &&
            targetPort.direction === "bidirectional")
    );
}

export function validateConnection(
    sourceComponent: Component,
    targetComponent: Component,
    sourcePortName: string,
    targetPortName: string,
    metadata?: Record<string, string | number | boolean>
): Connection {
    const sourcePort = sourceComponent.ports.find(
        (port) => port.name === sourcePortName
    );
    const targetPort = targetComponent.ports.find(
        (port) => port.name === targetPortName
    );

    const errors: ValidationError[] = [];

    if (!sourcePort) {
        errors.push(
            ErrorBuilder.build(ErrorCode.PORT_NOT_FOUND, {
                componentId: sourceComponent.id,
                portName: sourcePortName,
            })
        );
    }
    if (!targetPort) {
        errors.push(
            ErrorBuilder.build(ErrorCode.PORT_NOT_FOUND, {
                componentId: targetComponent.id,
                portName: targetPortName,
            })
        );
    }

    if (sourcePort && targetPort) {
        if (!isValidCommunicationDirection(sourcePort, targetPort)) {
            errors.push(
                ErrorBuilder.build(ErrorCode.PORT_DIRECTION_MISMATCH, {
                    sourceComponentId: sourceComponent.id,
                    sourcePortName: sourcePortName,
                    sourcePortDirection: sourcePort.direction,
                    targetComponentId: targetComponent.id,
                    targetPortName: targetPortName,
                    targetPortDirection: targetPort.direction,
                })
            );
        }

        if (sourcePort.kind !== targetPort.kind) {
            errors.push(
                ErrorBuilder.build(ErrorCode.PORT_KIND_MISMATCH, {
                    sourceComponentId: sourceComponent.id,
                    sourcePortName: sourcePortName,
                    sourcePortKind: sourcePort.kind,
                    targetComponentId: targetComponent.id,
                    targetPortName: targetPortName,
                    targetPortKind: targetPort.kind,
                })
            );
        }

        sourcePort.protocols.forEach((sourceProtocol: Protocol) => {
            const targetProtocol = targetPort.protocols.find(
                (targetProtocol: Protocol) =>
                    sourceProtocol.name === targetProtocol.name
            );

            if (!targetProtocol) {
                // ERROR: no matching protocols found in target port for target component
                errors.push(
                    ErrorBuilder.build(ErrorCode.PROTOCOL_NOT_FOUND, {
                        sourceComponentId: sourceComponent.id,
                        sourcePortName: sourcePortName,
                        targetComponentId: targetComponent.id,
                        targetPortName: targetPortName,
                        protocolName: sourceProtocol.name,
                    })
                );
                return false;
            }

            // NOTE: if either protocol has no constraints, they are considered compatible
            if (sourceProtocol.constraints && targetProtocol.constraints) {
                for (const [key, value] of Object.entries(
                    targetProtocol.constraints
                )) {
                    if (sourceProtocol.constraints[key] !== value) {
                        errors.push(
                            ErrorBuilder.build(
                                ErrorCode.PROTOCOL_CONSTRAINTS_MISMATCH,
                                {
                                    sourceComponentId: sourceComponent.id,
                                    sourcePortName: sourcePortName,
                                    targetComponentId: targetComponent.id,
                                    targetPortName: targetPortName,
                                    protocolName: sourceProtocol.name,
                                    sourceProtocolConstraints: JSON.stringify(
                                        sourceProtocol.constraints
                                    ),
                                    targetProtocolConstraints: JSON.stringify(
                                        targetProtocol.constraints
                                    ),
                                }
                            )
                        );
                    }
                }
            }
        });
    }

    return {
        source: { componentId: sourceComponent.id, portName: sourcePortName },
        target: { componentId: targetComponent.id, portName: targetPortName },
        metadata: metadata,
        valid: errors.length === 0,
        errors: errors.length > 0 ? errors : [],
    };
}
