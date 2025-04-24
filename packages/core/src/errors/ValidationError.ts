import { ErrorCode } from "./ErrorCode";
import { ErrorRFC7807Format } from "./ErrorRFC7807Format";
import { SourceMetadata } from "./SourceMetadata";

export class ValidationError extends Error implements ErrorRFC7807Format {
    constructor(
        public readonly code: ErrorCode,
        public readonly type: string,
        public readonly title: string,
        public readonly status: number,
        public readonly detail: string,
        public readonly source?: SourceMetadata,
        public readonly instance?: string
    ) {
        super(detail);
        this.name = type;
    }
}
