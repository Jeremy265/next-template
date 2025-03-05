import { ReactNode } from "react";

export const getReactNodeText = (node: ReactNode): string => {
    if (!node) return "";
    if (typeof node === "object") {
        if (node instanceof Array) return node.map(getReactNodeText).join("");

        if ("props" in node) {
            const props = node.props as {
                label?: string;
                children?: ReactNode;
            };
            if (props.label) return getReactNodeText(props.label);
            return getReactNodeText(props.children);
        }
    }
    return node.toString();
};
