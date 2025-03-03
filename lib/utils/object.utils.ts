import { ReactNode } from "react";

export const getReactNodeText = (node: ReactNode): string => {
    if (!node) return "";
    if (typeof node === "object") {
        if (node instanceof Array) return node.map(getReactNodeText).join("");
    }
    return node.toString();
};
