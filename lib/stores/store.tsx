import { useEffect, useState } from "react";

export default function useCustomStore<T>(
    key: string,
    initialValue: T
): { state: T; setState: (value: T) => void } {
    const [state, setInternalState] = useState<T>(
        localStorage.getItem(key)
            ? JSON.parse(localStorage.getItem(key)!)
            : initialValue
    );

    useEffect(() => {
        const value = localStorage.getItem(key);
        console.log("la");
        if (!value) return;

        setInternalState(JSON.parse(value));
    }, [localStorage.getItem(key)]);

    const setState = (value: T) => {
        localStorage.setItem(key, JSON.stringify(value));
        setInternalState(value);
    };

    return { state, setState };
}
