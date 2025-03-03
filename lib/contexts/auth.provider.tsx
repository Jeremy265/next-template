"use client";

import { createContext, ReactNode } from "react";
import { LdapUser } from "../type";

export const AuthContext = createContext<{
    user?: LdapUser | null;
}>({});

type Props = {
    user: LdapUser | null;
    children: ReactNode;
};

export default function AuthProvider(props: Props) {
    return (
        <AuthContext.Provider value={props}>
            {props.children}
        </AuthContext.Provider>
    );
}
