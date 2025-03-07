import ErrorComponent from "@/components/generic/error";
import { middlewareRedirections } from "@/lib/utils/middleware.utils";
import unauthorized from "@/public/unauthorized.bmp";

export default function Unauthorized() {
    return (
        <ErrorComponent
            title="Accès non autorisé"
            subtitle={middlewareRedirections.unauthorized.apiMessage}
            image={unauthorized}
        />
    );
}
