import { ErrorCode } from "./ErrorCode.ts";
import { ValidationError } from "./ValidationError.ts";
import { SourceMetadata } from "./SourceMetadata.ts";
import { ErrorRFC7807Format } from "./ErrorRFC7807Format.ts";

export class ErrorBuilder {
    private static readonly templates: Record<
        string,
        (context: SourceMetadata) => ErrorRFC7807Format
    > = {
        [ErrorCode.PORT_NOT_FOUND]: (ctx: SourceMetadata) => ({
            type: "https://docs.airborne.tech/errors#PORT_NOT_FOUND",
            title: "Port not found",
            status: 422,
            detail: `Port '${ctx.portName}' not found in component '${ctx.componentId}'`,
        }),
        [ErrorCode.PORT_DIRECTION_MISMATCH]: (ctx: SourceMetadata) => ({
            type: "https://docs.airborne.tech/errors#PORT_DIRECTION_MISMATCH",
            title: "Incompatible port directions",
            status: 422,
            detail: `Incompatible '${ctx.sourcePortDirection}' direction found for source port '${ctx.sourcePortName}' and target port '${ctx.targetPortName}' with direction '${ctx.targetPortDirection}'`,
        }),
        [ErrorCode.PORT_KIND_MISMATCH]: (ctx: SourceMetadata) => ({
            type: "https://docs.airborne.tech/errors#PORT_KIND_MISMATCH",
            title: "Incompatible port kinds",
            status: 422,
            detail: `Incompatible '${ctx.sourcePortKind}' kind found for source port '${ctx.sourcePortName}' and target port '${ctx.targetPortName}' with kind '${ctx.targetPortKind}'`,
        }),
        [ErrorCode.PROTOCOL_NOT_FOUND]: (ctx: SourceMetadata) => ({
            type: "https://docs.airborne.tech/errors#PROTOCOL_NOT_FOUND",
            title: "No compatible protocols",
            status: 422,
            detail: `No compatible '${ctx.protocolName}' protocol found between source port '${ctx.sourcePortName}' and target port '${ctx.targetPortName}'`,
        }),
        [ErrorCode.PROTOCOL_CONSTRAINTS_MISMATCH]: (ctx: SourceMetadata) => ({
            type: "https://docs.airborne.tech/errors#PROTOCOL_CONSTRAINTS_MISMATCH",
            title: "Incompatible protocol constraints",
            status: 422,
            detail: `Incompatible '${ctx.protocolName}' protocol constraints found between source port '${ctx.sourcePortName}' and target port '${ctx.targetPortName}'`,
        }),
    } as const;

    static build(code: ErrorCode, context: SourceMetadata): ValidationError {
        const template = this.templates[code](context);
        return new ValidationError(
            code,
            template.type,
            template.title,
            template.status,
            template.detail,
            context
        );
    }
}
