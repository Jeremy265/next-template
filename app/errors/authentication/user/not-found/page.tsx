import ErrorComponent from "@/components/generic/error";
import { middlewareRedirections } from "@/lib/utils/middleware.utils";
import notFound from "@/public/not-found.gif";

export default function UserNotFound() {
    return (
        <ErrorComponent
            title="Utilisateur non trouvé"
            subtitle={middlewareRedirections.userNotFound.apiMessage}
            image={notFound}
        />
    );
}
