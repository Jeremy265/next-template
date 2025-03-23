"use client";

import { createContext, ReactNode } from "react";
import { User } from "../type";

export const AuthContext = createContext<{
    user?: User | null;
}>({});

type Props = {
    user: User | null;
    children: ReactNode;
};

export default function AuthProvider(props: Props) {
    return (
        <AuthContext.Provider value={props}>
            {props.children}
        </AuthContext.Provider>
    );
}
