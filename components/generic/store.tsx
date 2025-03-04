"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

export const StoreContext = createContext(null);

export function Store({ children }: { children: ReactNode }) {
    const [state, setState] = useState(
        localStorage.getItem("store")
            ? JSON.parse(localStorage.getItem("store")!)
            : null
    );

    useEffect(
        () => setState(localStorage.getItem("store")),
        [localStorage.getItem("store")]
    );

    return (
        <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
    );
}
