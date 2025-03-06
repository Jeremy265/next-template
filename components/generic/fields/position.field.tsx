import { useDataStore } from "@/lib/stores/data";
import { errorToString } from "@/lib/utils/errors.utils";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import CustomButton from "../button";

export default function PositionField() {
    const { data, setData } = useDataStore();

    useEffect(() => {
        toast
            .promise(
                new Promise<{
                    coords: {
                        latitude: number;
                        longitude: number;
                    };
                }>((resolve, reject) =>
                    navigator.geolocation.getCurrentPosition(resolve, (error) =>
                        reject(
                            error.PERMISSION_DENIED
                                ? "La permission de vous géolocaliser n'a pas pu être obtenue"
                                : error.POSITION_UNAVAILABLE
                                ? "Votre position n'a pas pu être déterminée"
                                : error.TIMEOUT
                                ? "Votre position n'a pas pu être déterminée dans le temps imparti"
                                : "Une erreur est survenue lors de votre géolocalisation"
                        )
                    )
                ),
                {
                    pending: "Récupération de votre position en cours...",
                    success: {
                        render() {
                            return "Votre position a bien été récupérée";
                        },
                    },
                    error: {
                        render(toastProps) {
                            return errorToString(toastProps.data);
                        },
                    },
                }
            )
            .then((position) =>
                setData({
                    ...data,
                    userPosition: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    },
                })
            );
    }, []);

    return (
        <CustomButton
            icon={<MyLocationIcon />}
            className="info"
            onClick={async () => {
                if (!data.userPosition?.lat || !data.userPosition.lon)
                    return toast.error("Votre position est inconnue");
                setData({ ...data, coordinates: data.userPosition });
            }}>
            Utiliser ma position
        </CustomButton>
    );
}
