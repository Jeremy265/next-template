import { AppStoreAuth } from "@basf/auth";
import { useEffect } from "react";

export default function AppStoreAuthentication() {
    useEffect(() => {
        AppStoreAuth.isAuthenticated().then(
            (isAuthenticated) => !isAuthenticated && AppStoreAuth.authenticate()
        );
    }, []);
    return <></>;
}
