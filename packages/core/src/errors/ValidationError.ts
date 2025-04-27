import { ErrorCode } from "./ErrorCode.ts";
import { ErrorRFC7807Format } from "./ErrorRFC7807Format.ts";
import { SourceMetadata } from "./SourceMetadata.ts";

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
