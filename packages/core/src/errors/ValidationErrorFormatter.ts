export type ValidationErrorNode = {
    message: string;
    children?: ValidationErrorNode[];
};

export class ValidationErrorFormatter {
    private root: ValidationErrorNode | null = null;
    private currentStack: ValidationErrorNode[] = [];

    /**
     * Starts a new error context (level) with a message.
     * Call this before adding child errors.
     */
    begin(message: string): this {
        const node: ValidationErrorNode = { message, children: [] };
        if (!this.root) {
            this.root = node;
        } else {
            const parent = this.currentStack[this.currentStack.length - 1];
            if (!parent.children) parent.children = [];
            parent.children.push(node);
        }
        this.currentStack.push(node);
        return this;
    }

    /**
     * Ends the current error context (level).
     */
    end(): this {
        this.currentStack.pop();
        return this;
    }

    /**
     * Adds a leaf error message to the current context.
     */
    add(message: string): this {
        const parent = this.currentStack[this.currentStack.length - 1];
        if (!parent.children) parent.children = [];
        parent.children.push({ message });
        return this;
    }

    /**
     * Returns the root error node.
     */
    build(): ValidationErrorNode | null {
        return this.root;
    }

    /**
     * Formats the error stack trace in a hierarchical, indented style.
     */
    formatStackTrace(
        node: ValidationErrorNode | null = this.root,
        indent: number = 0
    ): string {
        if (!node) return "";
        const prefix = ">".repeat(indent) + (indent > 0 ? " " : "");
        let result = `${prefix}${node.message}`;
        if (node.children && node.children.length > 0) {
            for (const child of node.children) {
                result += "\n" + this.formatStackTrace(child, indent + 1);
            }
        }
        return result;
    }
}
