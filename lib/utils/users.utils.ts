import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { User } from "../type";

export const getAuthenticatedUser = (h: ReadonlyHeaders) => {
    if (!h.has("authenticated-user")) return null;
    return JSON.parse(h.get("authenticated-user")!) as User;
};
