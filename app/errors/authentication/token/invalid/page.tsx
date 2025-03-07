import ErrorComponent from "@/components/generic/error";
import { middlewareRedirections } from "@/lib/utils/middleware.utils";

export default function TokenInvalidError() {
    return (
        <ErrorComponent
            subtitle={middlewareRedirections.invalidToken.apiMessage}
        />
    );
}
