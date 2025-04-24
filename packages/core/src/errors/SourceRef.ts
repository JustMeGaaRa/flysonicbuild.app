export interface SourceRef {
    /**
     * source component name
     * @example "SpeedyBee F405 FC"
     */
    component: string;
    /**
     * optional: source port name
     * @example "UART1"
     */
    port?: string;
    /**
     * optional: JSON path to the source of the error
     * @example ["components", "SpeedyBee F405 FC", "ports", "UART1"]
     */
    path?: (string | number)[];
}
