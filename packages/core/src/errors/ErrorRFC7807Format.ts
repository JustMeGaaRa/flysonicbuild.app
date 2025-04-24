import { SourceMetadata } from "./SourceMetadata";

export interface ErrorRFC7807Format {
    /**
     * error code
     * @example "PORT_NOT_FOUND"
     */
    type: string;
    /**
     * short title of the error
     * @example "Incompatible port protocol"
     */
    title: string;
    /**
     * error code number
     * @example 422
     */
    status: number;
    /**
     * description of the error in human-readable form
     * @example "Incompatible port protocol found for source port 'UART1' and target port 'UART2'."
     */
    detail: string;
    /**
     * optional: instance ID of the error
     * @example "123e4567-e89b-12d3-a456-426614174000"
     */
    instance?: string;
    /**
     * optional: metadata about the source of the error
     * @example { "source_component": "SpeedyBee F405 FC", "source_port": "UART1", "target_component": "SpeedyBee F405 FC", "target_port": "UART2" }
     */
    source?: SourceMetadata;
}
