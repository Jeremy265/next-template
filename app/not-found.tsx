import ErrorComponent from "@/components/generic/error";
import notFound from "@/public/not-found.gif";

export default function NotFound() {
    return (
        <ErrorComponent
            title="Ressource non trouvée"
            subtitle="La ressource n'existe pas ou a été renommée."
            image={notFound}
        />
    );
}
