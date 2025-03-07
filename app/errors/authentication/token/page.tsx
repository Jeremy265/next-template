import { middlewareRedirections } from "@/lib/utils/middleware.utils";
import ErrorComponent from "@/components/generic/error";

export default function TokenError() {
    return (
        <ErrorComponent
            subtitle={middlewareRedirections.tokenError.apiMessage}
        />
    );
}
